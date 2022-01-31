import { useRef, useContext, FormEvent, KeyboardEvent } from 'react'
import BoardContext from 'context/Board/context'
import resetButton from 'styles/resetButton'

const MessageForm = () => {
  const textBox = useRef<HTMLTextAreaElement>(null)
  const button = useRef<HTMLButtonElement>(null)
  const { socket } = useContext(BoardContext)

  const handleSubmit = (e: FormEvent) => {
    if (!textBox.current?.checkValidity()) return

    e.preventDefault()

    socket!.emitNewMessage(textBox.current.value)

    const form = e.target as HTMLFormElement

    form.reset()
  }

  const handleChange = () => {
    const validity = !textBox.current!.value.trim() ? 'Message is required' : ''

    textBox.current!.setCustomValidity(validity)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Enter' || e.shiftKey) return

    e.preventDefault()
    button.current!.click()
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <textarea
          ref={textBox}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          maxLength={500}
          className="text-box"
          aria-label="New message"
          placeholder="New message..."
          name="message"
          required
        />
        <button ref={button} className="button">
          Send
        </button>
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
