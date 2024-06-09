import bg_img from "../assets/nasa_bg.jpg";
import { Link } from "react-router-dom";

const Home = () => {

    return (
        <>
            <img src="../assets/nasa_bg.jpg" alt="" />
            <div className="hero min-h-screen" style={{ backgroundImage: `url(${bg_img})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-6xl font-bold">Shaed</h1>
                        <p className="mb-5">Connect with pals from anywhere in the world. Chat seemlessly and get responses in real-time. Share emotions with friends and family</p>
                        <Link to="/register"><button className="btn btn-primary">Get Started</button></Link>
                    </div>
                </div>
            </div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={bg_img} className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold">Version 2 is coming soon!</h1>
                        <p className="py-6 text-2xl         ">Version 2 is coming with new features like <br />   
                        <span>Chat with AI</span> &amp; <span className="text-2xl">Anonymous chat rooms</span>
                        </p>
                        
                        <a href="https://github.com/Cmdliner/Shaed" target="_blank" rel="noopener noreferrer">
                            <button className="btn btn-primary">Click here to contribute</button>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;