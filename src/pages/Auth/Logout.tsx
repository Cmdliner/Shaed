import { FormEvent, useRef, useState } from "react";
import { FcCancel } from "react-icons/fc";
import useFetch from "../../utils/useFetch";
import { AUTH_SERVER } from "../../utils/env_alias";
import { genFetchOpts } from "../../utils/fetch_options";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const [shouldFetch, setShouldFetch] = useState(false);
    const navigate = useNavigate();
    const [data, _loading, _err] = useFetch(`${AUTH_SERVER}/register/logout`, genFetchOpts('POST', ''), shouldFetch);
    function handleLogout(e: FormEvent) {
        e.preventDefault();
        setShouldFetch(true);
        if(!data?.['errMssg'] && data?.['mssg']){console.log(data?.["mssg"]); navigate("/")};
    }
    const myModalRef = useRef<HTMLDialogElement>(null);
    return (
        <div className="pt-[8rem] min-h-screen">
            <h1 className="text-bold text-3xl items-center text-center">Logout</h1>
            <button className="btn block m-auto my-16" onClick={() => myModalRef && myModalRef.current?.showModal()}>Logout</button>
            <dialog id="my_modal_4" ref={myModalRef} className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Are you sure you want to Logout?</h3>
                    <p className="py-4">Click the button below to close</p>
                    <div className="modal-action">
                        <form method="dialog" className="flex justify-between w-[100%] mx-[30%]">
                            {/* if there is a button, it will close the modal */}
                            <input type="button" value="Logout" className="btn" onClick={(e) => handleLogout(e)} />
                            <button className="btn">Cancel <FcCancel /></button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default Logout;
