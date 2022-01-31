import { useRef, useEffect } from 'react'

interface ScrollToBottomProps {
  children: React.ReactNode
}

const ScrollToBottom = ({ children }: ScrollToBottomProps) => {
  const dummy = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dummy.current?.scrollIntoView({ behavior: 'smooth' })
  }, [children])

  return (
    <>
      {children}
      <div ref={dummy} />
    </>
  )
}

export default ScrollToBottom
