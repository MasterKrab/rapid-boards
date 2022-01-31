import { useEffect } from 'react'

const FloatingFocus = () => {
  useEffect(() => {
    import('@q42/floating-focus-a11y').then(({ default: FloatingFocus }) => {
      // eslint-disable-next-line no-new
      new FloatingFocus()
    })
  }, [])

  return (
    <style jsx global>{`
      *:focus {
        outline: none;
      }

      .floating-focus-enabled :focus,
      .floating-focus-enabled .focus {
        outline: dodgerblue solid 2px;
        outline-offset: 8px;
      }

      .floating-focus-enabled [type='button']:focus {
        outline-color: green;
        outline-offset: 4px;
      }
    `}</style>
  )
}

export default FloatingFocus
