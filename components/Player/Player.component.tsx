import React from 'react'
import ReactPlayer from 'react-player'
import { PlayerProps } from './Player.interface'
import MediaController from '../MediaController/MediaController.component'

const Player = ({
    currentUserPeerId,
    url,
    playerId,
    playing,
    muted,
    onToggleAudio,
    onToggleVideo,
    onLeaveRoom,
}: PlayerProps): JSX.Element => {
    return (
        <React.Fragment>
            <div
                className={
                    currentUserPeerId === playerId
                        ? 'h-[90vh] flex justify-center items-center'
                        : 'absolute top-8 right-10 w-60'
                }
            >
                <div
                    className={`rounded-xl overflow-hidden
                        ${
                            currentUserPeerId === playerId
                                ? `${!playing && 'w-[60%]'} h-[90%]`
                                : 'm-auto w-full h-full'
                        } ${!playing && 'border-2 border-gray-600'}`}
                >
                    {playing ? (
                        <ReactPlayer
                            height="100%"
                            muted={muted}
                            playing={playing}
                            style={{ borderRadius: '10px', overflow: 'hidden' }}
                            url={url}
                            width="100%"
                        />
                    ) : (
                        <div
                            className={`bg-gray-700 flex justify-center items-center ${currentUserPeerId === playerId ? 'w-90% h-full' : 'w-full h-44'}`}
                        >
                            <h4 className="text-white text-3xl">
                                Ashish Gupta
                            </h4>
                        </div>
                    )}
                </div>
            </div>

            {currentUserPeerId === playerId && (
                <MediaController
                    muted={muted}
                    playing={playing}
                    onChangeAudio={onToggleAudio}
                    onChangeVideo={onToggleVideo}
                    onLeaveRoom={onLeaveRoom}
                />
            )}
        </React.Fragment>
    )
}

export default Player
