import { useContext, ChangeEvent } from 'react'
import BoardContext from 'context/Board/context'

const WidthSelector = () => {
  const { width, setWidth } = useContext(BoardContext)

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setWidth!(Number(target.value))

  return (
    <>
      <input
        value={width}
        onChange={handleChange}
        className="input"
        aria-label="Width"
        type="range"
        name="width"
        min="1"
        max="50"
      />
      <style jsx>{`
        .input {
          appearance: none;
          position: fixed;
          top: calc(var(--element-separation) + 3rem);
          right: calc(var(--element-separation) + 1rem);
          background-color: var(--secondary-color);
          padding: 0.25rem;
          height: 1rem;
          border-radius: 0.25rem;
          box-shadow: var(--element-shadow-light);
          transform: rotate(-90deg);
          transform-origin: top right;
          z-index: -1;
        }

        @media screen and (min-width: 768px) and (max-height: 480px) {
          .input {
            top: var(--element-separation);
            right: calc(var(--element-separation) + 9rem);
            transform: rotate(0);
          }
        }

        .input::-webkit-slider-thumb {
          appearance: none;
          background-color: var(--primary-color);
          width: 1rem;
          height: 1rem;
          cursor: ns-resize;
        }
      `}</style>
    </>
  )
}

export default WidthSelector
