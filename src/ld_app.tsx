import { socket } from "./utils/socket";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Auth from "./Pages/Auth/Auth";
import Rooms from "./Pages/Chat/Rooms";
import ChatRoom from "./Pages/Chat/Room";
import CreateRoom from "./Pages/Chat/CreateRoom";
import LeaveRoom from "./Pages/Chat/LeaveRoom";
import JoinRoom from "./Pages/Chat/JoinRoom";
import Logout from "./Pages/Auth/Logout";
import Root from "./Layout/RootLayout";

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
   <>
    {false && <div className="bg-black text-white w-full h-full absolute">
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
    </div>}
    {
      true && <div>
        <Router>
          <Routes>
          <Route path="/v2/root" element={<Root />} />
          <Route path="/attributions" element={<Root />} />
          </Routes>
        </Router>
      </div>
    }
   </>
  );
}

export default App;