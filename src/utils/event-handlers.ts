import { Socket } from "socket.io-client";

export function emitJoinEvent(socket: Socket, data: any) {
    socket.timeout(5000).emit('joinRoom', `User ${data.username} joined`, (err: any) => {
        if(err) emitJoinEvent(socket, data);
    });
}