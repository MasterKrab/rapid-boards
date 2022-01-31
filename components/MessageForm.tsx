import { useRef, useContext, FormEvent } from 'react'
import BoardContext from 'context/Board/context'
import resetButton from 'styles/resetButton'

const MessageForm = () => {
  const textBox = useRef<HTMLTextAreaElement>(null)
  const { socket } = useContext(BoardContext)

  const handleSubmit = (e: FormEvent) => {
    if (!textBox.current?.checkValidity()) return

    e.preventDefault()

    socket!.emitNewMessage(textBox.current.value)

    const form = e.target as HTMLFormElement

    form.reset()
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <textarea
          ref={textBox}
          className="text-box"
          aria-label="New message"
          placeholder="New message..."
          required
        />
        <button className="button">Send</button>
      </form>
      <style jsx>{resetButton}</style>
      <style jsx>{`
        .form {
          display: grid;
          grid-template-columns: 3fr 1fr;
          grid-row: 3 / 4;
        }

        .text-box {
          padding: 0.3rem 0.5rem;
          border: 2px solid var(--secondary-color);
          resize: none;
          overflow-y: hidden;
        }

        @media screen and (max-width: 768px) {
          .text-box {
            padding: 1.35rem 1rem;
          }
        }
      `}</style>
    </>
  )
}

export default MessageForm
