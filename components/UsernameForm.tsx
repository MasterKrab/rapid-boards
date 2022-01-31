import { useRef, useContext, FormEvent } from 'react'
import BoardContext from 'context/Board/context'
import generateRandomUsername from 'utils/generateRandomUsername'
import VisuallyHidden from 'components/VisuallyHidden'
import resetButton from 'styles/resetButton'

const MIN_LENGTH = 3
const MAX_LENGTH = 12

const UsernameForm = () => {
  const input = useRef<HTMLInputElement>(null)
  const { socket, usernameError } = useContext(BoardContext)

  const handleSubmit = (e: FormEvent) => {
    if (!input.current?.checkValidity()) return

    e.preventDefault()

    socket!.emitNewUsername(input.current.value)

    const form = e.target as HTMLFormElement

    form.reset()
  }

  const handleGenerateUsername = () => {
    input.current!.value = generateRandomUsername(MIN_LENGTH, MAX_LENGTH)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <label className="label" htmlFor="username">
          Choose a username
          <VisuallyHidden>
            between {MIN_LENGTH} and {MAX_LENGTH} characters and only letters
            and numbers
          </VisuallyHidden>
        </label>
        <input
          ref={input}
          className="input"
          type="text"
          name="username"
          id="username"
          aria-labelledby="username-error"
          autoComplete="username"
          placeholder="3-14 characters, letters and numbers"
          pattern={`^(?=[a-zA-Z0-9._]{${MIN_LENGTH},${MAX_LENGTH}}$)(?!.*[_.]{2})[^_.].*[^_.]$`}
          maxLength={MAX_LENGTH}
          required
        />
        <div className="buttons">
          <button
            className="button"
            type="button"
            onClick={handleGenerateUsername}
          >
            Generate random name
          </button>
          <button className="button">Ready</button>
        </div>
        {usernameError && (
          <p
            className="error"
            id="username-error"
            aria-live="assertive"
            aria-relevant="additions removals"
          >
            {usernameError}
          </p>
        )}
      </form>
      <style jsx>{resetButton}</style>
      <style jsx>{`
        .form {
          padding: 1rem;
          width: 100%;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        @media screen and (max-width: 768px) {
          .form {
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
        }

        .label {
          font-size: 1.25rem;
        }

        .input,
        .button {
          border-radius: 0.25rem;
        }

        .input {
          display: block;
          background-color: var(--primary-color);
          width: 100%;
          border: none;
          padding: 0.5rem;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }

        .buttons {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.5rem;
        }

        @media screen and (min-width: 768px) {
          .buttons {
            grid-template-columns: 2fr 1fr;
          }
        }

        .button {
          background-color: var(--primary-color);
          padding: 0.5rem 1rem;
          color: var(--secondary-color);
        }

        .error {
          color: var(--error-color);
        }
      `}</style>
    </>
  )
}

export default UsernameForm
