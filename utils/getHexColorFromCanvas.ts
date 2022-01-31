import { fabric } from 'fabric'

const getHexColorFromCanvas = (event: Event, canvas: fabric.Canvas): string => {
  const { x, y } = canvas.getPointer(event)
  const context = canvas.getContext()
  const pixel = context.getImageData(x, y, 1, 1).data.slice(0, 3)

  const hex = pixel.reduce(
    (hex, value) => hex + value.toString(16).padStart(2, '0'),
    ''
  )

  return `#${hex}`
}

export default getHexColorFromCanvas
