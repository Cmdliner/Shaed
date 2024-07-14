import { FormEvent, useEffect, useRef, useState } from "react";
import { FcCancel } from "react-icons/fc";
import { useNavigate, useParams } from "react-router-dom";
import { API_SERVER } from "../../utils/env_alias";

const JoinRoom = () => {
    const { roomID } = useParams();
    const navigate = useNavigate();
    const [roomName, setRoomName] = useState('');
    const [host, setHost] = useState('');
    const myModalRef = useRef<HTMLDialogElement>(null);
    let fetchHeaders: HeadersInit = { "Content-Type": "application/json" };
    if(localStorage.getItem('Authorization')) {
        fetchHeaders = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('Authorization')}`
        }
    }
    async function getRoomInfo() {
        try {
            const res = await fetch(`${API_SERVER}/rooms/${roomID}/join_info`, {
                method: 'GET',
                headers: fetchHeaders,
                mode: 'cors',
                credentials: 'include'
            });
            const roomInfo = await res.json();
            if(roomInfo?.['errMssg']) throw new Error(roomInfo?.['errMssg']);
            setRoomName(roomInfo?.['name']);
            setHost(roomInfo?.['host']);
        } catch (error) {
            alert((error as Error).message)
        }
    }
    useEffect(() => {getRoomInfo()}, []);
    async function handleJoinRoom(e: FormEvent) {
        e.preventDefault();
        try {
            const res = await fetch(`${API_SERVER}/rooms/${roomID}/join`, {
                method: 'POST',
                headers: fetchHeaders,
                mode: 'cors',
                credentials: 'include'
            });
            const data = await res.json();
            if(data?.['errMssg']) throw new Error(data?.['errMssg']);
            navigate(`/rooms/${data['room_id']}/chat`);
            

        } catch (error) {
            console.log((error as Error).message)
            if((error as Error).message === "Already a room participant!") navigate(`/rooms`);
            else alert(`*${error}*`);
        }
    }
    return ( 
        <div className="pt-[8rem] min-h-screen">
            <h1 className="text-bold text-3xl items-center text-center">Join Room</h1>
            <button className="btn block m-auto my-16" onClick={() => myModalRef && myModalRef.current?.showModal()}>Join Room</button>
            <dialog id="my_modal_4" ref={myModalRef} className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">You are about to join room {roomName} created by <span className="italics">{host}</span></h3>

                    <div className="modal-action">
                        <form method="dialog" className="flex justify-between w-[100%] mx-[30%]">
                            {/* if there is a button, it will close the modal */}
                            <input type="button" value="Join" className="btn" onClick={(e) => handleJoinRoom(e)} />
                            <button className="btn">Cancel <FcCancel /></button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
     );
}
 
export default JoinRoom;