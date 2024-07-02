import { FormEvent, useState } from "react";
import { BiChat } from "react-icons/bi";
import useFetchOnAction from "../../utils/useFetchOnAction";
import { API_SERVER } from "../../utils/env_alias";
import { useNavigate } from "react-router-dom";
import ErrorInfo from "../../components/ErrorInfo";


const CreateRoom = () => {
    const navigate = useNavigate();
    const [roomName, setRoomName] = useState("");
    const [errorMssg, setErrorMssg] = useState("");
    let fetchHeaders: HeadersInit = { "Content-Type": "application/json" };
    if(localStorage.getItem('Authorization')) {
        fetchHeaders = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('Authorization')}`
        }
    }
    const roomFetchOpts: RequestInit = {
        method: 'POST',
        headers: fetchHeaders,
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({ name: roomName })
    }
    const [createRoom, { error, isLoading }, reset] = useFetchOnAction(`${API_SERVER}/rooms/create`, {
        ...roomFetchOpts,
        onSuccess: (data) => {
            if (!data["errMssg"]) navigate('/rooms');
        },
        onError: (err) => {
            setErrorMssg(err.message);
            console.error(error);
            reset();
        }
    });

    async function handleCreateRoom(e: FormEvent) {
        e.preventDefault();
        await createRoom();
    }

    return (
        <div className="pt-[8rem] px-8 min-h-screen">
            <form className="flex flex-col md:max-w-[70%] m-auto" onSubmit={(e) => handleCreateRoom(e)}>
                <h1 className="text-3xl font-bold text-center mb-[4rem]">New Room</h1>
                {errorMssg && <ErrorInfo error={errorMssg} />}
                <div className="mb-[2rem]">
                    <label className="input input-bordered flex items-center gap-2 mb-5">
                        <BiChat />
                        <input type="text" className="grow" placeholder="Room Name" onChange={(e) => setRoomName(e.target.value)} />
                    </label>
                </div>
                <button className="btn btn-wide btn-neutral flex self-center" disabled={isLoading}>Create</button>
            </form>
        </div>
    )
}

export default CreateRoom;