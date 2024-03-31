import React from 'react'
import { MediaControllerProps } from './MediaController.interface'

const MediaController = ({
    muted,
    playing,
    onChangeVideo,
    onChangeAudio,
    onLeaveRoom,
}: MediaControllerProps) => {
    return (
        <div>
            <button onClick={onChangeVideo}>
                {playing ? 'Stop Video' : 'Start Video'}
            </button>
            <button onClick={onChangeAudio}>{muted ? 'Unmute' : 'Mute'}</button>

            <button onClick={onLeaveRoom}>Leave Room</button>
        </div>
    )
}

export default MediaController
