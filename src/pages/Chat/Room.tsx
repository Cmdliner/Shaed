import { useParams } from "react-router-dom";

const ChatRoom = () => {
    const { roomID } = useParams();
    return (
        <div>
            <h1>Recahed room with ID {roomID}</h1>
        </div>
    );
}

export default ChatRoom;