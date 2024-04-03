import React from 'react'
import { MediaControllerProps } from './MediaController.interface'
import Image from 'next/image'
import MuteIcon from '../../public/svg/mute.svg'
import UnMuteIcon from '../../public/svg/un-mute.svg'
import VideoIcon from '../../public/svg/video.svg'
import VideoCloseIcon from '../../public/svg/video-close.svg'
import leaveRoomIcon from '../../public/svg/leave-room.svg'

const MediaController = ({
    muted,
    playing,
    onChangeVideo,
    onChangeAudio,
    onLeaveRoom,
}: MediaControllerProps): JSX.Element => {
    return (
        <div className="h-[10vh] bg-gray-800 flex justify-center items-center gap-10">
            <button
                className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-700"
                onClick={onChangeAudio}
            >
                <Image
                    alt="media-audio-icon"
                    height={16}
                    src={muted ? UnMuteIcon : MuteIcon}
                    width={16}
                />
            </button>

            <button
                className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-700"
                onClick={onChangeVideo}
            >
                <Image
                    alt="media-audio-icon"
                    height={26}
                    src={playing ? VideoIcon : VideoCloseIcon}
                    width={26}
                />
            </button>

            <button
                className="flex items-center text-slate-200 rounded-3xl h-12 p-3 bg-red-500"
                onClick={onLeaveRoom}
            >
                <Image
                    alt="leave-room-icon"
                    className="mr-2"
                    height={26}
                    src={leaveRoomIcon}
                    width={26}
                />
                Leave Room
            </button>
        </div>
    )
}

export default MediaController
