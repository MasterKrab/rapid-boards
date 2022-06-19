import { useEffect } from 'react'

const useEventListener = <Type extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  type: Type,
  handler: (this: HTMLElement, event: HTMLElementEventMap[Type]) => void
) => {
  useEffect(() => {
    element.addEventListener(type, handler)

    return () => element.removeEventListener(type, handler)
  }, [element, type, handler])
}

export default useEventListener
