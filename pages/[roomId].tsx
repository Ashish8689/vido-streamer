import Player from '@/component/Player/Player.component'
import { useWebSocketConnector } from '@/component/context/SocketProvider'
import useMediaStream from '@/component/hooks/useMediaStream'
import usePeer from '@/component/hooks/usePeer'
import usePlayer from '@/component/hooks/usePlayer'
import { log } from 'console'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Room = () => {
    const { socket } = useWebSocketConnector()
    const roomId = useRouter().query.roomId as string
    const { peer, peerId } = usePeer()
    const { stream } = useMediaStream()
    const { player, setPlayer, toggleAudio, toggleVideo, leaveRoom } =
        usePlayer(peerId, roomId, peer)

    const [user, setUser] = useState({})

    const handleUserConnected = (newUserId) => {
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
    }

    const handleToggleAudio = (userId) => {
        console.log('toggling audio for player', userId)
        setPlayer((prev) => ({
            ...prev,
            [userId]: { ...prev[userId], muted: !prev[userId].muted },
        }))
    }

    const handleToggleVideo = (userId) => {
        console.log('toggling video for player', userId)
        setPlayer((prev) => ({
            ...prev,
            [userId]: { ...prev[userId], playing: !prev[userId].playing },
        }))
    }

    const handleUserLeave = (userId) => {
        console.log('User have leaved', userId)
        user[userId]?.close()

        setPlayer((prev) => {
            delete prev[userId]
            return { ...prev }
        })
    }

    useEffect(() => {
        if (!socket || !stream) return
        socket?.on('user-connected', handleUserConnected)

        return () => {
            socket?.off('user-connected', handleUserConnected)
        }
    }, [socket, stream])

    useEffect(() => {
        if (!socket) return
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
        if (!peer || !stream) return
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
    }, [peer, stream])

    useEffect(() => {
        if (!stream || !peerId) return
        console.log('setting my stream', stream)
        setPlayer((prev) => ({
            ...prev,
            [peerId]: {
                url: stream,
                muted: true,
                playing: true,
            },
        }))
    }, [stream, peerId])

    return Object.entries(player).map(([key, value]) => (
        <Player
            key={key}
            playerId={key}
            url={value.url}
            muted={value.muted}
            playing={value.playing}
            onToggleVideo={toggleVideo}
            onToggleAudio={toggleAudio}
            onLeaveRoom={leaveRoom}
        />
    ))
}

export default Room
