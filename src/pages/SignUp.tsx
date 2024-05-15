import { FormEvent, useState } from "react";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
    }
    return (
        <div className="flex flex-col items-center justify-center bg-white text-black mx-auto py-12 ">
            <h1 className="text-5xl uppercase font-black">Shaed</h1>

            <span className="font-light text-xl mt-4">Login|Register</span>
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
                <div className="flex flex-col px-8 py-4">
                    <label htmlFor="confirmPassword" className="font-bold text-2xl"> Confirm Password</label>
                    <input
                        type="password" name="confirmPassword"
                        id="confirmPassword"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border border-black p-4 focus:rounded-xl focus:outline-none focus:border-2" />
                </div>
                <div className="flex  justify-center items-center">
                    <button disabled={false} type="submit" className="text-white bg-black py-4 px-8 rounded-[2rem] content-center transform hover:scale-[115%]">Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;