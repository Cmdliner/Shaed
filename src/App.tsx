import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Register from "./pages/Auth/Register";
import SignIn from "./pages/Auth/SignIn";
import Rooms from "./pages/Chat/Rooms";
import ProtectedRoute from "./pages/Auth/Protected";
import LeaveRoom from "./pages/Chat/LeaveRoom";
import ChatRoom from "./pages/Chat/Room";
import JoinRoom from "./pages/Chat/JoinRoom";
import CreateRoom from "./pages/Chat/CreateRoom";
import AvailableRooms from "./pages/Chat/AvailableRooms";
import Attributions from "./pages/Attributions";
import CopyLink from "./pages/Chat/CopyLink";

const App = () => {

    return (
        <Router>
            <Routes>

                {/* Room route */}
                    <Route path="/rooms/:roomID/chat" element={<ProtectedRoute children={<ChatRoom />} />} />
                   
                {/* Default routes */}
                <Route path="/" element={<RootLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/attributions" element={<Attributions />} />

                    {/* Room routes */}
                    <Route path="/rooms/" element={<ProtectedRoute children={<Rooms />} />} />
                    <Route path="/create-room" element={<ProtectedRoute children={<CreateRoom />} />} />
                    <Route path="/rooms/:roomID/join" element={<ProtectedRoute children={<JoinRoom />} />} />
                    <Route path="/rooms/:roomID/leave" element={<ProtectedRoute children={<LeaveRoom />} />} />
                    <Route path="/available-rooms" element={<ProtectedRoute children={<AvailableRooms />} />} />
                    <Route path="/:joinID/copy-link" element={<ProtectedRoute children={<CopyLink />} />} />
                    {/* Error page */}
                    <Route path="*" element={<ErrorPage />} />
                </Route>

            </Routes>
        </Router>
    );
}

export default App;
