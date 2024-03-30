import { WebSocketProvider } from '@/component/context/SocketProvider'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Socket } from 'socket.io'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <WebSocketProvider>
            <Component {...pageProps} />
        </WebSocketProvider>
    )
}
