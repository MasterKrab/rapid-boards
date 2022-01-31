import type { fabric } from 'fabric'

interface Figure extends fabric.Object {
  id?: string
  userId?: string
  x?: number
  y?: number
  x1?: number
  y1?: number
  x2?: number
  y2?: number
  path: fabric.Point[]
}

export default Figure
