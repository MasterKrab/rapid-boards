import { useContext } from 'react'
import BoardContext from 'context/Board/context'
import resetButton from 'styles/resetButton'

interface ButtonColorProps {
  color: string
}

const ButtonColor = ({ color }: ButtonColorProps) => {
  const { setColor } = useContext(BoardContext)

  const handleClick = () => setColor!(color)

  return (
    <>
      <button
        onClick={handleClick}
        className="button"
        aria-label={`Select color ${color}`}
      />
      <style jsx>{resetButton}</style>
      <style jsx>{`
        .button {
          background-color: ${color};
          width: 1.75rem;
          height: 2rem;
        }

        .button:nth-child(2) {
          border-top-left-radius: 0.5rem;
          border-bottom-left-radius: 0.5rem;
        }

        .button:last-child {
          border-top-right-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }
      `}</style>
    </>
  )
}

export default ButtonColor
