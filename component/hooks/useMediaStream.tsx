import React, { useEffect, useRef, useState } from 'react'

const useMediaStream = () => {
    const [mediaStream, setMediaStream] = useState<MediaStream | string>('')
    const isStreamInitialized = useRef(false)

    const getMediaStream = async () => {
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
