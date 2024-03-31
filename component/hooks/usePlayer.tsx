import React, { useState } from 'react'
import { useWebSocketConnector } from '../context/SocketProvider'
import { useRouter } from 'next/router'

const usePlayer = (myPlayerId, roomId, peer) => {
    const router = useRouter()
    const { socket } = useWebSocketConnector()
    const [player, setPlayer] = useState({})

    const leaveRoom = () => {
        socket?.emit('leave-room', roomId, myPlayerId)
        console.log('leaving room', roomId, myPlayerId)
        peer.disconnect()
        router.push('/')
    }

    const toggleAudio = () => {
        console.log('toggling audio for player', myPlayerId)
        setPlayer((prev) => ({
            ...prev,
            [myPlayerId]: {
                ...player[myPlayerId],
                muted: !player[myPlayerId].muted,
            },
        }))

        socket?.emit('toggle-audio', roomId, myPlayerId)
    }

    const toggleVideo = () => {
        console.log('toggling video for player', myPlayerId)
        setPlayer((prev) => ({
            ...prev,
            [myPlayerId]: {
                ...player[myPlayerId],
                playing: !player[myPlayerId].playing,
            },
        }))

        socket?.emit('toggle-video', roomId, myPlayerId)
    }

    return { player, setPlayer, toggleAudio, toggleVideo, leaveRoom }
}

export default usePlayer
