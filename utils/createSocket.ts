import { io, Socket } from 'socket.io-client'
import { fabric } from 'fabric'
import type Figure from 'types/figure'
import Router from 'next/router'
import getQueryId from 'utils/getQueryId'

export interface Message {
  content: string
  id: string
  username: string
  userId: string
  date: string
}

interface ServerToClientEvents {
  newUsername: (username: string) => void
  newUsernameError: (error: string) => void
  messages: (messages: Message[]) => void
  newMessage: (message: Message) => void
  joined: (data: {
    userId: string
    token: string
    id: string
    canvas: fabric.Canvas
  }) => void
  add: (data: Figure) => void
  modify: (data: Figure) => void
  userPointer: (data: Figure) => void
  userPointerRemove: (userId: string) => void
  changeUsers: (count: number) => void
}

interface ClientToServerEvents {
  newUsername: (username: string) => void
  newMessage: (message: string) => void
  join: (id: string) => void
  add: (data: fabric.Object) => void
  modify: (data: fabric.Object) => void
  userPointer: (x: number, y: number) => void
}

const createSocket = () => {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io()

  const getUserId = () => socket.id

  const emitAdd = async (data: fabric.Object) => {
    socket.emit('add', data)
  }

  const emitModify = async (data: fabric.Object) => {
    socket.emit('modify', data)
  }

  const emitUserPointer = async (x: number, y: number) => {
    socket.emit('userPointer', x, y)
  }

  const addNewUsername = (
    setUsername: (username: string) => void,
    setUsernameError: (error: string) => void
  ) => {
    socket.on('newUsername', setUsername)
    socket.on('newUsernameError', setUsernameError)
  }

  const emitNewUsername = (username: string) => {
    socket.emit('newUsername', username)
  }

  const addChangeUsers = (onChangeUsers: (count: number) => void) => {
    socket.on('changeUsers', onChangeUsers)
  }

  const addGetMessages = (setMessages: (messages: Message[]) => void) => {
    socket.on('messages', setMessages)
  }

  const addNewMessage = (addMessage: (messages: Message) => void) => {
    socket.on('newMessage', addMessage)
  }

  const emitNewMessage = (message: string) => {
    socket.emit('newMessage', message)
  }

  const getObject = (canvas: fabric.Canvas, id: string, isUser?: boolean) =>
    canvas
      .getObjects()
      .find((object) => (object as Figure)[isUser ? 'userId' : 'id'] === id)

  const addListeners = async (
    canvas: fabric.Canvas,
    setIsLoaded: (loading: boolean) => void
  ) => {
    socket.on('joined', ({ token, id, canvas: savedCanvas }) => {
      socket.io.opts.query = { token }

      Router.replace(Router.pathname, `/room/${id}`, { shallow: true })

      canvas.clear()
      canvas.loadFromJSON(
        JSON.stringify(savedCanvas),
        canvas.renderAll.bind(canvas)
      )

      setIsLoaded(true)
    })

    socket.emit('join', getQueryId())

    socket.on('add', async (data) => {
      const { id, type } = data

      if (!id || id.startsWith(getUserId()) || getObject(canvas, id)) return

      const addToCanvas = (figure: fabric.Object) => {
        canvas.add(figure)
        canvas.renderAll()
      }

      if (type === 'rect') return addToCanvas(new fabric.Rect(data))
      if (type === 'ellipse') return addToCanvas(new fabric.Ellipse(data))
      if (type === 'path') return addToCanvas(new fabric.Path(data.path, data))
      if (type === 'line') {
        const top = data.top!
        const left = data.left!

        const line = new fabric.Line([top, left, top, left], data)
        addToCanvas(line)
      }
    })

    socket.on('modify', async (data: Figure) => {
      const { id } = data

      if (!id || id.startsWith(getUserId())) return

      const object = getObject(canvas, id)

      if (!object) return

      object.set(data)
      object.setCoords()
      canvas.renderAll()
    })

    socket.on('userPointer', (data) => {
      if (!data.userId) return
      if (data.userId.startsWith(getUserId())) return

      const circle = getObject(canvas, data.userId, true) as fabric.Circle

      if (circle) {
        circle.set({
          left: data.left,
          top: data.top,
        })
        circle.setCoords()
        canvas.moveTo(circle, canvas.getObjects().length - 1)
      } else {
        const circle = new fabric.Circle(data)

        canvas.add(circle)
      }

      canvas.renderAll()
    })

    socket.on('userPointerRemove', (userId) => {
      const circle = getObject(canvas, userId, true) as fabric.Circle

      if (!circle) return

      canvas.remove(circle)
      canvas.renderAll()
    })
  }

  return {
    emitAdd,
    emitModify,
    emitUserPointer,
    addNewUsername,
    emitNewUsername,
    addGetMessages,
    addNewMessage,
    emitNewMessage,
    addListeners,
    addChangeUsers,
    getUserId,
    disconnect: () => socket.disconnect(),
    isConnected: () => socket.connected,
  }
}

export type SocketResult = ReturnType<typeof createSocket>

export default createSocket
