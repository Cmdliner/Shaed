import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { API_SERVER } from "../../utils/env_alias";
import { genFetchOpts } from "../../utils/fetch_options";
import ErrorInfo from "../../components/ErrorInfo";

const Rooms = () => {
    const [error, setError] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [rooms, setRooms] = useState<any[]>([]);
    const nameQuery = searchParams.get('name');
    
    useEffect(() => {
        async function fetchRooms() {
                try {
                    console.log("Name Query =", nameQuery);
                    const res = await fetch(nameQuery ?`${API_SERVER}/rooms?name=${nameQuery}` : `${API_SERVER}/rooms`, genFetchOpts("GET"));
                    const data = await res.json();
                    if(data['errMssg'])  throw new Error(data['errMssg']);
                     setRooms(data?.rooms);
                } catch (error) {
                    console.error(error);
                    setError((error as Error).message);
                }    
        }
        fetchRooms()
    }, [searchParams]);

    return ( 
        <div className="min-h-screen pt-[3rem]">
        {error && <ErrorInfo error={error}/>}
        <h1 className="text-3xl">All Rooms</h1>
            <input type="search" onChange={(e) => setSearchParams('name', {replace: true, state: e.target.value})} />
            {rooms && rooms.length === 0 ? <div>No rooms yet :(</div> : <div>
                {rooms.map(room => (
                    <div key={room._id}>
                        <Link to={`/rooms/${room._id}/chat`}>{room.name} created by {room.host.username}</Link>
                    </div>
                ))}
            </div>
            }
        </div>
     );
}
 
export default Rooms;
