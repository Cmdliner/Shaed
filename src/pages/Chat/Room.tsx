import { useParams } from "react-router-dom";
import useFetchOnAction from "../../utils/useFetchOnAction";
import { API_SERVER } from "../../utils/env_alias";
import { genFetchOpts } from "../../utils/fetch_options";
import { useState, useEffect, FormEvent, useRef } from "react";
import ErrorInfo from "../../components/ErrorInfo";
import MyChat from "./MyChat";
import OtherChat from "./OtherChat";
import MessageForm from "../../components/SendMssg";

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
    const messagesRef = useRef<HTMLDivElement>(null);
    const [mssg, setMssg] = useState("");
    const [canSend, setCanSend] = useState("");
    useEffect(() => {
        async function runSend() {
            try {
                const res = await fetch(`${API_SERVER}/rooms/${roomID}/send`, genFetchOpts("POST", JSON.stringify({ content: mssg })));
                const data = await res.json();
                if (data["errMssg"]) throw new Error(data["errMssg"]);

            } catch (error) {
                console.error(error);
                setErr((error as Error).message);
            }
        }
        if (canSend) runSend();
    }, [canSend]);

    function handleSend(e: FormEvent) {
        e.preventDefault();
        canSend === 'a' ? setCanSend('b') : setCanSend("a");
    }

    const [messages, setMessages] = useState<IMessageStructure[]>();
    const [currentUser, setCurrentUser] = useState("");
    const [err, setErr] = useState<string>("");
    const [fetchRoomInfo, { isLoading, error }, reset] = useFetchOnAction(`${API_SERVER}/rooms/${roomID}/messages`, {
        ...(genFetchOpts("GET")),
        onSuccess: (data: { messages: Array<IMessageStructure>, currentUser: string }) => {
            setMessages(data.messages);
            setCurrentUser(data.currentUser);
            messagesRef.current && messagesRef.current.lastElementChild?.scrollIntoView({behavior: 'smooth'});
            reset();
        },
        onError: (er) => {
            setErr(er.message);
        },
    });
    if (error) setErr(error.message);
    useEffect(() => { 
        fetchRoomInfo();
        messagesRef.current && messagesRef.current.lastElementChild?.scrollIntoView({behavior: 'smooth'});
        console.log(`This is it -> ${messagesRef.current?.lastElementChild}`);
    }, [canSend]);

    return (

        <div>
            {isLoading && <div> Loading... </div>}
            {err && <ErrorInfo error={err} />}
            {messages && <div className="mb-20" ref={messagesRef}>
                {messages.map((mssg: IMessageStructure, index: number) => (
                    (mssg.sender?.username || "") === currentUser ?
                        <MyChat text={mssg.text} key={index.toString()} username={mssg.sender?.username || "[non]"} createdAt={mssg.createdAt} /> :
                        <OtherChat text={mssg.text} key={index.toString()} username={mssg.sender?.username || "[non]"} createdAt={mssg.createdAt} />
                ))}
                <MessageForm handleSend={(e: FormEvent) => handleSend(e)} setMssg={setMssg}/>
            </div>}
        </div>
    );
}

export default ChatRoom;
