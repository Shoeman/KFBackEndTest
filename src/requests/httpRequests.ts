import axios, {AxiosResponse} from "axios";

export async function httpGet<R>(url: string): Promise<{ data: R; status: number }> {

    const config = {
        headers: {
            "x-api-key": process.env.KF_API_KEY
        }
    }
    return await axios.get<R>(url, config);
}

export async function httpPost<D>(url: string, apiKey: string, data: D): Promise<AxiosResponse> {

    const config = {
        headers: {
            "x-api-key": apiKey
        }
    }
    return await axios.post(url, data, config);
}