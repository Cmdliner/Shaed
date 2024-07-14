import { FC } from "react";
import { IChatProps } from "../../interfaces/ChatProps";
import my_pic from "../../assets/login_display.jpg"
import { FaEllipsisH } from "react-icons/fa";


const MyChat: FC<IChatProps> = ({ username, text, createdAt }) => {
    return (
        <div className="chat chat-end">
            <div className="chat-image avatar">
                <div className="w-8 h-8 rounded-full">
                    <img src={my_pic} alt="User avatar" />
                </div>
            </div>
            <div className="chat-header mb-1">
                {username.length > 5 ? `${username.slice(0, 6)}...` : username}
                <time className="text-xs opacity-50 ml-1">{new Date(createdAt).toLocaleTimeString()}</time>
            </div>
            <div className="chat-bubble chat-bubble-primary text-sm md:text-[1rem]">
                <div className="flex flex-col">
                    <div className="place-self-end"><FaEllipsisH className="text-xs relative text-gray-700"/></div>
                    <div>{text}</div>
                </div>
                </div>
        </div>
    );
}

export default MyChat;
