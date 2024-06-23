import { FC, FormEvent } from "react";
import { BiSend } from "react-icons/bi";

interface IMessageFormProps {
    handleSend: (e: FormEvent) => void;
    setMssg: React.Dispatch<React.SetStateAction<string>>;
    mssg: string;
}
const MessageForm: FC<IMessageFormProps> = ({ mssg, handleSend, setMssg }) => {

    return (
        <>
            <form className="flex flex-col m-auto" id="write" onSubmit={(e) => handleSend(e)}>
                <div className="mb-[2rem] fixed bottom-0 min-w-[30%] self-center z-[9999] flex">
                    <label className="w-full input input-bordered flex gap-2">
                        <input type="text" className="grow" placeholder="Message..." value={mssg} onChange={(e) => setMssg(e.target.value)} />
                        <button><BiSend /></button>
                    </label>
                </div>
            </form>
        </>
    );
}

export default MessageForm;