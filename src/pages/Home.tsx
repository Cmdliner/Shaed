// import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Features from "../components/Features";

const Home = () => {

    return (
        <div className="min-h-screen pt-20 md:pt-5">
            <Hero />
            <Features />
        </div>
    );
}

export default Home;