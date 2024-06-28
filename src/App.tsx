import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Register from "./pages/Auth/Register";
import SignIn from "./pages/Auth/SignIn";
import Rooms from "./pages/Chat/Rooms";
import ProtectedRoute from "./pages/Auth/Protected";
import RoomLayout from "./Layout/RoomLayout";
import LeaveRoom from "./pages/Chat/LeaveRoom";
import ChatRoom from "./pages/Chat/Room";
import JoinRoom from "./pages/Chat/JoinRoom";
import CreateRoom from "./pages/Chat/CreateRoom";

const App = () => {

    return (
        <Router>
            <Routes>

                {/* Room routes */}
                <Route path="/rooms" element={<RoomLayout />} >
                    <Route path="/rooms/:roomID/chat" element={<ProtectedRoute children={<ChatRoom />} />} />
                    <Route path="/rooms/:roomID/join" element={<ProtectedRoute children={<JoinRoom />} />} />
                    <Route path="/rooms/:roomID/leave" element={<ProtectedRoute children={<LeaveRoom />} />} />
                    <Route path="/rooms/*" element={<ErrorPage />} />
                </Route>
                

                {/* Default routes */}
                <Route path="/" element={<RootLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/rooms/" element={<ProtectedRoute children={<Rooms />} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/create-room" element={<ProtectedRoute children={<CreateRoom />} />} />
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<ErrorPage />} />
                </Route>


            </Routes>
        </Router>
    );
}

export default App;
