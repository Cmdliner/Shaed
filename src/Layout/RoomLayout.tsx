import { Link, Outlet } from "react-router-dom";
import { API_SERVER } from "../utils/env_alias";
import { useState, useEffect } from "react";
import RoomHeader from "../components/RoomHeader";
import ErrorInfo from "../components/ErrorInfo";
import RoomSkeleton from "../pages/Chat/RoomSkeleton";

const RoomLayout = () => {
    const [error, setError] = useState("");
    const [rooms, setRooms] = useState<any[]>();
    const [isLoading, setIsLoading] = useState(true);
    const fetchOptions: RequestInit = {
        headers: { "Content-Type": "application/json" },
        method: "GET",
        mode: 'cors',
        credentials: 'include'
    }
    useEffect(() => {
        async function fetchRooms() {

            try {
                const res = await fetch(`${API_SERVER}/user/rooms`, fetchOptions);
                const data = await res.json();

                if (data["errMssg"]) {
                    setError(data["errMssg"]);
                }
                if (!data["errMssg"] && data.rooms.length === 0) setRooms(["No rooms yet :("]);
                else setRooms(data.rooms);

            } catch (err) {
                console.error(err);
                setError((err as Error).message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchRooms();

    }, []);

    return (

        <>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full">
                <aside className="hidden md:block border-r border-black p-4 h-screen overflow-y-auto">
                    <Link to="/" className="text-3xl">Shaed</Link>
                    <hr />
                    {isLoading && <RoomSkeleton/>}
                    {error && <ErrorInfo error={error} />}
                    {(rooms && rooms.length > 0) && rooms.map((room: any) => (
                        <div key={room._id!}>
                            <Link to={`/rooms/${room._id!}/chat`}>{room.name}</Link>
                        </div>
                    ))}
                    {(rooms && rooms.length === 0 && <div> No rooms yet :( </div>)}
                </aside>
                <main className="flex flex-col justify-between p-4 border h-screen overflow-y-auto">
                    <div className="sticky top-0 z-[9999]  border border-red-500">
                    <RoomHeader />
                    </div>
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export default RoomLayout;
