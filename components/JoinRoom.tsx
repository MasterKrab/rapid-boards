import { useRouter } from 'next/router'
import { useRef, FormEvent } from 'react'
import resetButton from 'styles/resetButton'

const JoinRoom = () => {
  const input = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleSubmit = (e: FormEvent) => {
    if (!input.current?.checkValidity()) return

    e.preventDefault()

    router.push(`/room/${input.current.value}`)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <input
          ref={input}
          className="input"
          type="text"
          name="code"
          aria-label="Please provide a code room"
          placeholder="Please provide a code room..."
          required
        />
        <button className="button">Join</button>
      </form>
      <style jsx>{resetButton}</style>
      <style jsx>{`
        .form {
          display: grid;
          padding: 1rem;
          width: 100%;
          max-width: 450px;
        }

        @media screen and (min-width: 500px) {
          .form {
            grid-template-columns: 2fr 1fr;
          }
        }

        .input,
        .button {
          padding: 0.75rem 1rem;
        }

        .input {
          border: 2px solid var(--secondary-color);
          width: 100%;
        }

        .button {
          background-color: var(--secondary-color);
          letter-spacing: 0.25rem;
          text-transform: uppercase;
          color: var(--primary-color);
        }
      `}</style>
    </>
  )
}

export default JoinRoom
