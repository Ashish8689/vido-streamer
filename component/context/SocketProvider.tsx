import { createContext, use, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { SocketProviderProps } from './SocketProvider.interface'

export const WebSocketContext = createContext<{ socket?: Socket }>({})

export const WebSocketProvider = ({ children }: SocketProviderProps) => {
    const [socket, setSocket] = useState<Socket>()

    useEffect(() => {
        const connection = io()
        console.log('Connection', connection)

        setSocket(connection)
    }, [])

    socket?.on('connect_error', async (err) => {
        console.log('Error establishing socket', err)
        await fetch('/api/socket')
    })

    return (
        <WebSocketContext.Provider value={{ socket }}>
            {children}
        </WebSocketContext.Provider>
    )
}

export const useWebSocketConnector = () => useContext(WebSocketContext)
