import { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(false);

    const handleSubmit = () => {
        const fetchURI = isLogin ? 'http://localhost:4000/auth/login' : 'http://localhost:4000/auth/register';
        fetch(fetchURI, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
    }
    return (
        <div>
            <button onClick={() => setIsLogin(!isLogin)}>SignUp | Login</button>
            <form method="POST" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                <br />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value )} />

                <input type="submit" value="Sign-up" />

            </form>
        </div>
    );
}

export default Auth;