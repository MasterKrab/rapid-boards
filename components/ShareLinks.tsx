import resetLink from 'styles/resetLink'

interface ShareLinksProps {
  link: string
}

const ShareLinks = ({ link }: ShareLinksProps) => (
  <>
    <a href={`whatsapp://send?text=${link}`} data-action="share/whatsapp/share">
      Share via Whatsapp
    </a>
    <a href={`tg://msg?text=${link}`} data-action="share/telegram/share">
      Share via Telegram
    </a>
    <a href={`mailto:?subject=${link}`} data-action="share/email/share">
      Share via Email
    </a>
    <style jsx>{resetLink}</style>
  </>
)

export default ShareLinks
