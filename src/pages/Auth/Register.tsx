import { FormEvent, useState } from "react";
import { AUTH_SERVER } from "../../utils/env_alias";
import { Link, useNavigate } from "react-router-dom";
import useFetchonAction from "../../utils/useFetchOnAction";
import { genFetchOpts } from "../../utils/fetch_options";
import ErrorInfo from "../../components/ErrorInfo";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [err, setErr] = useState("");
    const navigate = useNavigate();
    const ReqPayload = JSON.stringify({ username, password });
    const [register, { error, isLoading }, reset] = useFetchonAction(
        `${AUTH_SERVER}/register`, 
        { 
            ...(genFetchOpts('POST', ReqPayload)),
            onSuccess: (data) => {
                if(!data["errMssg"]) navigate("/create-room");
            },
            onError: (error) => {
                setErrors([...errors, error.message]);
            }
        });

        if(error) {
            setErr(error.message)
            reset();
        }
    
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!(password === confirmPassword)) {
            setErr("Passwords don't match!");
            return;
        }
        await register();
        

    }

    return (
        <>
            <section className="pt-[8rem] min-h-screen">
                <h1 className="text-3xl font-bold text-center mb-[4rem]">Register</h1>
                <form className=" w-[80%] md:w-[700px] mx-auto flex flex-col" onSubmit={(e) => handleSubmit(e)}>
                    {err && <ErrorInfo error={err} />}
                    <div className="mb-[2rem]">
                        <label className="input input-bordered flex items-center gap-2 mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                            <input type="text" className="grow" placeholder="username" minLength={6} onChange={(e) => setUsername(e.target.value)} />
                        </label>
                    </div>
                    <div className="mb-[2rem]">
                        <label className="input input-bordered flex items-center gap-2 mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                            <input type="password" className="grow" placeholder="password" minLength={6} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                    </div>
                    <div className="mb-[2rem]">
                        <label className="input input-bordered flex items-center gap-2 mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                            <input type="password" placeholder="confirm password" className="grow" minLength={6} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </label>
                    </div>
                    <button className="btn btn-wide btn-neutral self-center" disabled={isLoading}>Register</button>
                    <p className="self-center my-4">Already have an account? <Link className="underline" to="/login">Sign In</Link></p>
                </form>
            </section>
        </>
    );
}

export default Register;
