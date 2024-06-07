import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Rooms = () => {
    interface IRoomData { name: string; _id: string };
    const URI = `${import.meta.env.VITE_API_SERVER_URI}/user/rooms`;
    const [error, setError] = useState("");
    const [roomData, setRoomData] = useState<Array<IRoomData>>([]);

    useEffect(() => {
        fetch(URI, {
            headers: { "Content-Type": "application/json" },
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (data["errMssg"]) setError(data["errMssg"]);
                else {
                    const rooms = data.rooms;
                    setRoomData(rooms);
                }

            })
            .catch((err: any) => {
                console.error(err);
                setError((err as Error).message);
            });
    }, [URI]);

    return (
        <>
            <div>Your Rooms</div>
            { error && <h2>{error}</h2> }
            <ul>
                {roomData.length > 0 ? (
                    roomData.map((room) => (
                        <li key={room._id}><Link to={`/${room._id}/chat`}>{room.name}</Link></li>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </ul>
        </>
    );
}

export default Rooms;
