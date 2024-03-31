import { v4 as uuid_4 } from 'uuid'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useCallback, useState } from 'react'

export default function Home() {
    const router = useRouter()
    const [joinRoomId, setJoinRoomId] = useState('')

    const onJoinRoomIdChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setJoinRoomId(e.target.value),
        [],
    )

    const createRoom = () => {
        const roomId = uuid_4()
        router.push(`/${roomId}`)
    }

    const joinRoom = () => {
        if (joinRoomId) {
            router.push(`/${joinRoomId}`)
        } else {
            alert('Please enter a room ID')
        }
    }

    return (
        <div>
            <h1>Video Conference</h1>
            <input
                type="text"
                placeholder="Enter Room ID"
                value={joinRoomId}
                onChange={onJoinRoomIdChange}
            />
            <button onClick={joinRoom}>Join Room</button>
            <span>OR </span>
            <button onClick={createRoom}>Create a new room</button>
        </div>
    )
}
