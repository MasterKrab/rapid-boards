import { fabric } from 'fabric'

const createCanvas = () => {
  const canvas = new fabric.Canvas(null, {
    backgroundColor: '#ffffff',
    selection: false,
  })

  return canvas
}

const createRoom = () => ({
  canvas: createCanvas(),
  users: new Map(),
  messages: [],
})

export default createRoom
