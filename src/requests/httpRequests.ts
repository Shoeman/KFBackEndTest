import axios from "axios";

export interface ApiResponse<D> {
    data: D,
    status: number
}

export type PostResponse = ApiResponse<Record<string, never>>

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

function getConfigWithApiKey(apiKey: string) {
    return {
        headers: {
            "x-api-key": apiKey
        }
    };
}

export async function httpGet<R>(url: string, apiKey: string): Promise<ApiResponse<R>> {

    const config = getConfigWithApiKey(apiKey);
    return requestWithRetries(() => axios.get<R>(url, config))
}

export async function httpPost<D>(url: string, apiKey: string, data: D): Promise<PostResponse> {

    const config = getConfigWithApiKey(apiKey);
    return requestWithRetries(() => axios.post(url, data, config))
}

async function requestWithRetries<R>(requestFunction: () => Promise<ApiResponse<R>>, retryCount = 0): Promise<ApiResponse<R>> {

    const maxRetries = Number(process.env.REQUEST_MAX_RETRIES || 3);
    const retryWait = Number(process.env.REQUEST_RETRY_WAIT_TIME || 1000);

    return await requestFunction().catch(async error => {
        if ((error.status == 500 || error.response?.status == 500) && retryCount < maxRetries) {
            console.log("500 status received. Retrying...")
            await wait(retryWait);
            return requestWithRetries(requestFunction, retryCount + 1)
        }
        // We want to handle other errors later
        throw error;
    });
}