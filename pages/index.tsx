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
        <div className="overflow-hidden">
            <header className="bg-blue-500 p-3">
                <div className="flex items-center">
                    <Image
                        alt="video-conference-icon"
                        height={50}
                        src="https://cdn-icons-png.freepik.com/512/5180/5180458.png"
                        width={50}
                    />

                    <h1 className="ml-1 font-semibold text-slate-50">
                        Video Conference
                    </h1>
                </div>
            </header>

            <div className="h-[calc(100vh-74px)] flex">
                <div className="flex-1 flex flex-col justify-center p-10">
                    <p className="text-5xl text-gray-800">
                        Video call and meetings for everyone
                    </p>

                    <div className="flex items-center mt-10">
                        <button
                            className="flex items-center bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
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

                        <input
                            className="mx-3 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter meeting code"
                            type="text"
                            value={joinRoomId}
                            onChange={onJoinRoomIdChange}
                        />

                        <button
                            className="text-gray-400 px-3 py-2 rounded-md hover:bg-blue-500 hover:text-white 
                            disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-transparent disabled:text-gray-400"
                            disabled={!joinRoomId}
                            onClick={joinRoom}
                        >
                            Join Room
                        </button>
                    </div>
                </div>
                <div className="flex-1" />
            </div>
        </div>
    )
}
