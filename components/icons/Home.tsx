import { IconProps, iconDefaultProps } from './iconProps'

const Line = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    {...iconDefaultProps}
    {...props}
  >
    <g fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
      <path d="m1.5 10.5 9-9 9 9" />
      <path d="M3.5 8.5v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
    </g>
  </svg>
)

export default Line
