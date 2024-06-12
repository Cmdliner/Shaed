import { useRef } from "react";

const Logout = () => {
    const myModalRef = useRef(null);
    return (
        <>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn" onClick={() => myModalRef.current?.showModal()}>open modal</button>
            <dialog id="my_modal_4" ref={myModalRef} className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Click the button below to close</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}

export default Logout;