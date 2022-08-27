import { useContext, useRef, ChangeEvent } from 'react'
import BoardContext from 'context/Board/context'
import ButtonColor from 'components/ButtonColor'
import VisuallyHidden from './VisuallyHidden'

const ColorSelector = () => {
  const { color, setColor, colors } = useContext(BoardContext)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setColor!(e.target.value)

  return (
    <>
      <input
        ref={inputRef}
        value={color}
        onChange={handleChange}
        aria-label="Color"
        type="color"
        name="color"
        className="input"
      />
      <div
        className="colors"
        role="radiogroup"
        aria-labelledby="color-selector-title"
      >
        <VisuallyHidden tag="h2" attributes={{ id: 'color-selector-title' }}>
          Select color
        </VisuallyHidden>
        {colors.map((color) => (
          <ButtonColor key={Math.random()} color={color} />
        ))}
      </div>
      <style jsx>{`
        .input {
          appearance: none;
          position: fixed;
          top: var(--element-separation);
          left: var(--element-separation);
          background-color: var(--primary-color);
          width: 2rem;
          height: 2rem;
          border: none;
          border-radius: 0.25rem;
          margin-right: 0.5rem;
          box-shadow: var(--element-shadow);
        }

        .input::-webkit-color-swatch {
          border: none;
        }

        .colors {
          display: flex;
          position: fixed;
          top: var(--element-separation);
          left: calc(var(--element-separation) + 2.5rem);
          border-radius: 0.5rem;
          box-shadow: var(--element-shadow);
        }

        @media screen and (max-width: 500px) {
          .colors {
            display: none;
          }
        }
      `}</style>
    </>
  )
}

export default ColorSelector
