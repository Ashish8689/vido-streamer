export interface MediaControllerProps {
    muted: boolean
    playing: boolean
    onChangeVideo: () => void
    onChangeAudio: () => void
    onLeaveRoom: () => void
}
