import { useEffect, useState } from 'react';
import './App.css'
import Room from './pages/Room';
import { Socket, io } from "socket.io-client";
const App = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    const socket = io('http://localhost:4000/', { withCredentials: true });
    setSocket(socket);
  }, []);
  return (
    <>
      {socket && <Room socket={socket} />}
    </>
  )
}

export default App;
