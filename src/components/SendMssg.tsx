import { FC, FormEvent } from "react";
import { FaPaperPlane, FaSmile, FaPaperclip } from 'react-icons/fa';


interface IMessageFormProps {
    handleSend: (e: FormEvent) => void;
    setMssg: React.Dispatch<React.SetStateAction<string>>;
    mssg: string;
}
const MessageForm: FC<IMessageFormProps> = ({ mssg, handleSend, setMssg }) => {

    return (
        <>
             <div className="p-4 fixed bottom-0 w-full bg-base-300">
                <form className="flex items-center space-x-2" onSubmit={(e) => handleSend(e)}>
                <button type="button" className="btn btn-circle btn-ghost">
                    <FaSmile className="text-xl" />
                </button>
                <input 
                    type="text" 
                    placeholder="Type a message..." 
                    className="input input-bordered flex-grow"
                    value={mssg} onChange={(e) => setMssg(e.target.value)}
                />
                <button type="button" className="btn btn-circle btn-ghost">
                    <FaPaperclip className="text-xl" />
                </button>
                <button type="submit" className="btn btn-circle btn-primary">
                    <FaPaperPlane className="text-xl" />
                </button>
                </form>
      </div>
            
        </>
    );
}

export default MessageForm;
