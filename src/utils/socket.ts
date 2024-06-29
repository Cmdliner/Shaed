import { io, Socket } from "socket.io-client";

let socket: Socket;

const URL = import.meta.env.VITE_CHAT_SERVER_URI;
export const initSocket = () => {
    socket = io(URL);
    return socket;
}

export const getSocket = () => {
    if(!socket) {
        throw new Error('Socket not initialized!');
    }
    return socket;
}



