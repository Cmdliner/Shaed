import { FormEvent, useState } from "react";

const CreateRoom = () => {
    const [name, setName] = useState("");
    // const [mssg, setMssg] = useState<String[]>([""]);
    const URI = "http://localhost:4000/api/v1/rooms/create"
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const res = await fetch(URI,
            {
                headers: { "Content-Type": "application/json" },
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify({name})
            });
        const data = await res.json();
        console.log(data);
        location.assign("/rooms");
    }
    return (
        <>
            <div>

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