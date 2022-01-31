import { fabric } from 'fabric'

const isLine = (object: fabric.Object): object is fabric.Line =>
  object instanceof fabric.Line

export default isLine
