import { Fragment, memo } from 'react'
import Image from 'next/image'
import generateId from 'utils/generateId'
import TimeAgo from 'components/TimeAgo'

interface MessageProps {
  username: string
  date: string
  content: string
}

const Message = ({ username, date, content }: MessageProps) => (
  <>
    <section className="message">
      <header className="top">
        <div className="user-image">
          <Image
            src={`https://avatars.dicebear.com/api/identicon/${username}.svg`}
            width={15}
            height={15}
            alt={username}
          />
        </div>
        <p>{username}</p>
        <TimeAgo date={date} />
      </header>
      <p className="content">
        {content.split('\n').map((line, index) => (
          <Fragment key={generateId()}>
            {index > 0 && <br />}
            {line}
          </Fragment>
        ))}
      </p>
    </section>
    <style jsx>{`
      p {
        margin-top: 0;
        margin-bottom: 0;
      }

      .message {
        padding: 0.25rem;
        border-top: 2px solid var(--secondary-color);
      }

      .top {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
      }

      .user-image {
        display: grid;
        place-items: center;
        padding: 0.3rem;
        border-radius: 50%;
      }

      .content {
        padding-left: 0.2rem;
      }
    `}</style>
  </>
)

export default memo(Message)
