import { FC } from "react";
import { IChatProps } from "../../interfaces/ChatProps";


const OtherChat: FC<IChatProps> = ({text, username, createdAt}) => {

    return (
        <>
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="User avatar" />
                    </div>
                </div>
                <div className="chat-header">
                    <time className="text-xs opacity-50">{new Date(createdAt).toLocaleTimeString()}</time>
                </div>
                <div className="chat-bubble chat-bubble-primary">{text}</div>
                <p className="text-[0.75rem]">{username}</p>

            </div>

        </>
    );
}

export default OtherChat;