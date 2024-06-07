import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRoom = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const URI = `${import.meta.env.VITE_API_SERVER_URI}/rooms/create`;
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(URI, {
                headers: { "Content-Type": "application/json" },
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify({ name })
            });
            const data = await res.json();
            if(data["errMsssg"]) setError(data["errMssg"]);
            else navigate("/rooms");
        } catch (err: any) {
            console.error((err as Error).message);
            setError((err as Error).message);
        }
    }
    return (
        <>
            <div>
                {error && <h3>{error} </h3> }
            </div>
            <form onSubmit={(e) => handleSubmit(e)}
                className="max-w-[600px] m-auto p-4 border border-teal">
                <h3 className="text-3xl">Create Room</h3>
                <input type="text" value={name}
                    className="block text-black"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Room Name" />
                <button className="bg-white text-black p-2 mt-[4em] rounded-[1.2em]">Create room</button>
            </form>
        </>
    );
}

export default CreateRoom;