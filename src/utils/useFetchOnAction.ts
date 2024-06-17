import { useState, useCallback } from 'react';

interface FetchState<T> {
    data: T | null;
    error: Error | null;
    isLoading: boolean;
}

interface useFetchOnActionOptions extends RequestInit {
    onSuccess?: (data: any) => void;
    onError?: (error: Error) => void;
}

function useFetchOnAction<T = any>(url: string, options: useFetchOnActionOptions = {}): [
    (data?: object) => Promise<void>,
    FetchState<T>,
    () => void
] {
    const [fetchState, setFetchState] = useState<FetchState<T>>({
        data: null,
        error: null,
        isLoading: false,
    });

    const { onSuccess, onError, ...fetchOptions } = options;

    const reset = useCallback(() => {
        setFetchState({
            data: null,
            error: null,
            isLoading: false,
        });
    }, []);

    const fetchData = useCallback(async () => {
        setFetchState(prevState => ({ ...prevState, isLoading: true, error: null }));

        try {
            const response = await fetch(url, fetchOptions);
            const result = await response.json();
            if (result["errMssg"]) {
                setFetchState({
                    data: null,
                    error: new Error(result["errMssg"]),
                    isLoading: false,
                });
            } else {
                setFetchState({
                    data: result,
                    error: null,
                    isLoading: false,
                });
            }

            onSuccess?.(result);
        } catch (error) {
            setFetchState({
                data: null,
                error: error instanceof Error ? error : new Error(String(error)),
                isLoading: false,
            });

            onError?.(error instanceof Error ? error : new Error(String(error)));
        }
    }, [url, fetchOptions, onSuccess, onError]);

    return [fetchData, fetchState, reset];
}

export default useFetchOnAction;
