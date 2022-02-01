import { useContext } from 'react'
import BoardContext from 'context/Board/context'
import Message from 'components/Message'
import resetList from 'styles/resetList'
import scrollbar from 'styles/scrollbar'
import ScrollToBottom from 'components/ScrollToBottom'

const Messages = () => {
  const { messages } = useContext(BoardContext)

  return (
    <>
      <section
        className="messages scrollbar"
        aria-label="Chat messages"
        aria-live="polite"
        tabIndex={0}
      >
        {messages.length ? (
          <ScrollToBottom>
            {messages.map(({ id, username, date, content }) => (
              <Message
                key={id}
                username={username}
                date={date}
                content={content}
              />
            ))}
          </ScrollToBottom>
        ) : (
          <p className="no-messages">Welcome to the chat!</p>
        )}
      </section>
      <style jsx>{resetList}</style>
      <style jsx>{scrollbar}</style>
      <style jsx>{`
        .messages {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          background-color: var(--primary-color);
          text-align: left;
          padding: 0.5rem;
          overflow-y: auto;
          color: var(--secondary-color);
        }

        .no-messages {
          margin-top: 0;
        }
      `}</style>
    </>
  )
}

export default Messages
