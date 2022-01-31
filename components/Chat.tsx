import { useState, useRef, useEffect, useContext } from 'react'
import BoardContext from 'context/Board/context'
import ChatIcon from 'components/icons/Chat'
import Close from 'components/icons/Close'
import UsernameForm from 'components/UsernameForm'
import Messages from 'components/Messages'
import MessageForm from 'components/MessageForm'
import resetButton from 'styles/resetButton'

const Chat = () => {
  const { username, messages, setUsernameError } = useContext(BoardContext)
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState(0)
  const lastMessage = useRef(messages[messages.length - 1])

  const handleToggle = () => {
    setOpen(!open)

    if (open) return

    setNotifications(0)
    setUsernameError!('')
  }

  useEffect(() => {
    const currentLastMessage = messages[messages.length - 1]

    if (!open && currentLastMessage !== lastMessage.current)
      setNotifications((notifications) => notifications + 1)

    lastMessage.current = currentLastMessage
  }, [open, messages])

  return (
    <>
      <button
        className="button"
        onClick={handleToggle}
        aria-label={`Open chat (${notifications} notifications)`}
        data-notifications={notifications > 9 ? '9+' : notifications}
      >
        <ChatIcon width="1.25rem" height="1.25rem" />
      </button>
      <section className="chat">
        <header className="header">
          <h2 className="title">
            {username ? `Joined as ${username}` : 'Chat'}
          </h2>
          <button onClick={handleToggle} aria-label="Close chat">
            <Close width="0.75rem" height="0.75rem" />
          </button>
        </header>
        {username ? (
          <>
            {open && <Messages />}
            <MessageForm />
          </>
        ) : (
          <UsernameForm />
        )}
      </section>

      <style jsx>{resetButton}</style>

      <style jsx>{`
        .button {
          position: relative;
          display: grid;
          place-items: center;
          background-color: var(--secondary-color);
          padding: 0.5rem 0.75rem;
          border-radius: 0.25rem;
        }

        .button::before {
          content: attr(data-notifications);
          display: grid;
          place-items: center;
          grid-template-columns: 1fr;
          position: absolute;
          top: 0;
          right: 0;
          min-width: 1.5rem;
          background-color: var(--alert-color);
          font-size: 0.9rem;
          padding: 0.25rem;
          border-radius: 50%;
          transform: translate(25%, -25%);
        }

        @media screen and (min-width: 768px) {
          .button {
            position: fixed;
            bottom: var(--element-separation);
            right: var(--element-separation);
          }
        }

        .chat {
          display: grid;
          grid-template-rows: 2rem 10rem 2rem;
          position: fixed;
          bottom: var(--element-separation);
          right: var(--element-separation);
          background-color: var(--secondary-color);
          width: 25rem;
          transform-origin: bottom right;
          transition: transform 0.25s ease-in-out, opacity 0.25s ease-in-out,
            visibility 0.25s ease-in-out;
        }

        @media screen and (max-width: 768px) {
          .chat {
            grid-template-rows: 3rem 1fr 4rem;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100%;
            transform-origin: top right;
          }
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem;
        }

        .title {
          margin-top: 0;
          margin-bottom: 0;
          font-size: 1rem;
          font-weight: normal;
        }
      `}</style>
      <style jsx>{`
        .button::before {
          opacity: ${notifications ? 1 : 0};
        }

        .chat {
          transform: ${open ? 'scale(1)' : 'scale(0)'};
          opacity: ${open ? 1 : 0};
          visibility: ${open ? 'visible' : 'hidden'};
        }
      `}</style>
    </>
  )
}

export default Chat
