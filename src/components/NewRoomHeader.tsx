import React from 'react';
import { FaArrowLeft, FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RoomHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar bg-base-300 sticky top-0 z-10 shadow-md">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost" onClick={() => navigate(-1)}>
          <FaArrowLeft className="text-xl" />
        </button>
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Room avatar" />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Room Name</h2>
            <p className="text-sm text-base-content/70">3 participants</p>
          </div>
        </div>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <FaEllipsisV className="text-xl" />
          </label>
          <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            <li><a>Room Info</a></li>
            <li><a>Search</a></li>
            <li><a>Mute Notifications</a></li>
            <li><a className="text-error">Leave Room</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RoomHeader;
