import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { API_SERVER } from "../../utils/env_alias";
import ErrorInfo from "../../components/ErrorInfo";
import { FaUser, FaDoorOpen } from "react-icons/fa";
import { motion } from "framer-motion";

interface Room {
  _id: string;
  name: string;
  host: {
    username: string;
  };
  participants: number;
}

const Rooms = () => {
  const [error, setError] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  let fetchHeaders: HeadersInit = { "Content-Type": "application/json" };
  if(localStorage.getItem('Authorization')) {
      fetchHeaders = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('Authorization')}`
      }
  }
  const fetchRooms = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_SERVER}/user/rooms`, {
        method: 'GET',
        headers: fetchHeaders,
        mode: 'cors',
        credentials: 'include'
      });
      const data = await res.json();
      if (data["errMssg"]) throw new Error(data["errMssg"]);
      setRooms(data?.rooms);
    } catch (error) {
      console.error(error);
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8 sm:pt-[9rem] md:pt-[8rem]">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Rooms</h1>

      {error && <ErrorInfo error={error} />}
      
      {isLoading ? (
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : rooms.length === 0 ? (
        <div className="flex flex-col">
          <div className="text-center text-lg">No rooms found. Create one to get started!</div>
          <Link to="/create-room" className='mt-8 btn btn-primary self-center'>Create Room</Link>
        </div>
      ) : (
        <motion.ul 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {rooms.map((room) => (
            <motion.li
              key={room._id}
              variants={itemVariants}
              className="bg-base-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Link
                to={`/rooms/${room._id}/chat`}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center space-x-4">
                  <FaDoorOpen className="text-2xl text-primary" />
                  <div>
                    <h2 className="text-lg font-semibold">{room.name}</h2>
                    <p className="text-sm text-base-content/70 flex items-center">
                      <FaUser className="mr-2" /> {room.host?.username}
                    </p>
                  </div>
                </div>
              
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default Rooms;
