import { useNavigate, useParams } from "react-router-dom";
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
    const [messages, setMessages] = useState<IMessageStructure[]>();
    const [currentUser, setCurrentUser] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    async function fetchMessages() {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_SERVER}/rooms/${roomID}/messages`, genFetchOpts('GET'));
            if(res.status === 401) return navigate(`/rooms/${roomID}/join`);
            const data = await res.json();
            if(data?.['errMssg']) {
                 throw new Error(data?.['errMssg']);
            }
            setCurrentUser(data?.['currentUser']);
            setMessages(data?.['messages']);
            messagesRef.current && messagesRef.current.lastElementChild?.scrollIntoView({behavior: 'smooth'});

        } catch (error) {
            console.error(error);
            setErr((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    }

    async function sendMessage(e: FormEvent) {
        e.preventDefault();
        if(!mssg.trim()) return; // Doesn't send empty messages
        try {
            const res = await fetch(`${API_SERVER}/rooms/${roomID}/send`, genFetchOpts('POST', JSON.stringify({content: mssg})));
            const data = await res.json();
            if (data?.['errMssg']) throw new Error(data?.['errMssg']);
            setMssg('');
            await fetchMessages();
            console.log(data)
        } catch (error) {
            console.error(error);
            setErr((error as Error).message)
        } 

    }

    useEffect(() => {
        fetchMessages();
    }, [])

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
                <MessageForm mssg={mssg} handleSend={(e: FormEvent) => sendMessage(e)} setMssg={setMssg}/>
            </div>}
        </div>
    );
}

export default ChatRoom;
