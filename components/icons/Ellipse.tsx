import { IconProps, iconDefaultProps } from './iconProps'

const Ellipse = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 120 122.88"
    xmlSpace="preserve"
    {...iconDefaultProps}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M61.438 0C95.37 0 122.88 27.51 122.88 61.441S95.37 122.88 61.438 122.88C27.509 122.88 0 95.373 0 61.441S27.509 0 61.438 0zm0 18.382c23.781 0 43.06 19.278 43.06 43.06s-19.278 43.057-43.06 43.057c-23.779 0-43.057-19.275-43.057-43.057s19.279-43.06 43.057-43.06z"
    />
  </svg>
)

export default Ellipse
