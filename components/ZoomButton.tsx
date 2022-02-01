import { useContext } from 'react'
import BoardContext from 'context/Board/context'
import Move from 'components/icons/Move'
import resetButton from 'styles/resetButton'

const ButtonTool = () => {
  const { zoomMode, setZoomMode } = useContext(BoardContext)

  const handleClick = () => setZoomMode!(!zoomMode)

  return (
    <>
      <button
        onClick={handleClick}
        aria-checked={zoomMode}
        aria-label="Zoom and panning"
        className="button"
        role="switch"
      >
        <Move />
      </button>
      <style jsx>{resetButton}</style>
      <style jsx>{`
        .button {
          display: grid;
          place-items: center;
          background-color: var(--primary-color);
          color: var(--secondary-color);
          width: min(3rem, 12vw);
          height: min(3rem, 12vw);
          padding: clamp(0.4rem, 2.5vw, 0.65rem);
          border-radius: 0.75rem;
          box-shadow: var(--element-shadow);
        }

        @media screen and (max-width: 400px) and (min-height: 600px) {
          .button {
            position: absolute;
            bottom: 115%;
            right: 0;
          }
        }

        @media screen and (min-width: 400px) and (max-width: 450px) and (min-height: 480px) {
          .button {
            width: min(2.75rem, 10vw);
            height: min(2.75rem, 10vw);
          }
        }

        @media screen and (min-width: 750px) and (max-width: 850px) and (max-height: 600px) {
          .button {
            position: absolute;
            left: 0;
            bottom: 115%;
          }
        }

        @media screen and (min-width: 768px) and (max-width: 780px) and (max-height: 480px) {
          .button {
            width: min(2.75rem, 12vw);
            height: min(2.75rem, 12vw);
          }
        }

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
