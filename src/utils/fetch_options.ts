
type ReqMethod = "GET" | "POST" | "DELETE" | "PUT";

export function genFetchOpts(method: ReqMethod,  extraHeaders?: object | null, body?: BodyInit) {
    const fetchOpts: RequestInit = {
        method,
        headers: { "Content-Type": "application/json" },
        mode: 'cors',
        credentials: 'include'
    }
    if (extraHeaders) {
        fetchOpts.headers = {  "Content-Type": "application/json", ...extraHeaders }
    }
    if(method !== "GET" && body){
        fetchOpts.body = body;
    }
    return fetchOpts;
}
