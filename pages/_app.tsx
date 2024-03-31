import { WebSocketProvider } from '@/component/context/SocketProvider'
import '@/styles/globals.css'
import '@/styles/home.css'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <WebSocketProvider>
            <Component {...pageProps} />
        </WebSocketProvider>
    )
}
