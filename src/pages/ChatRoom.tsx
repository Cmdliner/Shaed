import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const ChatRoom = () => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        console.log('First use effect');
        const socket = io('http://localhost:4000', { withCredentials: true });
        console.log('Ran. Worked?', socket);
        setSocket(socket);
    }, [])
    useEffect(() => {
        if (socket) {
            socket.on('connection', () => { console.log(socket) })
        } else {
            console.log('Failed to connect to socket')
        }

    }, [socket])

    console.log("Chat room innit");
    return (
        <div className="bg-white text-black">
            <h1>Chat Room</h1>
        </div>
    );
}

export default ChatRoom;
