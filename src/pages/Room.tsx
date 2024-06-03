import { useEffect, useState } from "react";

const ChatRoom = () => {
    const [username, setUsername] = useState("");
    useEffect(() => {
        async function getInfo() {
            const res = await fetch("http://localhost:4000/api/v1/user/", {
                headers: { "Content-Type": "application/json" },
                method: 'get',
                mode: 'cors',
                credentials: 'include'
            })
            const data = await res.json();
            setUsername(data.username);
        }
        getInfo();
    }, [])
    return (
        <>
            <h1>Chat Room</h1>
            <p>Welcome {username.toUpperCase()}</p>

        </>
    );
}

export default ChatRoom;