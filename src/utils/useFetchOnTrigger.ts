import { useCallback, useEffect, useState } from "react";
import { IFetchData } from "../interfaces/FetchData";

const useFetchOnTrigger = (url: string, options: RequestInit)  => {
    const [err, setErr] = useState("");
    const [data, setData] = useState<IFetchData | null>(null);
    const reset = useCallback(() => {
        setData( null);
        setErr("");
    }, [])
    useEffect(() => {
        async function runFetch() {
            try {
                const res = await fetch(url, options);
                const data = await res.json();
                if(data["errMssg"]) throw new Error(data["errMssg"]);
                else setData(data);
            } catch (error) {
                setErr((error as Error).message);
            }
        }
        runFetch()
    }, [url])

    return [err, data, reset] as const;
}

export default useFetchOnTrigger;