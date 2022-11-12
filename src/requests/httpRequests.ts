import axios from "axios";

export async function httpGet<R>(url: string): Promise<{ data: R; status: number }> {
    const {data, status} = await axios.get<R>(url);
    return {data, status};
}