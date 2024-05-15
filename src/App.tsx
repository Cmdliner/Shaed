import Header from "./components/Header";
// import Auth from "./pages/Auth";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

const App = () => {

  // Love me Jeje
  return (
    <div className="bg-black text-white w-full h-full absolute">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/chat" element={<ChatRoom />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;