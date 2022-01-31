import type { NextPage } from 'next'
import Metadata from 'components/Metadata'
import Link from 'next/link'
import JoinRoom from 'components/JoinRoom'
import resetLink from 'styles/resetLink'

const Home: NextPage = () => (
  <>
    <Metadata title="Home" />
    <div className="container">
      <h1 className="title">Rapid Boards</h1>
      <p className="description">
        Create and share your own boards with friends!
      </p>

      <JoinRoom />

      <p className="or">or</p>

      <Link href="/room">
        <a className="link">Join random room</a>
      </Link>
    </div>
    <style jsx>{resetLink}</style>
    <style jsx>{`
      .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-image: radial-gradient(
          circle,
          rgba(255, 255, 255, 0.5) 0%,
          rgba(42, 42, 42, 0.21) 95%
        );
        height: 100vh;
        color: var(--secondary-color);
      }

      .title {
        margin-top: 0;
        margin-bottom: 0;
        font-size: min(3rem, 12vw);
      }

      .description {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        font-weight: bold;
      }

      .or {
        margin-top: 0;
        font-size: 1.25rem;
      }

      .link {
        background-color: var(--secondary-color);
        padding: 1rem;
        color: var(--primary-color);
        font-size: 1.25rem;
        border-radius: 0.25rem;
      }
    `}</style>
  </>
)

export default Home
