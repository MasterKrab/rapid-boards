import { IconProps } from 'components/icons/iconProps'
import Pencil from 'components/icons/Pencil'
import Eraser from 'components/icons/Eraser'
import Line from 'components/icons/Line'
import Rectangle from 'components/icons/Rectangle'
import Ellipse from 'components/icons/Ellipse'
import ColorPicker from 'components/icons/ColorPicker'

interface Icons {
  [key: string]: (props: IconProps) => JSX.Element
}

const icons: Icons = {
  Pencil,
  Eraser,
  Line,
  Rectangle,
  Ellipse,
  ColorPicker,
}

export default icons
