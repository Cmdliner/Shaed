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

    let fetchHeaders: HeadersInit = { "Content-Type": "application/json" };
                if(localStorage.getItem('Authorization')) {
                    fetchHeaders = {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('Authorization')}`
                    }
                }
    useEffect(() => {
        async function fetchAuthStatus() {
            try {
                const res = await fetch(`${AUTH_SERVER}/is-authenticated`, {
                    method: 'GET',
                    headers: fetchHeaders,
                    mode: 'cors',
                    credentials: 'include',
                });
                const data: IAuthData = await res.json();
                setIsAuthenticated(data.authenticated)
            }
            catch (err) {
                setError((err as Error).message);
                setIsAuthenticated(false);
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
