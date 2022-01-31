import { useContext } from 'react'
import BoardContext from 'context/Board/context'
import UserIcon from 'components/icons/User'

const UsersCount = () => {
  const { usersCount } = useContext(BoardContext)

  return (
    <>
      <p className="text" aria-label={`${usersCount} users`}>
        <span className="count">{usersCount}</span>
        <UserIcon width="1.25rem" height="1.25rem" />
      </p>
      <style jsx>{`
        .text {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background-color: var(--secondary-color);
          margin-top: 0;
          margin-bottom: 0;
          padding: 0.4rem 0.6rem;
          border-radius: 0.25rem;
        }

        .count {
          margin-top: 0.15rem;
        }
      `}</style>
    </>
  )
}
export default UsersCount
