export type Tool =
  | 'pencil'
  | 'eraser'
  | 'line'
  | 'rectangle'
  | 'ellipse'
  | 'color picker'

interface Tools {
  [key: string]: Tool
}

export const TOOLS: Tools = {
  PENCIL: 'pencil',
  ERASER: 'eraser',
  LINE: 'line',
  RECTANGLE: 'rectangle',
  ELLIPSE: 'ellipse',
  COLOR_PICKER: 'color picker',
}

export const TOOLS_VALUES = Object.values(TOOLS)
