import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { Link } from "react-router-dom";

const Auth: React.FC<{ signup: boolean, login: boolean }> = ({ signup, login }) => {
    const isLogin = login;
    const isSignUp = signup;
    const selectedStyles = "bg-black text-white"
    return (
        <div className="flex flex-col items-center justify-center bg-white text-black mx-auto py-12 ">
            <h1 className="text-5xl uppercase font-black">Shaed</h1>
            <div className=" flex justify-center items-center mt-4 border border-black">
                <button className={`cursor p-4  ${isLogin && selectedStyles}`}><Link to={"/login"}>Login</Link></button>
                <button className={`cursor p-4 ${isSignUp && selectedStyles}`}><Link to={"/signup"}>SignUp</Link></button>
            </div>
            {isLogin && <SignIn />}
            {isSignUp && <SignUp />}
        </div>
    );
}

export default Auth;