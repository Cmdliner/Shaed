import { AUTH_SERVER } from "./env_alias";
import { useState, useEffect } from "react";
import { genFetchOpts } from "./fetch_options";

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
                console.log("Auth Server -> ", AUTH_SERVER)
                const res = await fetch(`${AUTH_SERVER}/is-authenticated`, genFetchOpts("GET"));
                const data: IAuthData = await res.json();
                setIsAuthenticated(data.authenticated)
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
