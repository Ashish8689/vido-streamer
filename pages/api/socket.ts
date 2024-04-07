import type { NextApiRequest, NextApiResponse } from 'next'
import { Server } from 'socket.io'

export default function socketHandler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
): void {
    if ((req.socket as any).server.io) {
        console.log('Socket.io instance is available')
    } else {
        const io = new Server((req.socket as any).server)
        ;(req.socket as any).server.io = io

        io.on('connection', (socket) => {
            console.log('Socket connected', socket.id)

            socket.on('join-room', (roomId, userId) => {
                console.log('User joined room', roomId, userId)
                socket.join(roomId)
                // broadcast to all clients in the room
                socket.broadcast.to(roomId).emit('user-connected', userId)
            })

            socket.on('toggle-audio', (roomId, userId) => {
                console.log('User toggle audio', roomId, userId)
                socket.join(roomId)
                // broadcast to all clients in the room
                socket.broadcast.to(roomId).emit('toggle-audio', userId)
            })

            socket.on('toggle-video', (roomId, userId) => {
                console.log('User toggle video', roomId, userId)
                socket.join(roomId)
                // broadcast to all clients in the room
                socket.broadcast.to(roomId).emit('toggle-video', userId)
            })

            socket.on('leave-room', (roomId, userId) => {
                console.log('User leave room', roomId, userId)
                socket.join(roomId)
                // broadcast to all clients in the room
                socket.broadcast.to(roomId).emit('leave-room', userId)
            })
        })
    }

    res.end()
}
