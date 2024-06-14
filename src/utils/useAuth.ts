import { AUTH_SERVER } from "./env_alias";
import { useState, useEffect } from "react";

const useAuth = () => {
    interface IAuthData {
        errMssg?: string;
        authenticated: boolean;
    }

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchAuthStatus() {
            try {
                const res = await fetch(`${AUTH_SERVER}/is-authenticated`, {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" },
                    mode: 'cors',
                    credentials: 'include'
                })
                const data: IAuthData = await res.json();
                if (data["errMssg"]) setError(data.errMssg);
                else setIsAuthenticated(data.authenticated)
            }
            catch (err) {
                setError((err as Error).message);
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchAuthStatus();
    }, []);

    return [isAuthenticated, isLoading, error] as const;
};

export default useAuth;
