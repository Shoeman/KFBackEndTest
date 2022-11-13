import {getOutages} from "../requests/outages";
import {getSiteInfoById} from "../requests/siteInfo";
import {createSiteOutages} from "./createSiteOutages";
import {DeviceOutage, postDeviceOutagesForSite} from "../requests/siteOutages";
import {AxiosResponse} from "axios";

// Will run the 'whole program'
export async function updateSiteOutages(siteId: string): Promise<AxiosResponse> {

    const outages = await getOutages();
    const siteInfo = await getSiteInfoById(siteId);

    const siteOutages: DeviceOutage[] = createSiteOutages(outages, siteInfo);

    return await postDeviceOutagesForSite(siteOutages, siteId);
}
