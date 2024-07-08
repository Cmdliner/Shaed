import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_SERVER } from "../../utils/env_alias";
import ErrorInfo from "../../components/ErrorInfo";



const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const reqPayload = JSON.stringify({ username: username.trim(), password });
    
    


    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        let fetchHeaders: HeadersInit = { "Content-Type": "application/json" };
        if(localStorage.getItem('Authorization')) {
            fetchHeaders = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('Authorization')}`
            }
        }
        try {
            const res =  await fetch(`${AUTH_SERVER}/sign-in`, {
                method: 'POST',
                headers: fetchHeaders,
                mode: 'cors',
                credentials: 'include',
                body: reqPayload,
            });
            if(res.ok && res.status === 200) {
                const authToken = res.headers.get('Authorization')?.split(' ')[1];
                authToken && localStorage.setItem('Authorization', authToken);
                navigate('/rooms');
            }
            const data = await res.json();
            if(data['errMssg']) throw new Error(data['errMssg']);

        } catch (error) {
            console.error(error);
            setError((error as Error).message);
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <section className="pt-[8rem] min-h-screen">
                <h1 className="text-3xl font-bold text-center mb-[4rem]">Sign-In</h1>
                <form className=" w-[80%] md:w-[700px] mx-auto flex flex-col" onSubmit={(e) => handleSubmit(e)}>
                    {err && <ErrorInfo error={err} />}
                    <div className="mb-[2rem]">
                        <label className="input input-bordered flex items-center gap-2 mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                            <input type="text" className="grow" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                        </label>
                    </div>
                    <div className="mb-[2rem]">
                        <label className="input input-bordered flex items-center gap-2 mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                            <input type="password" className="grow" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                        </label>
                    </div>
                    <button className="btn btn-wide btn-neutral flex self-center" disabled={isLoading}>Sign In</button>
                    <p className="self-center my-4">Do not have an account? <Link className="underline" to="/register">Register</Link></p>
                </form>
            </section>
        </>
    );
}

export default SignIn;
