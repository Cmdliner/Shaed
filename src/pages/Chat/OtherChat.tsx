import { FC } from "react";
import { IChatProps } from "../../interfaces/ChatProps";
import { RxAvatar } from "react-icons/rx";

const OtherChat: FC<IChatProps> = ({text, username, createdAt}) => {

    return (
        <>
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-full rounded-full">
                    <RxAvatar />
                    </div>
                </div>
                <div className="chat-header">
                    <time className="text-xs opacity-50">{new Date(createdAt).toLocaleTimeString()}</time>
                </div>
                <div className="chat-bubble">{text}</div>
                <p className="text-[0.75rem]">{username}</p>

            </div>
        </>
    );
}

export default OtherChat;