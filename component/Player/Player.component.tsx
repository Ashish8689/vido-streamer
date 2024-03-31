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
}: PlayerProps): JSX.Element => {
    return (
        <>
            <ReactPlayer muted={muted} playing={playing} url={url} />
            <MediaController
                muted={muted}
                playing={playing}
                onChangeAudio={onToggleAudio}
                onChangeVideo={onToggleVideo}
                onLeaveRoom={onLeaveRoom}
            />
        </>
    )
}

export default Player
