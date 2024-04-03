import { WebSocketProvider } from '@/components/context/SocketProvider'
import '@/styles/globals.css'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <WebSocketProvider>
            <Component {...pageProps} />
        </WebSocketProvider>
    )
}
