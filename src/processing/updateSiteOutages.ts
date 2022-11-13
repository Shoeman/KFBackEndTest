import {getOutages} from "../requests/outages";
import {getSiteInfoById} from "../requests/siteInfo";
import {createSiteOutages} from "./createSiteOutages";
import {postDeviceOutagesForSite} from "../requests/siteOutages";
import {PostResponse} from "../requests/httpRequests";

// Will run the 'whole program'
export async function updateSiteOutages(siteId: string): Promise<PostResponse> {

    return await Promise.all([getOutages(), getSiteInfoById(siteId)])
        .then(([outages, siteInfo]) => {
            return createSiteOutages(outages, siteInfo);
        })
        .then(siteOutages => {
            return postDeviceOutagesForSite(siteOutages, siteId);
        });
}
