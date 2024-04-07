import { v4 as uuid_4 } from 'uuid'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useCallback, useState } from 'react'
import Image from 'next/image'
import VideCameraIcon from '../public/svg/video-camera.svg'

export default function Home(): JSX.Element {
    const router = useRouter()
    const [joinRoomId, setJoinRoomId] = useState('')

    const onJoinRoomIdChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setJoinRoomId(e.target.value),
        [],
    )

    const createRoom = (): void => {
        const roomId = uuid_4()
        router.push(`/${roomId}`)
    }

    const joinRoom = (): void => router.push(`/${joinRoomId}`)

    return (
        <div className="overflow-hidden bg-[#fdfdfd]">
            <header className="bg-[#3d5af1] p-3">
                <div className="flex items-center">
                    <Image
                        alt="video-conference-icon"
                        height={50}
                        src="https://cdn.icon-icons.com/icons2/3053/PNG/512/zoom_macos_bigsur_icon_189524.png"
                        width={50}
                    />

                    <h1 className="ml-1 font-semibold text-slate-50">
                        Video Conference
                    </h1>
                </div>
            </header>

            <div className="h-[calc(100vh-74px)] flex items-center justify-center">
                <div className="w-full max-w-[850px] flex flex-col items-center text-center">
                    <p className="text-7xl font-bold text-gray-700">
                        Video call and meetings for everyone
                    </p>

                    <div className="mt-10 flex items-center">
                        <input
                            className="mx-3 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3d5af1] focus:border-transparent"
                            placeholder="Enter meeting code"
                            type="text"
                            value={joinRoomId}
                            onChange={onJoinRoomIdChange}
                        />

                        <button
                            className="text-gray-400 px-3 py-2 rounded-md hover:bg-[#3d5af1] hover:text-white 
                            disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-transparent disabled:text-gray-400"
                            disabled={!joinRoomId}
                            onClick={joinRoom}
                        >
                            Join Room
                        </button>
                    </div>

                    <p className="my-5 text-gray-600">OR </p>

                    <button
                        className="flex items-center bg-[#3d5af1] text-white px-3 py-2 rounded-md cursor-pointer hover:bg-[#3d5af1]"
                        onClick={createRoom}
                    >
                        <Image
                            alt="video-conference-icon"
                            className="mr-2 text-white"
                            height={20}
                            src={VideCameraIcon}
                            width={20}
                        />
                        New meeting
                    </button>
                </div>
            </div>
        </div>
    )
}
