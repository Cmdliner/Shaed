import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";

const RoomHeader = () => {
  const roomName = localStorage.getItem('room_name');
  return (
    <>
      <div className="navbar bg-base-100 justify-between">
        <div className="flex flex-col">
          <Link to="/" className="btn btn-ghost text-xl">{roomName}</Link>
          {/* <p>Created by <span>{hostName}</span></p> */}
        </div>
        <div className="flex-none dropdown dropdown-end">
          <button className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
          </button>
          <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
            <li><a>Room Info </a></li>
            <li><a>Leave room </a></li>
            <li><a><BiLogOut /> Logout</a></li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default RoomHeader;
