import { FormEvent, useEffect, useRef, useState } from "react";
import { FcCancel } from "react-icons/fc";
import { useNavigate, useParams } from "react-router-dom";
import { API_SERVER } from "../../utils/env_alias";
import { genFetchOpts } from "../../utils/fetch_options";

const JoinRoom = () => {
    const {roomID} = useParams();
    const navigate = useNavigate();
    const [roomName, setRoomName] = useState('');
    const [host, setHost] = useState('');
    const myModalRef = useRef<HTMLDialogElement>(null);
    async function getRoomInfo() {
        try {
            const res = await fetch(`${API_SERVER}/rooms/${roomID}/info`, genFetchOpts('GET'));
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
            const res = await fetch(`${API_SERVER}/rooms/${roomID}/join`, genFetchOpts('POST'));
            const data = await res.json();
            if(data?.['errMssg']) throw new Error(data?.['errMssg']);
            alert(data?.['mssg']);
            navigate(`/rooms/${roomID}/chat`);
            

        } catch (error) {
            alert((error as Error).message)
        }
    }
    return ( 
        <div className="pt-[8rem] min-h-screen">
            <h1 className="text-bold text-3xl items-center text-center">Join Room</h1>
            <button className="btn block m-auto my-16" onClick={() => myModalRef && myModalRef.current?.showModal()}>Logout</button>
            <dialog id="my_modal_4" ref={myModalRef} className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">You are about to join room {roomName} created by <span className="italics">{host}</span></h3>
                    <p className="py-4">Click the button below to close</p>
                    <div className="modal-action">
                        <form method="dialog" className="flex justify-between w-[100%] mx-[30%]">
                            {/* if there is a button, it will close the modal */}
                            <input type="button" value="Logout" className="btn" onClick={(e) => handleJoinRoom(e)} />
                            <button className="btn">Cancel <FcCancel /></button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
     );
}
 
export default JoinRoom;