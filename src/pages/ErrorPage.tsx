import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();
    function handleRedirect() {
        navigate(-1);   
    }
    return (
        <div className="min-h-screen flex flex-col gap-2 items-center justify-center">
            <h1 className="text-2xl md:text-5xl text-bold">Oops! Could not find that page</h1>
            <button className="btn " onClick={handleRedirect}>Go back</button>
        </div>
    );
}

export default ErrorPage;