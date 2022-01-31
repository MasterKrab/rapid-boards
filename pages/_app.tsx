import type { AppProps } from 'next/app'
import globalStyles from 'styles/globalStyles'
import FloatingFocus from 'components/FloatingFocus'
import 'styles/normalize.css'
import '@fontsource/poppins'

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Component {...pageProps} />
    <FloatingFocus />
    <style jsx global>
      {globalStyles}
    </style>
  </>
)

export default App
