import {Outage} from "../requests/outages";
import {Device, SiteInfo} from "../requests/siteInfo";
import {DeviceOutage} from "../requests/siteOutages";
import {validOutage} from "./outageValidation";

// Given outage data and siteInfo, returns all DeviceOutage info for the site within the date threshold
export function createSiteOutages(outages: Outage[], siteInfo: SiteInfo): DeviceOutage[] {

    const devicesById = new Map<string, Device>();
    siteInfo.devices.forEach(device => devicesById.set(device.id, device));

    return outages.filter(validOutage)
        .filter(outage => devicesById.has(outage.id))
        .map(outage => {
            const device = devicesById.get(outage.id) as Device;
            return {
                ...outage,
                ...device
            }
        });
}
