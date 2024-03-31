import Peer from 'peerjs'

export interface PlayerObject {
    url: string
    muted: boolean
    playing: boolean
}

export interface Player {
    [key: string]: PlayerObject
}

export interface UsePlayer {
    peerId: string
    roomId: string
    peer: Peer | null
}

export interface UsePlayerReturn {
    player: Player
    setPlayer: React.Dispatch<React.SetStateAction<Player>>
    toggleAudio: () => void
    toggleVideo: () => void
    leaveRoom: () => void
}

export interface usePeerReturn {
    peer: Peer | null
    peerId: string
}
export interface useMediaStreamReturn {
    stream: MediaStream | null
}
