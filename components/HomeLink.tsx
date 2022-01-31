import Link from 'next/link'
import HomeIcon from 'components/icons/Home'
import resetLink from 'styles/resetLink'

const HomeLink = () => (
  <>
    <Link href="/">
      <a className="link" aria-label="Home">
        <HomeIcon width="1.3rem" height="1.3rem" />
      </a>
    </Link>
    <style jsx>{resetLink}</style>
    <style jsx>{`
      .link {
        display: grid;
        place-items: center;
        background-color: var(--secondary-color);
        padding: 0.4rem;
        border-radius: 0.25rem;
      }
    `}</style>
  </>
)

export default HomeLink
