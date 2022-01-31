import { fabric } from 'fabric'
import crypto from 'crypto'
import { nanoid } from 'nanoid'
import createToken from './createToken.mjs'
import protectedPaths from './protectedPaths.mjs'
import createRoom from './createRoom.mjs'
import { Server } from 'socket.io'
import getUserColor from './getUserColor.mjs'
import { cleanText, detect } from './contentFilter.mjs'
import usernameRegex from './usernameRegex.mjs'

const rooms = new Map()

const connectedUsers = new Set()

const createNewId = () => {
  let id

  while (!id || connectedUsers.has(id)) {
    id = nanoid()
  }

  return id
}

const socket = (server) => {
  const io = new Server()
  io.attach(server)

  io.on('connection', (socket) => {
    console.log('connection')

    socket.on('join', async (id) => {
      if (typeof id !== 'string' || !id.trim()) id = createNewId()

      const hasId = rooms.has(id)

      !hasId && rooms.set(id, createRoom())

      const { canvas, users, messages } = rooms.get(id)

      const token = createToken()

      const color = getUserColor()

      const circle = new fabric.Circle({
        left: 0,
        top: 0,
        radius: 10,
        fill: color,
        stroke: '#000000',
        strokeWidth: 5,
        originX: 'center',
        originY: 'center',
        userId: socket.id,
      })

      users.set(socket.id, null)
      connectedUsers.add(socket.id)

      console.log(`socket - ${socket.id} joined ${id}`)

      socket.join(id)

      io.to(socket.id).emit('joined', {
        userId: socket.id,
        token,
        id,
        canvas: canvas.toJSON(),
      })

      io.to(socket.id).emit('messages', messages)

      const emitChangeUsers = () => io.in(id).emit('changeUsers', users.size)

      emitChangeUsers()

      socket.use((event, next) => {
        if (!protectedPaths.has(event)) return next()

        const queryToken = socket.handshake.query.token

        if (queryToken !== token) return next(new Error('Invalid token'))

        next()
      })

      const getObject = (id) =>
        canvas.getObjects().find((object) => object.id === id)

      socket.on('add', (data) => {
        if (!data.id.startsWith(socket.id)) return

        io.in(id).emit('add', data)

        const { type } = data

        const addToCanvas = (figure) => {
          !getObject(figure.id) && canvas.add(figure)
        }

        if (type === 'rect') return addToCanvas(new fabric.Rect(data))
        if (type === 'ellipse') return addToCanvas(new fabric.Ellipse(data))
        if (type === 'path')
          return addToCanvas(new fabric.Path(data.path, data))
        if (type === 'line') {
          const top = data.top
          const left = data.left

          const line = new fabric.Line([top, left, top, left], data)
          addToCanvas(line)
        }
      })

      socket.on('modify', (data) => {
        if (!data.id.startsWith(socket.id)) return

        const object = getObject(data.id)

        if (!object) return

        io.in(id).emit('modify', data)

        object.set(data)
      })

      socket.on('userPointer', async (x, y) => {
        circle.set({ left: x, top: y })

        const normalizedCircle = {
          ...circle.toObject(),
          userId: circle.userId,
        }

        io.in(id).emit('userPointer', normalizedCircle)
      })

      socket.on('newUsername', async (username) => {
        if (!username.match(usernameRegex))
          return io.to(socket.id).emit('newUsernameError', 'Invalid username')

        const detection = await detect(username)

        if (detection)
          return io
            .to(socket.id)
            .emit('newUsernameError', `Username ${detection}`)

        const isTaken = Array.from(users.values()).includes(username)

        if (isTaken)
          return io
            .to(socket.id)
            .emit('newUsernameError', 'Username already taken')

        users.set(socket.id, username)

        io.to(socket.id).emit('newUsername', username)
      })

      socket.on('newMessage', async (content) => {
        if (typeof content !== 'string' || !content.trim()) return

        if (content.length > 500) content = content.slice(0, 500)

        const message = {
          content: cleanText(content),
          id: crypto.randomUUID(),
          username: users.get(socket.id),
          userId: socket.id,
          date: new Date(),
        }

        io.in(id).emit('newMessage', message)

        messages.push(message)

        if (messages.length > 25) messages.shift()
      })

      socket.on('disconnect', () => {
        users.delete(socket.id)
        connectedUsers.delete(socket.id)

        const { size } = users

        size ? emitChangeUsers() : rooms.delete(id)

        const sizeMessage = size ? `${size} users` : 'no users, room deleted'

        console.log(
          `socket - ${socket.id} disconnected from ${id} - ${sizeMessage}`
        )
      })
    })
  })
}

export default socket
