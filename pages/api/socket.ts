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
        const io = new Server((req.socket as any).server)
        ;(req.socket as any).server.io = io

        io.on('connection', (socket) => {
            console.log('Socket connected', socket.id)
        })
    }

    res.end()
    //   res.status(200).json({ name: "John Doe" });
}
