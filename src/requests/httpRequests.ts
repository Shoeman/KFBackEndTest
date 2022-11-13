import axios from "axios";

export interface ApiResponse<D> {
    data: D,
    status: number
}

export type PostResponse = ApiResponse<Record<string, never>>

export async function httpGet<R>(url: string, apiKey: string): Promise<ApiResponse<R>> {

    const config = {
        headers: {
            "x-api-key": apiKey
        }
    };
    return await axios.get<R>(url, config);
}

export async function httpPost<D>(url: string, apiKey: string, data: D): Promise<PostResponse> {

    const config = {
        headers: {
            "x-api-key": apiKey
        }
    };
    return await axios.post(url, data, config);
}