import { useMemo, useState } from 'react'
import { useWebSocketConnector } from '../context/SocketProvider'
import { useRouter } from 'next/router'
import { Player, UsePlayer, UsePlayerReturn } from './hooks.interface'

const usePlayer = ({
    currentUserPeerId,
    roomId,
    peer,
}: UsePlayer): UsePlayerReturn => {
    const router = useRouter()
    const { socket } = useWebSocketConnector()
    const [player, setPlayer] = useState<Player>({})

    const { primaryPlayer, secondaryPlayers } = useMemo(() => {
        return {
            primaryPlayer: player[currentUserPeerId],
            secondaryPlayers: Object.keys(player)
                .filter((playerId) => playerId !== currentUserPeerId)
                .map((playerId) => player[playerId]),
        }
    }, [player, currentUserPeerId])

    const leaveRoom = (): void => {
        socket?.emit('leave-room', roomId, currentUserPeerId)
        console.log('leaving room', roomId, currentUserPeerId)
        peer?.disconnect()
        router.push('/')
    }

    const toggleAudio = (): void => {
        console.log('toggling audio for player', currentUserPeerId)
        setPlayer((prev) => ({
            ...prev,
            [currentUserPeerId]: {
                ...player[currentUserPeerId],
                muted: !player[currentUserPeerId].muted,
            },
        }))

        socket?.emit('toggle-audio', roomId, currentUserPeerId)
    }

    const toggleVideo = (): void => {
        console.log('toggling video for player', currentUserPeerId)
        setPlayer((prev) => ({
            ...prev,
            [currentUserPeerId]: {
                ...player[currentUserPeerId],
                playing: !player[currentUserPeerId].playing,
            },
        }))

        socket?.emit('toggle-video', roomId, currentUserPeerId)
    }

    console.log({ player, primaryPlayer, secondaryPlayers })

    return {
        player,
        primaryPlayer,
        secondaryPlayers,
        setPlayer,
        toggleAudio,
        toggleVideo,
        leaveRoom,
    }
}

export default usePlayer
