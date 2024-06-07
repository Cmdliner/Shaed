import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// interface IChatMessage { owner: string, text: string }

const ChatRoom = () => {
    const { roomID } = useParams();
    const [messages, setMessages] = useState<any>([]);
    const [text, setText] = useState("");
    const [hasSentMssg, setHasSentMssg] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
        async function getMessages() {
            const res = await fetch(`${import.meta.env.VITE_API_SERVER_URI}/rooms/${roomID}/messages`, {
                headers: { "Content-Type": "application/json" },
                method: 'get',
                mode: 'cors',
                credentials: 'include'
            })
            const data = await res.json();
            if (data["errMssg"]) setError(data["errMssg"]);
            else {
                const mssgs = data.messages
                setMessages(mssgs);
            }

        }
        getMessages();
    }, [hasSentMssg]);

    function sendMessage(e: FormEvent) {
        e.preventDefault();
        // Socket stuff here

        fetch(`${import.meta.env.VITE_API_SERVER_URI}/rooms/${roomID}/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify({ content: text })
        })
            .then((res) => res.json())
            .then(data => {
                if (data["errMssg"]) {
                    setError(data["errMssg"]);
                }
                else {
                    setHasSentMssg(!hasSentMssg);}
            })
            .catch((err: any) => {
                console.error(error);
                setError((err as Error).message);
            });
    }

    return (
        <>
            <h1>Chat Room</h1>
            {error && <h2>{error}</h2>}
            {messages && (messages as Array<any>).map(mssg => (
                <div key={mssg._id} className="border vorder-teal w-[20%] text-wrap">
                    <h2 className="text-xl"> {mssg.text}</h2>
                    <small><i>{mssg.sender.username}</i></small>
                </div>
            ))}
            <form onSubmit={(e) => sendMessage(e)}>
                <input type="text" id="newMssg" className="text-black" onChange={(e) => setText(e.target.value)} />
                {/* Here => "!!error" in disabled attribute changes the type of error using logical operators to boolean */}
                <button type="submit" disabled={!!(error)}>Send</button>
            </form>

        </>
    );
}

export default ChatRoom;