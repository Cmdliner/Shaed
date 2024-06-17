import { Link, Outlet } from "react-router-dom";
import { API_SERVER } from "../utils/env_alias";
import {  useState, useEffect } from "react";
import RoomHeader from "../components/RoomHeader";
import ErrorList from "../components/ErrorList";

const RoomLayout = () => {
    const [errors, setErrors] = useState<string[]>([]);
    const [rooms, setRooms] = useState<any[]>();
    const [isLoading, setIsLoading] =  useState(true);
    const fetchOptions: RequestInit = {
        headers: { "Content-Type": "application/json" },
        method: "GET",
        mode: 'cors',
        credentials: 'include'
    }
    useEffect(() => {
        async function fetchRooms() {
            let error = "";
            
            try {
                const res = await fetch(`${API_SERVER}/user/rooms`, fetchOptions);
                const data = await res.json();
                
                if (data["errMssg"]) {
                    error = data["errMssg"];
                    setErrors([...errors, error]);
                }
                if(!data["errMssg"] && data.rooms.length === 0) setRooms(["No rooms yet :("]);
                else setRooms(data.rooms);        

            } catch (err) {
                console.error(err);
                setErrors([...errors, (err as Error).message ]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRooms();

    }, []);

    return (

	<>
	<RoomHeader />
        <div className="flex">
            <aside className="border-r border-black min-w-[15%] min-h-screen p-4">
                {isLoading && <div>Loading...</div> }
                {errors && <ErrorList errors={errors} />}
                {(rooms && rooms.length > 0) && rooms.map((room: any) => (
                    <div key={room._id!}>
                        <Link to={`/rooms/${room._id!}/chat`}>{room.name}</Link>
                    </div>
                ))}
            </aside>
            <main className="p-4 border border-red-500 w-auto">
                <Outlet />
            </main>
        </div>  
	</>
    );
}

export default RoomLayout;
