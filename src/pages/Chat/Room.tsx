import { useParams } from "react-router-dom";
import useFetchOnAction from "../../utils/useFetchOnAction";
import { API_SERVER } from "../../utils/env_alias";
import { genFetchOpts } from "../../utils/fetch_options";
import { useState, useEffect } from "react";
import ErrorInfo from "../../components/ErrorInfo";
import MyChat from "./MyChat";
import OtherChat from "./OtherChat";
import { BiSend } from "react-icons/bi";

interface ISender {
    username: string;
}
interface IMessageStructure {
    _id: string;
    sender?: ISender;
    text: string;
    createdAt: Date;
    updatedAt: Date;
}
const ChatRoom = () => {
    const { roomID } = useParams();

    const [messages, setMessages] = useState<IMessageStructure[]>();
    const [mssg, setMssg] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    const [err, setErr] = useState<string>("");
    const [fetchRoomInfo, { isLoading, error }, _] = useFetchOnAction(`${API_SERVER}/rooms/${roomID}/messages`, {
        ...(genFetchOpts("GET")),
        onSuccess: (data: { messages: Array<IMessageStructure>, currentUser: string }) => {
            setMessages(data.messages);
            console.log(data.messages);
            setCurrentUser(data.currentUser);
        },
        onError: (er) => {
            setErr(er.message);
        },
    });
    if (error) setErr(error.message);
    useEffect(() => { fetchRoomInfo() }, []);
    return (

        <div>
            {isLoading && <div> Loading... </div>}
            {err && <ErrorInfo error={err} />}
            {messages && <div>
                {messages.map((mssg: IMessageStructure, index: number) => (
                    (mssg.sender?.username || "") === currentUser ?
                        <MyChat text={mssg.text} key={index.toString()} username={mssg.sender?.username || "non"} createdAt={mssg.createdAt} /> :
                        <OtherChat text={mssg.text} key={index.toString()} username={mssg.sender?.username || "non"} createdAt={mssg.createdAt} />
                ))}
                <form className="flex flex-col md:max-w-[70%] m-auto" onSubmit={(e) => console.log(e)}>
                    <div className="mb-[2rem]">
                        <label className=" relative bottom-0 right-0 input input-bordered flex gap-2">
                            <input type="text" className="grow" placeholder="Message..." onChange={(e) => setMssg(e.target.value)} />
                            <button><BiSend /></button>
                        </label>
                    </div>
                </form>
            </div>}
        </div>
    );
}

export default ChatRoom;
