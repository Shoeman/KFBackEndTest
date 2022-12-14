import {Device} from "./siteInfo";
import {Outage} from "./outages";
import {httpPost, PostResponse} from "./httpRequests";

// Same as 'EnhancedOutage' in the api spec
export interface DeviceOutage extends Outage, Device {}

const SITE_OUTAGES_PATH = "/site-outages/";

export async function postDeviceOutagesForSite(deviceOutages: DeviceOutage[], siteId: string): Promise<PostResponse> {
    return await httpPost(process.env.KF_API_URL + SITE_OUTAGES_PATH + siteId, process.env.KF_API_KEY as string, deviceOutages);
}