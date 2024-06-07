import { socket } from "./utils/socket";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Auth from "./pages/Auth/Auth";
import Rooms from "./pages/Chat/Rooms";
import ChatRoom from "./pages/Chat/Room";
import CreateRoom from "./pages/Chat/CreateRoom";
import LeaveRoom from "./pages/Chat/LeaveRoom";
import JoinRoom from "./pages/Chat/JoinRoom";
import Logout from "./pages/Auth/Logout";

const App = () => {
  const [_isConnected, setIsConnected] = useState(socket.connected);
  
  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }
    function onDisconnect() {
      setIsConnected(false)
    }
  
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return() => {
      socket.off('coonect', onConnect);
      socket.off('disconnect', onDisconnect);
    }
  }, [])
  return (
    <div className="bg-black text-white w-full h-full absolute">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Auth signup={true} login={false}/>} />
          <Route path="/login" element={<Auth login={true} signup={false}/>} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/create-room" element={<CreateRoom />} />
          <Route path="/rooms" element={<Rooms/>}/>
          <Route path="/:roomID/chat" element={<ChatRoom />} />
          <Route path="/:roomID/join" element={<JoinRoom />} />
          <Route path="/:roomID/leave" element={<LeaveRoom />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;