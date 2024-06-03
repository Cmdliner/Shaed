import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface IChatMessage { owner: string, text: string }

const ChatRoom = () => {
    const { roomID } = useParams();
    const [username, setUsername] = useState("");
    const [messages, setMessages] = useState<any>([]);
    useEffect(() => {
        async function getInfo() {
            const res = await fetch(`http://localhost:4000/api/v1/rooms/${roomID}/messages`, {
                headers: { "Content-Type": "application/json" },
                method: 'get',
                mode: 'cors',
                credentials: 'include'
            })
            const data = await res.json();
            const mssgs = data.messages
            console.log(Array.isArray(mssgs))
            setMessages(mssgs);
        }
        getInfo();
    }, [])
    return (
        <>
            <h1>Chat Room</h1>
            {messages && (messages as Array<any>).map(mssg => (
                <p key={mssg._id}>Message =&gt; {mssg.text}</p>
            ))}

        </>
    );
}

export default ChatRoom;