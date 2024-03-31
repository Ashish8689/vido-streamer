import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useWebSocketConnector } from '../context/SocketProvider'
import Peer from 'peerjs'

const usePeer = () => {
    const [peer, setPeer] = useState<Peer | null>(null)
    const [peerId, setPeerId] = useState<string | null>(null)
    const isPeerSet = useRef(false)
    const roomId = useRouter().query.roomId as string
    const { socket } = useWebSocketConnector()

    const initializePeer = async () => {
        // wait for peerjs to be loaded
        // way to import package dynamically in useEffect react for SSR
        const myPeer = new (await import('peerjs')).default()
        setPeer(myPeer)

        myPeer.on('open', (id) => {
            console.log('My peer ID is: ' + id)
            setPeerId(id)
            socket?.emit('join-room', roomId, id)
        })
    }

    useEffect(() => {
        if (isPeerSet.current || !roomId || !socket) return
        isPeerSet.current = true
        initializePeer()
    }, [roomId, socket])

    return { peer, peerId }
}

export default usePeer
