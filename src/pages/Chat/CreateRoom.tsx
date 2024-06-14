import { FormEvent, useState } from "react";
import { genFetchOpts } from "../../utils/fetch_options";

const CreateRoom = () => {
    const [roomName, setRoomName] = useState("");
    const _roomFetchOpts = genFetchOpts("POST", JSON.stringify({ name: roomName }))

    function handleCreateRoom(e: FormEvent) {
        e.preventDefault();
    }

    return (
        <div className="pt-[8rem] min-h-screen">
            <form onSubmit={(e) => handleCreateRoom(e)}>
                <h1 className="text-3xl font-bold text-center mb-[4rem]">Sign-In</h1>
                <div className="mb-[2rem]">
                    <label className="input input-bordered flex items-center gap-2 mb-5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                        <input type="text" className="grow" placeholder="username" onChange={(e) => setRoomName(e.target.value)} />
                    </label>
                </div>
                <button className="btn btn-wide btn-neutral flex self-center">Sign In</button>
            </form>
        </div>
    )
}

export default CreateRoom;