import React from 'react'
import ReactPlayer from 'react-player'
import { PlayerProps } from './Player.interface'
import MediaController from '../MediaController/MediaController.component'

const Player = ({
    url,
    playerId,
    playing,
    muted,
    onToggleAudio,
    onToggleVideo,
    onLeaveRoom,
}: PlayerProps) => {
    return (
        <>
            <ReactPlayer url={url} playing={playing} muted={muted} />
            <MediaController
                onChangeVideo={onToggleVideo}
                onChangeAudio={onToggleAudio}
                playing={playing}
                muted={muted}
                onLeaveRoom={onLeaveRoom}
            />
        </>
    )
}

export default Player
