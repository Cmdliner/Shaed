import { FaArrowLeft, FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RoomHeaderSkeleton = ()  => {
    const navigate = useNavigate();
    return (
        <div className="navbar bg-base-300 sticky top-0 z-10 shadow-md skeleton">
        <div className="flex-none">
    <button
      className="btn btn-square btn-ghost"
      onClick={() => navigate('/rooms')}
    >
      <FaArrowLeft className="text-xl" />
    </button>
  </div>
  <div className="flex-1">
    <div className="flex items-center space-x-3">
      <div className="avatar">
        <div className="w-10 rounded-full  border py-[20%] text-center font-extrabold uppercase">A</div>
      </div>
      <div>
        <h2 className="text-lg font-semibold">
          Room Name
        </h2>
        <p className="text-sm text-base-content/70"> 0 participant(s)</p>
      </div>
    </div>
  </div>
  <div className="flex-none">
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <FaEllipsisV className="text-xl" />
      </label>
  
    </div>
  </div>
        </div>
    );
}

export default RoomHeaderSkeleton;