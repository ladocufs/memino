import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'

import type { AppProps } from 'next/app'

function Memino({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default Memino
