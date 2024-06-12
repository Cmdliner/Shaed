import { AUTH_SERVER } from "./env_alias";
import { useState, useEffect } from "react";

const useAuth = () => {
    interface IAuthData {
        errMssg?: string;
        authenticated: boolean;
    }

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

    return [isAuthenticated, isLoading, error];
};

export default useAuth;
