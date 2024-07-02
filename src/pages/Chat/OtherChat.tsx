import { FC } from "react";
import { IChatProps } from "../../interfaces/ChatProps";
import my_pic from "../../assets/login_display.jpg"

const OtherChat: FC<IChatProps> = ({text, username, createdAt}) => {
    return (
        <div className="chat chat-start">
            <div className="chat-image avatar">
                <div className="w-8 h-8 rounded-full">
                    <img src={my_pic} alt="User avatar" />
                </div>
            </div>
            <div className="chat-header mb-1">
                {username}
                <time className="text-xs opacity-50 ml-1">{new Date(createdAt).toLocaleTimeString()}</time>
            </div>
            <div className="chat-bubble text-sm md:text-[1rem]">{text}</div>
        </div>
    );
}

export default OtherChat;
