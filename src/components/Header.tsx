import { BsFillChatDotsFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import login_pic from "../assets/login_display.jpg"
import { useEffect, useState } from "react";

const Header: React.FC = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(!!(localStorage.getItem('Authorization') ?? ""));
    const navigate = useNavigate();
    useEffect(() => { 
        setIsAuthenticated(!!(localStorage.getItem('Authorization') ?? ""))
    }, [window.location.pathname]);

    function handleLogout() {
        localStorage.removeItem('Authorization');
        navigate('/login');
    }
    return (
        <header className="navbar bg-base-200 bg-opacity-90 justify-between fixed z-[9999]">
            <div className="bg-base-100">
                <Link to="/" className="btn btn-ghost text-xl">Shaed</Link>
            </div>
            <div className="navbar-end lg:hidden">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 right-4">

                        <li><Link to="/create-room">Create Room</Link></li>
                        <li><Link to="/available-rooms">Available Rooms</Link></li>
                        <li><Link to="/rooms">
                            <div className="indicator">
                                <div className="flex gap-[.5em]">Rooms  <BsFillChatDotsFill /> </div> 
                                <span className="badge badge-xs badge-primary indicator-item"></span>
                            </div>
                        </Link></li>
                        {!isAuthenticated ? <li><Link to="/register">Register</Link></li>: 
                        <li><button onClick={handleLogout}>Logout</button></li>
                    }
                    </ul>
                </div>
            </div>
            <div className="hidden lg:flex">
                <ul className="menu menu-horizontal items-center px-1 gap-[.6em]"> 
                    <li><Link to="/create-room">Create Room</Link></li>
                    <li><Link to="/available-rooms">Available Rooms</Link></li>
                    <li>
                        <Link to="/rooms">
                            <div className="indicator">
                                <BsFillChatDotsFill />
                                <span className="badge badge-xs badge-primary indicator-item"></span>
                            </div>
                        </Link>
                    </li>
                    {!isAuthenticated ? <li><Link to="/register">Register</Link></li>:
                        <li className="flex flex-col md:flex-row">
                            <button onClick={handleLogout}>Logout</button>
                            <div className="avatar ">
                                <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                                    <img src={login_pic} />
                                </div>
                            </div>
                        </li>
                    }
                </ul>

            </div>
        </header>

    );
}

export default Header;
