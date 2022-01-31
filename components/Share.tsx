import { useState, FocusEvent } from 'react'
import { useRouter } from 'next/router'
import ShareIcon from 'components/icons/Share'
import { getSupportsClipboard } from 'utils/copyToClipboard'
import CopyButton from 'components/CopyButton'
import share, { getSupportsShare } from 'utils/share'
import useIsMounted from '../hooks/useIsMounted'
import ShareLinks from 'components/ShareLinks'
import resetButton from 'styles/resetButton'

const Share = () => {
  const [open, setOpen] = useState(false)
  const isMounted = useIsMounted()

  const { query } = useRouter()
  const { id } = query

  const codeRoom = Array.isArray(id) ? id[0] : id!

  const handleOnBlur = (e: FocusEvent) => {
    if (e.currentTarget.contains(e.relatedTarget)) return

    setOpen(false)
  }
  const handleToggle = () => setOpen(!open)

  const handleShare = async () => {
    await share({
      title: 'Rapid Boards',
      text: 'Check out this board!',
      url: window.location.href,
    })

    setOpen(false)
  }

  return (
    <div className="share" onBlur={handleOnBlur}>
      <button
        className="button"
        role="switch"
        aria-checked={open}
        onClick={handleToggle}
        aria-label="Share"
      >
        <ShareIcon width="1.25rem" height="1.6rem" />
      </button>
      {isMounted && (
        <div className="buttons">
          {getSupportsClipboard() ? (
            <>
              <CopyButton text={window.location.href}>Copy URL</CopyButton>
              <CopyButton text={codeRoom}>Copy Code</CopyButton>
            </>
          ) : (
            <p>Code room: {codeRoom}</p>
          )}
          {getSupportsShare() ? (
            <button onClick={handleShare}>Share 🔗</button>
          ) : (
            <ShareLinks link={window.location.href} />
          )}
        </div>
      )}
      <style jsx>{resetButton}</style>
      <style jsx>{`
        .share {
          position: relative;
        }

        .button {
          display: grid;
          place-items: center;
          background-color: var(--secondary-color);
          padding: 0.35rem 0.6rem;
          font-weight: bold;
          letter-spacing: 0.1rem;
          text-transform: uppercase;
          border-radius: 0.25rem;
        }

        .buttons {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          position: absolute;
          top: 120%;
          right: 0;
          background-color: var(--primary-color);
          width: max-content;
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
          border-radius: 0.25rem;
          color: var(--secondary-color);
          box-shadow: var(--element-shadow);
          transform: ${open ? 'scale(1)' : 'scale(0)'};
          visibility: ${open ? 'visible' : 'hidden'};
          transition: transform 0.2s ease-in-out, visibility 0.2s ease-in-out;
          transform-origin: top right;
        }

        @media screen and (min-width: 768px) {
          .buttons {
            right: 50%;
          }
        }
      `}</style>
    </div>
  )
}

export default Share
