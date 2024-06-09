import { BsFillChatDotsFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <header className="navbar bg-base-100 fixed z-[9999]">
            <div className="navbar bg-base-100">
                <Link to="/" className="btn btn-ghost text-xl">Shaed</Link>
            </div>
            <div className="navbar-end">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/register">Sign-In</Link></li>
                    <li><Link to="/">Create Room</Link></li>
                </ul>
                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <BsFillChatDotsFill />
                        <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>


                </button>
            </div>
        </header>

    );
}

export default Header;
