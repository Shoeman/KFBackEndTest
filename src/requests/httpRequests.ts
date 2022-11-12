import axios from "axios";

export async function httpGet<R>(url: string): Promise<{ data: R; status: number }> {

    const config = {
        headers: {
            "x-api-key": process.env.KF_API_KEY
        }
    }
    return await axios.get<R>(url, config);
}