import { useContext } from 'react'
import BoardContext from 'context/Board/context'
import { Tool } from 'utils/tools'
import capitalize from 'utils/capitalize'
import resetButton from 'styles/resetButton'
import icons from './icons'

interface ButtonToolProps {
  checked: boolean
  tool: Tool
}

const ButtonTool = ({ checked, tool }: ButtonToolProps) => {
  const { setTool } = useContext(BoardContext)

  const handleClick = () => setTool!(tool)

  const Icon = icons[capitalize(tool)]

  return (
    <>
      <button
        onClick={handleClick}
        aria-checked={checked}
        aria-label={`Select tool ${tool}`}
        className="button"
        role="radio"
      >
        <Icon />
      </button>
      <style jsx>{resetButton}</style>
      <style jsx>{`
        .button {
          display: grid;
          place-items: center;
          background-color: var(--primary-color);
          width: min(3rem, 12vw);
          height: min(3rem, 12vw);
          padding: clamp(0.4rem, 2.5vw, 0.65rem);
          border-radius: 0.75rem;
          box-shadow: var(--element-shadow);
        }

        @media screen and (min-width: 768px) and (max-width: 780px) and (max-height: 480px) {
          .button {
            width: min(2.75rem, 12vw);
            height: min(2.75rem, 12vw);
          }
        }

        /* @media screen and (width: 768px) and (max-height: 480px) {
          .tools {
            width: min(3rem, 12vw);
          height: min(3rem, 12vw);
          }
        } */

        .button[aria-checked='true'] {
          background-color: var(--secondary-color);
          color: var(--primary-color);
          box-shadow: var(--element-shadow-light);
        }
      `}</style>
    </>
  )
}

export default ButtonTool
