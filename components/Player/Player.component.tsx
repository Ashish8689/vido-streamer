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
            <div className="h-[90vh] w-full flex items-center">
                <ReactPlayer
                    height="90%"
                    muted={muted}
                    playing={playing}
                    url={url}
                    width="100%"
                />
            </div>
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
