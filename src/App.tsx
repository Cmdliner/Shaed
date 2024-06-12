import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Register from "./pages/Auth/Register";
import SignIn from "./pages/Auth/SignIn";
import Logout from "./pages/Auth/Logout";
import Rooms from "./pages/Chat/Rooms";
import ProtectedRoute from "./pages/Auth/Protected";
import RoomLayout from "./Layout/RoomLayout";

const App = () => {

    return (
        <Router>
            <Routes>

                {/* Room routes */}
                <Route path="/rooms" element={<RoomLayout />} >
                    <Route path="/rooms/" element={
                        <ProtectedRoute>
                            <Rooms />
                        </ProtectedRoute>} />
                </Route>


                {/* Default routes */}
                <Route path="/" element={<RootLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/create-room" element={<Home />} />
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<ErrorPage />} />
                </Route>


            </Routes>
        </Router>
    );
}

export default App;