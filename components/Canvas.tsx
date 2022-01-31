import { useContext, useRef, useState, useEffect } from 'react'
import BoardContext from 'context/Board/context'
import { TOOLS } from 'utils/tools'
import type Figure from 'types/figure'
import { fabric } from 'fabric'
import useWindowSize from 'hooks/useWindowSize'
import useWindowEvent from 'hooks/useWindowEvent'
import generateId from 'utils/generateId'
import isLine from 'utils/isLine'
import getHexColorFromCanvas from 'utils/getHexColorFromCanvas'
import PreloadImages from 'components/PreloadImages'

const Canvas = () => {
  const { socket, tool, color, width, setColor } = useContext(BoardContext)
  const windowSize = useWindowSize()
  const element = useRef<HTMLCanvasElement>(null)
  const canvasRef = useRef<fabric.Canvas>()
  const isPainting = useRef(false)
  const originX = useRef(0)
  const originY = useRef(0)
  const fingerDistance = useRef(0)
  const isDragging = useRef(false)
  const isPinch = useRef(false)
  const [zoomMode, setZoomMode] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const changeZoom = (zoomIn: boolean) => {
    const canvas = canvasRef.current

    if (!canvas) return

    const currentZoom = canvas.getZoom()

    if (zoomIn && currentZoom >= 2) return
    if (!zoomIn && currentZoom <= 0.25) return

    const zoom: number = zoomIn ? currentZoom + 0.1 : currentZoom - 0.1

    const x = canvas.getWidth() / 2
    const y = canvas.getHeight() / 2

    canvas.zoomToPoint({ x, y }, Number(zoom.toFixed(1)))

    canvas.setViewportTransform(canvas.viewportTransform!)
  }

  useWindowEvent('keydown', (e: KeyboardEvent) => {
    const { ctrlKey, key } = e

    if (ctrlKey) setZoomMode(true)

    const canvas = canvasRef.current

    if (!canvas || !zoomMode) return

    if (key === '+' || key === '-' || key === '=') {
      e.preventDefault()

      key === '=' ? canvas.setZoom(1) : changeZoom(key === '+')
    }
  })

  useWindowEvent('keyup', ({ ctrlKey }: KeyboardEvent) => {
    if (!ctrlKey) setZoomMode(false)
  })

  const getFingerDistance = (x1: number, y1: number, x2: number, y2: number) =>
    Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))

  useWindowEvent('touchstart', (e: TouchEvent) => {
    if (e.touches.length !== 2) return
    isPinch.current = true
    setZoomMode(true)

    const { clientX: x1, clientY: y1 } = e.touches[0]
    const { clientX: x2, clientY: y2 } = e.touches[1]

    const x = (x1 + x2) / 2

    const y = (y1 + y2) / 2

    originX.current = x
    originY.current = y

    const newFingerDistance = getFingerDistance(x1, y1, x2, y2)

    fingerDistance.current = newFingerDistance
  })

  useWindowEvent('touchmove', (e: TouchEvent) => {
    if (e.touches.length !== 2) return

    const canvas = canvasRef.current

    if (!canvas) return

    const { clientX: x1, clientY: y1 } = e.touches[0]
    const { clientX: x2, clientY: y2 } = e.touches[1]

    const x = (x1 + x2) / 2

    const y = (y1 + y2) / 2

    const dx = x - originX.current
    const dy = y - originY.current

    originX.current = x
    originY.current = y

    canvas.relativePan({ x: dx, y: dy })

    const newFingerDistance = getFingerDistance(x1, y1, x2, y2)

    const delta = newFingerDistance - fingerDistance.current

    fingerDistance.current = newFingerDistance

    const newZoom = canvas.getZoom() + delta / 500

    const pointer = { x, y }

    if (newZoom > 2) {
      canvas.zoomToPoint(pointer, 2)
    } else if (newZoom < 0.25) {
      canvas.zoomToPoint(pointer, 0.25)
    } else {
      canvas.zoomToPoint(pointer, newZoom)
    }

    e.preventDefault()
  })

  useWindowEvent('touchend', () => {
    isPinch.current = false
    setZoomMode(false)
  })

  useEffect(() => {
    if (!element.current || !socket) return

    if (!canvasRef.current) {
      canvasRef.current = new fabric.Canvas(element.current, {
        backgroundColor: '#ffffff',
        selection: false,
      })

      socket!.addListeners(canvasRef.current, setIsLoaded)
    }

    const canvas = canvasRef.current

    const normalizeObject = (object: fabric.Object): Figure => {
      const normalizedObject = {
        ...object.toObject(),
        id: (object as Figure).id,
      }

      normalizedObject.type = object.type
      normalizedObject.objectCaching = object.objectCaching

      if (isLine(object)) {
        normalizedObject.top = object.top
        normalizedObject.left = object.left
        normalizedObject.x1 = object.x1
        normalizedObject.y1 = object.y1
        normalizedObject.x2 = object.x2
        normalizedObject.y2 = object.y2
      }

      return normalizedObject
    }

    const objectModified = async (object: fabric.Object) => {
      socket!.emitModify(normalizeObject(object))
    }

    const generateObjectId = () => `${socket!.getUserId()}--${generateId()}`

    const changeCursor = (cursor: string) => {
      canvas.hoverCursor = cursor
      canvas.defaultCursor = cursor
    }

    canvas.on('path:created', ({ path }: any) => {
      if (path.id) return

      socket!.emitAdd(normalizeObject(path))
    })

    canvas.on('object:added', async (e) => {
      const object = e.target!

      Object.assign(object, {
        hasBorders: false,
        hasControls: false,
        selectable: false,
      })

      if (!(object as Figure).id) (object as Figure).id = generateObjectId()

      socket!.emitAdd(normalizeObject(object))
    })

    canvas.on('mouse:wheel', ({ e }) => changeZoom(e.deltaY < 0))

    canvas.on('mouse:move', async ({ e }) => {
      if (isPinch.current) return

      const { x, y } = canvas.getPointer(e)

      socket!.emitUserPointer(x, y)

      if (isDragging.current) {
        canvas.relativePan({ x: e.movementX, y: e.movementY })

        originX.current = e.clientX
        originY.current = e.clientY
        return
      }

      if (tool === TOOLS.COLOR_PICKER) return
      if (!isPainting.current) return

      const radiusX = originX.current - x

      const radiusY = originY.current - y

      const activeObject = canvas.getActiveObject()

      const modifyObject = (
        options:
          | fabric.ILineOptions
          | fabric.IRectOptions
          | fabric.IEllipseOptions
      ) => {
        activeObject.set(options)
        activeObject.setCoords()
        canvas.renderAll()
        objectModified(activeObject)
      }

      if (activeObject instanceof fabric.Line)
        return modifyObject({ x2: x, y2: y })

      if (activeObject instanceof fabric.Rect)
        return modifyObject({
          width: -radiusX,
          height: -radiusY,
        })

      if (activeObject instanceof fabric.Ellipse) {
        const newCordinates: Partial<fabric.Ellipse> = {}

        const absoluteRadiusX = Math.abs(radiusX)
        const absoluteRadiusY = Math.abs(radiusY)

        newCordinates.rx = absoluteRadiusX / 2
        newCordinates.ry = absoluteRadiusY / 2

        if (radiusX > 0) newCordinates.left = originX.current - absoluteRadiusX

        if (radiusY > 0) newCordinates.top = originY.current - absoluteRadiusY

        modifyObject(newCordinates)
      }
    })

    canvas.on('mouse:down', ({ e }) => {
      if (isPinch.current) return

      if (tool === TOOLS.COLOR_PICKER) {
        setColor!(getHexColorFromCanvas(e, canvas))

        if (!zoomMode) return
      }

      if (zoomMode) {
        originX.current = e.clientX
        originY.current = e.clientY
        isDragging.current = true
        changeCursor('grabbing')
        return
      }

      const { x, y } = canvas.getPointer(e)

      originX.current = x
      originY.current = y

      isPainting.current = true

      const addFigure = (figure: fabric.Object) => {
        figure.set({
          objectCaching: false,
          selectable: false,
          hasControls: false,
        })
        canvas.add(figure)
        canvas.setActiveObject(figure)
        canvas.renderAll()
      }

      if (tool === TOOLS.LINE)
        return addFigure(
          new fabric.Line([x, y], {
            stroke: color,
            strokeWidth: width,
          })
        )

      if (tool === TOOLS.RECTANGLE)
        return addFigure(
          new fabric.Rect({
            left: x,
            top: y,
            width: 0,
            height: 0,
            fill: 'transparent',
            stroke: color,
            strokeWidth: width,
            strokeUniform: true,
          })
        )

      if (tool === TOOLS.ELLIPSE)
        addFigure(
          new fabric.Ellipse({
            top: y,
            left: x,
            stroke: color,
            fill: 'transparent',
            strokeWidth: width,
          })
        )
    })

    canvas.on('mouse:up', ({ e }) => {
      if (tool === TOOLS.COLOR_PICKER) return

      canvas.discardActiveObject()
      isDragging.current = false
      isPainting.current = false

      if (zoomMode) changeCursor('grab')
    })

    canvas.isDrawingMode = false

    changeCursor('crosshair')

    tool === TOOLS.COLOR_PICKER &&
      changeCursor('url(/assets/icons/color-picker.svg) 0 25, auto')

    zoomMode && changeCursor('grab')

    if (tool === TOOLS.PENCIL || tool === TOOLS.ERASER) {
      canvas.isDrawingMode = !zoomMode
      canvas.freeDrawingBrush.color = tool === TOOLS.PENCIL ? color : '#ffffff'
      canvas.freeDrawingBrush.width = width
    }

    return () => {
      canvas.off('path:created')
      canvas.off('object:added')
      canvas.off('mouse:down')
      canvas.off('mouse:up')
      canvas.off('mouse:move')
      canvas.off('mouse:wheel')
      canvas.off('click')
    }
  }, [element, socket, tool, color, width, zoomMode, setColor])

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) return

    const { width, height } = windowSize

    canvas.setWidth(width)
    canvas.setHeight(height)
  }, [windowSize, socket])

  return (
    <>
      <div className="container">
        <canvas ref={element}></canvas>
      </div>
      <PreloadImages images={['/assets/icons/color-picker.svg']} />
      <style jsx>{`
        .container {
          pointer-events: ${isLoaded ? 'auto' : 'none'};
        }
      `}</style>
    </>
  )
}

export default Canvas
