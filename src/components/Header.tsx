import { BsFillChatDotsFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import useAuth from "../utils/useAuth";
import login_pic from "../assets/login_display.jpg"
const Header: React.FC = () => {
    const [ isAuthenticated, isLoading, _error ] = useAuth();
    return (
        <header className="navbar bg-base-100 fixed z-[9999]">
            <div className="navbar bg-base-100">
                <Link to="/" className="btn btn-ghost text-xl">Shaed</Link>
            </div>
            <div className="navbar-end lg:hidden">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 right-4">

                        <li><Link to="/create-room">Create Room</Link></li>
                        <li><Link to="/rooms">
                            <div className="indicator">
                                <div className="flex gap-[.5em]">Rooms  <BsFillChatDotsFill /> </div> 
                                <span className="badge badge-xs badge-primary indicator-item"></span>
                            </div>
                        </Link></li>
                        {!isLoading && !isAuthenticated ? <li><Link to="/register">Register</Link></li>: 
                        <li><Link to="/logout">Logout</Link></li>
                    }
                    </ul>
                </div>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-[.6em]"> 
                    <li><Link to="/create-room">Create Room</Link></li>
                    {!isLoading && !isAuthenticated ? <li><Link to="/register">Register</Link></li>: 
                        <li><Link to="/logout">Logout</Link></li>
                    }
                    <li>
                        <Link to="/rooms">
                            <div className="indicator">
                                <BsFillChatDotsFill />
                                <span className="badge badge-xs badge-primary indicator-item"></span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <div className="image w-[4rem] rounded border border-r-[50%]" >
                            <img src={login_pic} alt="Default Profile"  className="container`"/>
                        </div>
                    </li>
                </ul>

            </div>
        </header>

    );
}

export default Header;
