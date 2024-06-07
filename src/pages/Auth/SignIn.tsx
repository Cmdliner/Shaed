import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMessages, setErrmessages] = useState<string[]>([]);

    const handleSubmit = async (e: FormEvent) => {
        const signInHeaders = new Headers({ "Content-Type": "application/json" });
        e.preventDefault();
        const res = await fetch(`${import.meta.env.VITE_AUTH_SERVER_URI}/sign-in`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: signInHeaders,
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        if (data['errMssg']) {
            setErrmessages([...errMessages, data['errMssg']])
        }
        else navigate("/rooms");

    }
    return (
        <>
            <ul>
                {errMessages && errMessages.map((errMssg: string, index: number) => (
                    <li key={index}>{errMssg}</li>
                ))}
            </ul>
            <form onSubmit={(e) => handleSubmit(e)} className="w-[95%] md:w-[50%]">
                <div className="flex flex-col px-8 py-4">
                    <label htmlFor="username" className="font-bold text-2xl">Username</label>
                    <input
                        type="text" name="username"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-black p-4 focus:rounded-xl focus:outline-none focus:border-2" />
                </div>
                <div className="flex flex-col px-8 py-4">
                    <label htmlFor="password" className="font-bold text-2xl">Password</label>
                    <input
                        type="password" name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-black p-4 focus:rounded-xl focus:outline-none focus:border-2" />
                </div>
                <div className="flex  justify-center items-center">
                    <button disabled={false} type="submit" className="text-white bg-black py-4 px-8 rounded-[2rem] content-center transform hover:scale-[115%]">Log in</button>
                </div>
            </form>
        </>
    );
}

export default SignIn;