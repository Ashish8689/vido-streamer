import React from 'react'
import ReactPlayer from 'react-player'
import { PlayerProps } from './Player.interface'
import MediaController from '../MediaController/MediaController.component'
import Image from 'next/image'
import MuteIcon from '../../public/svg/mute.svg'
import UnMuteIcon from '../../public/svg/un-mute.svg'

const Player = ({
    primaryPlayer,
    secondaryPlayers,
    onToggleAudio,
    onToggleVideo,
    onLeaveRoom,
}: PlayerProps): JSX.Element => {
    return (
        <React.Fragment>
            <div className="h-[90vh] flex justify-center items-center">
                <div
                    className={`rounded-xl overflow-hidden
                        ${!primaryPlayer.playing && 'w-[60%] border-2 border-gray-600'} h-[90%]`}
                >
                    {primaryPlayer.playing ? (
                        <ReactPlayer
                            height="100%"
                            muted={primaryPlayer.muted}
                            playing={primaryPlayer.playing}
                            style={{
                                borderRadius: '10px',
                                overflow: 'hidden',
                            }}
                            url={primaryPlayer.url}
                            width="100%"
                        />
                    ) : (
                        <div className="bg-gray-700 flex justify-center items-center w-90% h-full">
                            <Image
                                alt="user-icon"
                                height={400}
                                src="https://icons.veryicon.com/png/o/miscellaneous/two-color-webpage-small-icon/user-244.png"
                                width={400}
                            />
                        </div>
                    )}
                </div>

                <div className="absolute top-8 right-10 w-60 flex flex-col gap-4">
                    {secondaryPlayers.map((player) => (
                        <div
                            className={`relative rounded-xl overflow-hidden m-auto w-full h-full ${!player.playing && 'border-2 border-gray-600'}`}
                            key={player.userId}
                        >
                            {player.playing ? (
                                <ReactPlayer
                                    height="100%"
                                    muted={player.muted}
                                    playing={player.playing}
                                    style={{
                                        borderRadius: '10px',
                                        overflow: 'hidden',
                                    }}
                                    url={player.url}
                                    width="100%"
                                />
                            ) : (
                                <div className="bg-gray-700 flex justify-center items-center w-full h-44">
                                    <Image
                                        alt="user-icon"
                                        height={150}
                                        src="https://icons.veryicon.com/png/o/miscellaneous/two-color-webpage-small-icon/user-244.png"
                                        width={150}
                                    />
                                </div>
                            )}

                            <Image
                                alt="media-audio-icon"
                                className="absolute top-4 right-4"
                                height={14}
                                src={player.muted ? UnMuteIcon : MuteIcon}
                                width={14}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <MediaController
                muted={primaryPlayer.muted}
                playing={primaryPlayer.playing}
                onChangeAudio={onToggleAudio}
                onChangeVideo={onToggleVideo}
                onLeaveRoom={onLeaveRoom}
            />
        </React.Fragment>
    )
}

export default Player
