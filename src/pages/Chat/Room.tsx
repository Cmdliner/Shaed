import { useNavigate, useParams } from "react-router-dom";
import { API_SERVER } from "../../utils/env_alias";
import { useState, useEffect, FormEvent, useRef, useCallback } from "react";
import ErrorInfo from "../../components/ErrorInfo";
import MyChat from "./MyChat";
import OtherChat from "./OtherChat";
import MessageForm from "../../components/SendMssg";
import RoomHeader from "../../components/RoomHeader";
import { getSocket, initSocket } from "../../utils/socket";

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
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [mssg, setMssg] = useState("");
    const [messages, setMessages] = useState<IMessageStructure[]>([]);
    const [currentUser, setCurrentUser] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");
    const navigate = useNavigate();
    let authHeader: object | null = null;
    let fetchHeaders: HeadersInit = { "Content-Type": "application/json" };
    if(localStorage.getItem('Authorization')) {
        fetchHeaders = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('Authorization')}`
        }
    }
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [roomID, messages])
        

    const fetchMessages = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_SERVER}/rooms/${roomID}/messages`, {
                method: 'GET',
                headers: fetchHeaders,
                mode: 'cors',
                credentials: 'include',
            });
            if (res.status === 401) return navigate(`/rooms/${roomID}/join`);
            const data = await res.json();
            if (data?.['errMssg']) {
                throw new Error(data?.['errMssg']);
            }
            setCurrentUser(data?.['currentUser']);
            setMessages(data?.['messages']);
        } catch (error) {
            console.error(error);
            setErr((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    }, [roomID, navigate]);

    const sendMessage = async (e: FormEvent) => {
        e.preventDefault();
        if (!mssg.trim()) return; // Doesn't send empty messages
        try {
            const res = await fetch(`${API_SERVER}/rooms/${roomID}/send`, {
                method: 'POST',
                headers: fetchHeaders,
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify({ content: mssg })
            });
            const data = await res.json();
            if (data?.['errMssg']) throw new Error(data?.['errMssg']);
            
            // Emit the sendMessage event to notify other clients
            const socket = getSocket();
            socket.emit('sendMessage', { roomID });
            
            setMssg('');
        } catch (error) {
            console.error(error);
            setErr((error as Error).message);
        }
    };

    useEffect(() => {
        const socket = initSocket();

        socket.on('connect', () => {
            console.log('Connected to chat server');
            socket.emit('joinRoom', roomID);
        });

        socket.on('message', () => {
            fetchMessages();
        });

        fetchMessages();

        return () => {
            socket.off('connect');
            socket.off('message');
            socket.disconnect();
        };
    }, [roomID, fetchMessages]);

    return (
        <div className="flex flex-col h-screen bg-base-200">
            <RoomHeader />
            <div className="flex-1 overflow-hidden">
                {isLoading && <div className="text-center py-4">Loading...</div>}
                {err && <ErrorInfo error={err} />}
                <div className="h-full overflow-y-auto p-4 space-y-4 pb-[8rem]">
                    {messages.map((mssg: IMessageStructure) => (
                        (mssg.sender?.username || "") === currentUser ?
                            <MyChat text={mssg.text} key={mssg._id} username={mssg.sender?.username || "[non]"} createdAt={mssg.createdAt} /> :
                            <OtherChat text={mssg.text} key={mssg._id} username={mssg.sender?.username || "[non]"} createdAt={mssg.createdAt} />
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <MessageForm mssg={mssg} handleSend={sendMessage} setMssg={setMssg} />
        </div>
    );
}

export default ChatRoom;
