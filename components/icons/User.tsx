import { IconProps, iconDefaultProps } from './iconProps'

const Rectangle = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    {...iconDefaultProps}
    {...props}
  >
    <path
      d="M10.5 2.5a3 3 0 0 1 3 3v2a3 3 0 1 1-6 0v-2a3 3 0 0 1 3-3zm7 14v-.728c0-3.187-3.686-5.272-7-5.272s-7 2.085-7 5.272v.728a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default Rectangle
