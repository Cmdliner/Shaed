import { BiClipboard } from "react-icons/bi";
import { useParams } from "react-router-dom";

const CopyLink = () => {
    const { joinID } = useParams();

    return(
            <div className="min-h-screen pt-[8rem]">
                <div className="text-center text-bold text-3xl">Room link</div>
                <label className="flex justify-between cursor-pointer mt-[2rem] w-[50%] mx-auto">
                    <input type="text" className="w-[70%]" value={`${location.origin}/rooms/${joinID}/join`} />
                    <BiClipboard onClick={() => navigator.clipboard.writeText(`${location.origin}/rooms/${joinID}/join`)}/>
                </label>
            </div>
        )
}

export default CopyLink;
