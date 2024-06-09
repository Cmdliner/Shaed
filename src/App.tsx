import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Register from "./pages/Auth/Register";
import SignIn from "./pages/Auth/SignIn";
import Logout from "./pages/Auth/Logout";

const App = () => {
    return ( 
        <Router>
            <Routes>
                {/* Default routes */}
                <Route path="/" element={ <RootLayout /> }> 
                    <Route path="/" element={<Home />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/sign-in" element={<SignIn />}/>
                    <Route path="/logout" element={<Logout />}/>
                    <Route path="/create-room" element={<Home />}/>
                    <Route path="/" element={<Home />}/>
                    <Route path="*" element={<ErrorPage />}/>
                </Route>

                {/* Room routes */}
            </Routes>
        </Router>
     );
}
 
export default App;