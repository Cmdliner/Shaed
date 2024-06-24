import { FormEvent } from "react";
import { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_SERVER, AUTH_SERVER } from "../utils/env_alias";
import { genFetchOpts } from "../utils/fetch_options";

const RoomHeader = () => {
  const { roomID } = useParams();
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [hostName, setHostName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function logout(e: FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch(`${AUTH_SERVER}/logout`, genFetchOpts("POST"));
      const data = await res.json();
      if (data?.["errMssg"]) console.error(data?.["errMssg"]);
      else {
        console.log(data?.["mssg"]);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function roomInfo() {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${API_SERVER}/rooms/${roomID}/info`,
        genFetchOpts("GET")
      );
      const roomInfo = await res.json();
      if (roomInfo?.["errMssg"]) throw new Error(roomInfo?.["errMssg"]);
      setRoomName(roomInfo?.["name"]);
      setHostName(roomInfo?.["host"]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function leaveRoom(e: FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch(
        `${API_SERVER}/rooms/${roomID}/leave`,
        genFetchOpts("POST")
      );
      const data = await res.json();
      if (data?.["errMssg"]) alert(data?.["errMssg"]);
      else {
        console.log(data?.["mssg"]);
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
      <div className="navbar bg-base-100 justify-between">
        {isLoading ? (
          <p>Loading..</p>
        ) : (
          <>
            <div className="flex flex-col">
              <div className="text-xl text-bold">{roomName}</div>
              <p>
                Created by <span>{hostName}</span>
              </p>
            </div>
            <div className="flex-none dropdown dropdown-end">
              <button className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-5 h-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  ></path>
                </svg>
              </button>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
              >
                <li>
                  <a>Room Info </a>
                </li>
                <li>
                  <div onClick={(e) => leaveRoom(e)}>Leave room </div>
                </li>
                <li>
                  <a onClick={(e) => logout(e)}>
                    <BiLogOut /> Logout
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RoomHeader;
