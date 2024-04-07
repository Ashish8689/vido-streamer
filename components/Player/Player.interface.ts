import { PlayerObject } from '../hooks/hooks.interface'

export interface PlayerProps {
    primaryPlayer: PlayerObject
    secondaryPlayers: PlayerObject[]
    onLeaveRoom: () => void
    onToggleAudio: () => void
    onToggleVideo: () => void
}
