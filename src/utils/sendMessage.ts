import { API_SERVER } from "./env_alias"
import { genFetchOpts } from "./fetch_options"

const sendMessage = async (roomID: string, body: string): Promise<string> => {
    const res = await fetch(`${API_SERVER}/${roomID}/send`, genFetchOpts("POST", body));
    const data = await res.json();
    if(data["errMssg"]) return data["errMssg"];
    return "";
}


export default sendMessage;