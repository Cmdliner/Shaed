import { useEffect, useState } from "react";
import { IFetchData } from "../interfaces/FetchData";

const useFetch = (fetchUri: string, fetchOpts: RequestInit) => {

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [fetchData, setFetchData] = useState<IFetchData>();


    useEffect(() => {
        async function runFetch() {
            try {
                const res = await fetch(fetchUri, fetchOpts);
                const resData: IFetchData = await res.json();
                if (resData["errMssg"]) setError(resData.errMssg);
                else setFetchData(resData);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setIsLoading(false);
            }
        }
        runFetch();
    }, [fetchUri]);

    return [fetchData, isLoading, error] as const;
}

export default useFetch;
