import Player from '@/components/Player/Player.component'
import { useWebSocketConnector } from '@/components/context/SocketProvider'
import useMediaStream from '@/components/hooks/useMediaStream'
import usePeer from '@/components/hooks/usePeer'
import usePlayer from '@/components/hooks/usePlayer'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'

const Room: React.FC = () => {
    const roomId = useRouter().query.roomId as string
    const { socket } = useWebSocketConnector()
    const { stream } = useMediaStream()
    const { peer, currentUserPeerId } = usePeer()
    const { player, setPlayer, toggleAudio, toggleVideo, leaveRoom } =
        usePlayer({ currentUserPeerId, roomId, peer })

    const [user, setUser] = useState({})

    const handleUserConnected = useCallback(
        (newUserId: string): void => {
            console.log('user connected in a room with id', newUserId)

            const call = peer?.call(newUserId, stream)

            call.on('stream', (incomingUserVideoStream) => {
                console.log('incoming user video stream', {
                    incomingUserVideoStream,
                    newUserId,
                })
                setPlayer((prev) => ({
                    ...prev,
                    [newUserId]: {
                        url: incomingUserVideoStream,
                        muted: true,
                        playing: true,
                    },
                }))

                setUser((prev) => ({
                    ...prev,
                    [newUserId]: call,
                }))
            })
        },
        [peer, stream, setPlayer, setUser],
    )

    const handleToggleAudio = useCallback(
        (userId: string): void => {
            console.log('toggling audio for player', userId)
            setPlayer((prev) => ({
                ...prev,
                [userId]: { ...prev[userId], muted: !prev[userId].muted },
            }))
        },
        [setPlayer],
    )

    const handleToggleVideo = useCallback(
        (userId: string): void => {
            console.log('toggling video for player', userId)
            setPlayer((prev) => ({
                ...prev,
                [userId]: { ...prev[userId], playing: !prev[userId].playing },
            }))
        },
        [setPlayer],
    )

    const handleUserLeave = useCallback(
        (userId: string): void => {
            console.log('User have leaved', userId)
            user[userId]?.close()

            setPlayer((prev) => {
                delete prev[userId]

                return { ...prev }
            })
        },
        [user, setPlayer],
    )

    useEffect(() => {
        if (!socket || !stream) {
            return
        }
        socket?.on('user-connected', handleUserConnected)

        return () => {
            socket?.off('user-connected', handleUserConnected)
        }
    }, [socket, stream, handleUserConnected])

    useEffect(() => {
        if (!socket) {
            return
        }
        socket?.on('toggle-audio', handleToggleAudio)
        socket?.on('toggle-video', handleToggleVideo)
        socket?.on('leave-room', handleUserLeave)

        return () => {
            socket?.off('toggle-audio', handleToggleAudio)
            socket?.off('toggle-video', handleToggleVideo)
            socket?.off('leave-room', handleUserLeave)
        }
    }, [
        socket,
        setPlayer,
        handleToggleAudio,
        handleToggleVideo,
        handleUserLeave,
    ])

    useEffect(() => {
        if (!peer || !stream) {
            return
        }

        peer.on('call', (call) => {
            const { peer: callerId } = call
            call.answer(stream)

            call.on('stream', (incomingUserVideoStream) => {
                console.log('incoming user video stream', {
                    incomingUserVideoStream,
                    callerId,
                })
                setPlayer((prev) => ({
                    ...prev,
                    [callerId]: {
                        url: incomingUserVideoStream,
                        muted: true,
                        playing: true,
                    },
                }))
                setUser((prev) => ({
                    ...prev,
                    [callerId]: call,
                }))
            })
        })
    }, [peer, stream, setPlayer])

    // Setting Current User Stream
    useEffect(() => {
        if (!stream || !currentUserPeerId) {
            return
        }
        console.log('setting my stream', stream)
        setPlayer((prev) => ({
            ...prev,
            [currentUserPeerId]: {
                url: stream,
                muted: true,
                playing: true,
            },
        }))
    }, [stream, currentUserPeerId, setPlayer])

    return (
        <div className="bg-gray-950 h-screen">
            {Object.entries(player).map(([key, value]) => (
                <Player
                    currentUserPeerId={currentUserPeerId}
                    key={key}
                    muted={value.muted}
                    playerId={key}
                    playing={value.playing}
                    url={value.url}
                    onLeaveRoom={leaveRoom}
                    onToggleAudio={toggleAudio}
                    onToggleVideo={toggleVideo}
                />
            ))}
        </div>
    )
}

export default Room
