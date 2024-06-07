import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleLogout = (e: FormEvent) => {
        e.preventDefault();
        fetch(`${import.meta.env.VITE_AUTH_SERVER_URI}/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (data["errMssg"]) setError(data["errMssg"]); 
                else navigate("/");
            })
            .catch(err => setError(err));
    }
    return (
        <form onSubmit={(e) => handleLogout(e)}>
                {error && <h3>{error}</h3>}
            <h2>Are you sure you want to Logout?</h2>
            <button>Logout</button>
        </form>
    );
}

export default Logout;