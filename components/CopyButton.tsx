import { useState } from 'react'
import copyToClipboard from 'utils/copyToClipboard'
import sleep from 'utils/sleep'
import resetButton from 'styles/resetButton'

interface CopyButtonProps {
  text: string
  children: React.ReactNode
}

const CopyButton = ({ text, children }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false)

  const handleClick = async () => {
    await copyToClipboard(text)

    setCopied(true)

    await sleep(1000)

    setCopied(false)
  }

  return (
    <>
      <button onClick={handleClick}>{copied ? 'Copied!' : children}</button>
      <style jsx>{resetButton}</style>
    </>
  )
}

export default CopyButton
