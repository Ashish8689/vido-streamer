import type { NextApiRequest, NextApiResponse } from 'next'
import { Server } from 'socket.io'

type Data = {
    name: string
}

export default function socketHandler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    if ((req.socket as any).server.io) {
        console.log('Socket.io instance is available')
    } else {
        const io = new Server(req.socket.server)
        req.socket.server.io = io

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
    //   res.status(200).json({ name: "John Doe" });
}
