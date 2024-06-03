import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Rooms = () => {
    interface IRoomData { name: string; _id: string };
    const URI = "http://localhost:4000/api/v1/user/rooms";
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
            const rooms = data.rooms;
            setRoomData(rooms);
        })
        .catch(err => console.error(err));
    }, [URI]);

    return (
        <>
            <div>Your Rooms</div>
            <ul>
            {roomData.length > 0 ? (
                roomData.map((room) => (
                    <li><Link to={`/${room._id}/chat`}>{room.name}</Link></li>
                ))
            ) : (
                <p>Loading...</p>
            )}
            </ul>
        </>
    );
}

export default Rooms;
