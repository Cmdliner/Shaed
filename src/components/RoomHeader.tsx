import { FormEvent } from "react";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaEllipsisV } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { API_SERVER } from "../utils/env_alias";
import RoomHeaderSkeleton from "./RoomHeaderSkeleton";
const RoomHeader = () => {
  const { roomID } = useParams();
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [roomCount, setRoomCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  let fetchHeaders: HeadersInit = { "Content-Type": "application/json" };
  if(localStorage.getItem('Authorization')) {
      fetchHeaders = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('Authorization')}`
      }
  }
  async function roomInfo() {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${API_SERVER}/rooms/${roomID}/info`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: fetchHeaders,
        });
      const roomInfo = await res.json();
      if (roomInfo?.["errMssg"]) throw new Error(roomInfo?.["errMssg"]);
      setRoomName(roomInfo?.["name"]);
      setRoomCount(roomInfo?.participants.length);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function leaveRoom(e: FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch(`${API_SERVER}/rooms/${roomID}/leave`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: fetchHeaders
      });
      const data = await res.json();
      if (data?.["errMssg"]) alert(data?.["errMssg"]);
      else {
        navigate("/rooms");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    roomInfo();
  }, [roomID]);

  return (
    <>
      {isLoading ? (
       <RoomHeaderSkeleton />
      ) : (
        <div className="navbar bg-base-300 sticky top-0 z-10 shadow-md">
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
                <div className="w-10 rounded-full  border py-[20%] text-center font-extrabold uppercase">{roomName[0]}</div>
              </div>
              <div>
                <h2 className="text-lg font-semibold">
                  {roomName}
                </h2>
                <p className="text-sm text-base-content/70"> {roomCount} participant(s)</p>
              </div>
            </div>
          </div>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <FaEllipsisV className="text-xl" />
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Room Info</a>
                </li>
                <li>
                  <a>Search</a>
                </li>
                <li>
                  <a>Mute Notifications</a>
                </li>
                <li>
                  <a className="text-error" onClick={(e) => leaveRoom(e)}>
                    Leave Room
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomHeader;
