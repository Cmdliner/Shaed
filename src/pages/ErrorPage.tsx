import { useNavigate } from "react-router-dom";
import   error_bg  from "../assets/error_bg.jpg";

const ErrorPage = () => {
    const navigate = useNavigate();
    function handleRedirect() {
        navigate(-1);   
    }
    return (
        <div className="hero min-h-screen flex justify-center" style={{backgroundImage: `url(${error_bg})`}}>
            <button className="btn self-center shadow-lg m-8" onClick={handleRedirect}>Go back</button>
            
        </div>
    );
}

export default ErrorPage;