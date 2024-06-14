
type ReqMethod = "GET" | "POST" | "DELETE" | "PUT";

export function genFetchOpts(method: ReqMethod, body?: BodyInit) {
    const fetchOpts: RequestInit = {
        method,
        headers: { "Content-Type": "application/json" },
        mode: 'cors',
        credentials: 'include'
    }
    if(method !== "GET" && body){
        fetchOpts.body = body;
    }
    return fetchOpts;
}
