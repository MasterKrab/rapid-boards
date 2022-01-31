import next from 'next'
import express from 'express'
import { createServer } from 'http'
import socket from './socket.mjs'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const app = express()
  const server = createServer(app)

  try {
    socket(server)
  } catch (error) {
    console.error(error)
  }

  app.all('*', (request, respose) => handle(request, respose))

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
