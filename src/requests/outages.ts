import {httpGet} from "./httpRequests";

export interface Outage {
    id: string,
    begin: string,
    end: string
}

const OUTAGE_PATH = "/outages";

export async function getOutages(): Promise<Outage[]> {

    const result = httpGet<Outage[]>(process.env.KF_API_URL + OUTAGE_PATH, process.env.KF_API_KEY as string);
    return result.then(response => {
        return response.data
    });
}