import { useEffect } from 'react'

const useWindowEvent = <Type extends keyof WindowEventMap>(
  type: Type,
  handler: (this: Window, event: WindowEventMap[Type]) => void
) => {
  useEffect(() => {
    window.addEventListener(type, handler)

    return () => window.removeEventListener(type, handler)
  }, [type, handler])
}

export default useWindowEvent
