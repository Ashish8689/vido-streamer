import { useEffect, useRef, useState } from 'react'
import { useMediaStreamReturn } from './hooks.interface'

const useMediaStream = (): useMediaStreamReturn => {
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)
    const isStreamInitialized = useRef(false)

    const getMediaStream = async (): Promise<void> => {
        try {
            const response = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            })
            setMediaStream(response)
            isStreamInitialized.current = true
        } catch (error) {
            console.error('Error accessing media devices.', error)
        }
    }

    useEffect(() => {
        if (!isStreamInitialized.current) {
            getMediaStream()
        }
    }, [])

    return {
        stream: mediaStream,
    }
}

export default useMediaStream
