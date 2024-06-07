import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LeaveRoom = () => {
    const { roomID } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    function handleLeaveRoom(e: FormEvent) {
        e.preventDefault();
        fetch(`${import.meta.env.VITE_API_SERVER_URI}/rooms/${roomID}/leave`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                // Do sockets event stuff here
                if(data["err"]) setError(data["err"]);
                else navigate("/rooms");
            })
            .catch(error => console.error(error))

    }
    return (
        <>
            <div> {error && <h2>{error}</h2> } </div>
            <form>
                <h3>Are you sure you want to leave this room?</h3>
                <button className="text-white border border-red" onClick={(e) => handleLeaveRoom(e)}>Leave Room</button>
            </form>
        </>
    );
}

export default LeaveRoom;