import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useWebSocketConnector } from '../context/SocketProvider'
import Peer from 'peerjs'
import { usePeerReturn } from './hooks.interface'

const usePeer = (): usePeerReturn => {
    const [peer, setPeer] = useState<Peer | null>(null)
    const [currentUserPeerId, setCurrentUserPeerId] = useState<string>('')
    const isPeerSet = useRef(false)
    const roomId = useRouter().query.roomId as string
    const { socket } = useWebSocketConnector()

    const initializePeer = useCallback(async () => {
        // wait for peerjs to be loaded
        // way to import package dynamically in useEffect react for SSR
        const myPeer = new (await import('peerjs')).default()
        setPeer(myPeer)

        myPeer.on('open', (id) => {
            console.log('My peer ID is: ' + id)
            setCurrentUserPeerId(id)
            socket?.emit('join-room', roomId, id)
        })
    }, [roomId, socket])

    useEffect(() => {
        if (isPeerSet.current || !roomId || !socket) {
            return
        }
        isPeerSet.current = true
        initializePeer()
    }, [roomId, socket, initializePeer])

    return { peer, currentUserPeerId }
}

export default usePeer
