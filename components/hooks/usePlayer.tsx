import { useState } from 'react'
import { useWebSocketConnector } from '../context/SocketProvider'
import { useRouter } from 'next/router'
import { Player, UsePlayer, UsePlayerReturn } from './hooks.interface'

const usePlayer = ({
    peerId: currentUserId,
    roomId,
    peer,
}: UsePlayer): UsePlayerReturn => {
    const router = useRouter()
    const { socket } = useWebSocketConnector()
    const [player, setPlayer] = useState<Player>({})

    const leaveRoom = (): void => {
        socket?.emit('leave-room', roomId, currentUserId)
        console.log('leaving room', roomId, currentUserId)
        peer?.disconnect()
        router.push('/')
    }

    const toggleAudio = (): void => {
        console.log('toggling audio for player', currentUserId)
        setPlayer((prev) => ({
            ...prev,
            [currentUserId]: {
                ...player[currentUserId],
                muted: !player[currentUserId].muted,
            },
        }))

        socket?.emit('toggle-audio', roomId, currentUserId)
    }

    const toggleVideo = (): void => {
        console.log('toggling video for player', currentUserId)
        setPlayer((prev) => ({
            ...prev,
            [currentUserId]: {
                ...player[currentUserId],
                playing: !player[currentUserId].playing,
            },
        }))

        socket?.emit('toggle-video', roomId, currentUserId)
    }

    return { player, setPlayer, toggleAudio, toggleVideo, leaveRoom }
}

export default usePlayer
