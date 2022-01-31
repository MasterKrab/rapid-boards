import { useEffect } from 'react'

const useWindowEvent = <Type extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  type: Type,
  handler: (this: HTMLElement, event: HTMLElementEventMap[Type]) => void
) => {
  useEffect(() => {
    element.addEventListener(type, handler)

    return () => element.removeEventListener(type, handler)
  }, [element, type, handler])
}

export default useWindowEvent
