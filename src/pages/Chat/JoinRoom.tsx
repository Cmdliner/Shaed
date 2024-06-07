import { FormEvent, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { emitJoinEvent } from "../../utils/event-handlers";
import { socket } from "../../utils/socket";

const JoinRoom = () => {
    const { roomID } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    function handleJoinRoom(e: FormEvent) {
        e.preventDefault();
        fetch(`${import.meta.env.VITE_API_SERVER_URI}/rooms/${roomID}/join`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            credentials: 'include',
        })
            .then(res => res.json())
            // Do socket events stuff here
            .then(data => {
                if (data["errMssg"]) setError(data["errMssg"]);
                else {
                    emitJoinEvent(socket, data);
                    navigate(`/${roomID}/chat`)}
            })
            .catch((err: any) => {
                console.error(err);
                setError(err.message);
            })
    }

    return (
        <>
            {error && <h3>{error}</h3>}
            <form onSubmit={(e) => handleJoinRoom(e)}>
                <h1>Do you want to join this room?</h1>
                <button>Join Room</button>
            </form>
        </>
    );
}

export default JoinRoom;