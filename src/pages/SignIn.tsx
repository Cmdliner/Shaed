import { FormEvent, useState } from "react";
const SERVER_URI = "http://localhost:4000"

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        const signInHeaders = new Headers({ "Content-Type": "application/json" });
        e.preventDefault();
        const res = await fetch(`${SERVER_URI}/api/v1/auth/sign-in`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: signInHeaders,
            body: JSON.stringify({ email, password })
        });
        if (!res.ok) {
            throw new Error("Something went wrong!")
        }
        const data = await res.json();
        console.log(data);
        location.assign("/")

    }
    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)} className="w-[95%] md:w-[50%]">
                <div className="flex flex-col px-8 py-4">
                    <label htmlFor="email" className="font-bold text-2xl">Email</label>
                    <input
                        type="email" name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
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