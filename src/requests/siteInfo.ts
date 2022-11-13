import {httpGet} from "./httpRequests";

export interface Device {
    id: string,
    name: string
}

export interface SiteInfo {
    id: string,
    name: string,
    devices: Device[]
}

const SITE_INFO_PATH = "/site-info/";

export async function getSiteInfoById(siteId: string): Promise<SiteInfo> {

    const result = httpGet<SiteInfo>(process.env.KF_API_URL + SITE_INFO_PATH + siteId, process.env.KF_API_KEY as string);
    return result.then(response => {
        return response.data;
    });
}