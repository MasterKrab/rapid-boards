import { IconProps, iconDefaultProps } from './iconProps'

const Rectangle = (props: IconProps) => (
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
      d="M21.26 0h80.142c11.692 0 21.26 9.706 21.26 21.569v79.741c0 11.864-9.567 21.569-21.26 21.569H21.26C9.566 122.88 0 113.175 0 101.311V21.569C0 9.706 9.566 0 21.26 0zm.414 11.14h79.312c5.855 0 10.647 4.788 10.647 10.641v79.313c0 5.855-4.792 10.646-10.647 10.646H21.674c-5.855 0-10.646-4.79-10.646-10.646V21.78c-.001-5.852 4.79-10.64 10.646-10.64z"
    />
  </svg>
)

export default Rectangle
