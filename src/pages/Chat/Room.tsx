// import { useNavigate, useParams } from "react-router-dom";
// import { API_SERVER } from "../../utils/env_alias";
// import { genFetchOpts } from "../../utils/fetch_options";
// import { useState, useEffect, FormEvent, useRef } from "react";
// import ErrorInfo from "../../components/ErrorInfo";
// import MyChat from "./MyChat";
// import OtherChat from "./OtherChat";
// import MessageForm from "../../components/SendMssg";
// import RoomHeader from "../../components/RoomHeader";
// import { getSocket, initSocket } from "../../utils/socket";

// interface ISender {
//     username: string;
// }
// interface IMessageStructure {
//     _id: string;
//     sender?: ISender;
//     text: string;
//     createdAt: Date;
//     updatedAt: Date;
// }
// const ChatRoom = () => {
//     const { roomID } = useParams();
//     const messagesRef = useRef<HTMLDivElement>(null);
//     const [mssg, setMssg] = useState("");
//     const [messages, setMessages] = useState<IMessageStructure[]>();
//     const [currentUser, setCurrentUser] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//     const [err, setErr] = useState("");
//     const navigate = useNavigate();

//     async function fetchMessages() {
//         setIsLoading(true);
//         try {
//             const res = await fetch(`${API_SERVER}/rooms/${roomID}/messages`, genFetchOpts('GET'));
//             if(res.status === 401) return navigate(`/rooms/${roomID}/join`);
//             const data = await res.json();
//             if(data?.['errMssg']) {
//                  throw new Error(data?.['errMssg']);
//             }
//             setCurrentUser(data?.['currentUser']);
//             setMessages(data?.['messages']);
//             messagesRef.current && messagesRef.current.lastElementChild?.scrollIntoView({behavior: 'smooth'});

//         } catch (error) {
//             console.error(error);
//             setErr((error as Error).message);
//         } finally {
//             setIsLoading(false);
//         }
//     }

//     async function sendMessage(e: FormEvent) {
//         e.preventDefault();
//         if(!mssg.trim()) return; // Doesn't send empty messages
//         try {
//             const res = await fetch(`${API_SERVER}/rooms/${roomID}/send`, genFetchOpts('POST', JSON.stringify({content: mssg})));
//             const data = await res.json();
//             if (data?.['errMssg']) throw new Error(data?.['errMssg']);
//             const socket = getSocket();
//             socket.emit('sendMessage', { roomID });
//             setMssg('');
//             await fetchMessages();
//             console.log(data)
//         } catch (error) {
//             console.error(error);
//             setErr((error as Error).message)
//         } 

//     }

//     useEffect(() => {
//         const socket = initSocket();

//         socket.on('connect', () => {
//             console.log('Connected to chat server');
//             socket.emit('joinRoom', roomID);
//         });

//         socket.on('message', () => {
//             fetchMessages();
//         })
//         // fetchMessages();

//         return () => {
//             socket.off('connect');
//             socket.off('message');
//             socket.disconnect();
//           };
//     }, [roomID])

//     return (
//         <>
//             <div className="flex flex-col h-screen bg-base-200">
//             <RoomHeader />
//             <div>
//             {isLoading && <div> Loading... </div>}
//             {err && <ErrorInfo error={err} />}
//             {messages && <div className="mb-[5rem]" ref={messagesRef}>
//                 <div className="flex-grow overflow-y-auto p-4 space-y-4">
//                 {messages.map((mssg: IMessageStructure, index: number) => (
//                     (mssg.sender?.username || "") === currentUser ?
//                         <MyChat text={mssg.text} key={index.toString()} username={mssg.sender?.username || "[non]"} createdAt={mssg.createdAt} /> : 
//                         <OtherChat text={mssg.text} key={index.toString()} username={mssg.sender?.username || "[non]"} createdAt={mssg.createdAt} />
//                 ))}
//                 </div>
//             </div>}
//             </div>
//             </div>
//         <MessageForm mssg={mssg} handleSend={(e: FormEvent) => sendMessage(e)} setMssg={setMssg}/>
//         </>
//     );
// }

// export default ChatRoom;


import { useNavigate, useParams } from "react-router-dom";
import { API_SERVER } from "../../utils/env_alias";
import { genFetchOpts } from "../../utils/fetch_options";
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
    const messagesRef = useRef<HTMLDivElement>(null);
    const [mssg, setMssg] = useState("");
    const [messages, setMessages] = useState<IMessageStructure[]>([]);
    const [currentUser, setCurrentUser] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    const fetchMessages = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_SERVER}/rooms/${roomID}/messages`, genFetchOpts('GET'));
            if (res.status === 401) return navigate(`/rooms/${roomID}/join`);
            const data = await res.json();
            if (data?.['errMssg']) {
                throw new Error(data?.['errMssg']);
            }
            setCurrentUser(data?.['currentUser']);
            setMessages(data?.['messages']);
            messagesRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
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
            const res = await fetch(`${API_SERVER}/rooms/${roomID}/send`, genFetchOpts('POST', JSON.stringify({ content: mssg })));
            const data = await res.json();
            if (data?.['errMssg']) throw new Error(data?.['errMssg']);
            
            // Emit the sendMessage event to notify other clients
            const socket = getSocket();
            socket.emit('sendMessage', { roomID });
            
            setMssg('');
            // No need to call fetchMessages here, it will be triggered by the 'message' event
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

        // Fetch messages initially
        fetchMessages();

        return () => {
            socket.off('connect');
            socket.off('message');
            socket.disconnect();
        };
    }, [roomID, fetchMessages]);

    return (
        <>
            <div className="flex flex-col h-screen bg-base-200">
                <RoomHeader />
                <div>
                    {isLoading && <div> Loading... </div>}
                    {err && <ErrorInfo error={err} />}
                    {messages && (
                        <div className="mb-[5rem]" ref={messagesRef}>
                            <div className="flex-grow overflow-y-auto p-4 space-y-4">
                                {messages.map((mssg: IMessageStructure, index: number) => (
                                    (mssg.sender?.username || "") === currentUser ?
                                        <MyChat text={mssg.text} key={index.toString()} username={mssg.sender?.username || "[non]"} createdAt={mssg.createdAt} /> :
                                        <OtherChat text={mssg.text} key={index.toString()} username={mssg.sender?.username || "[non]"} createdAt={mssg.createdAt} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <MessageForm mssg={mssg} handleSend={sendMessage} setMssg={setMssg} />
        </>
    );
}

export default ChatRoom;