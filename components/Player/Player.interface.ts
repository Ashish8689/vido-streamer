export interface PlayerProps {
    url: MediaStream | string
    playerId: string
    playing: boolean
    muted: boolean
    onLeaveRoom: () => void
    onToggleAudio: () => void
    onToggleVideo: () => void
}
