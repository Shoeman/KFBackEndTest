import {Outage} from "../requests/outages";
import {Device, SiteInfo} from "../requests/siteInfo";
import {DeviceOutage} from "../requests/siteOutages";
import {filterOutages} from "./outageFilter";

export function createSiteOutages(outages: Outage[], siteInfo: SiteInfo): DeviceOutage[] {

    const devicesById = new Map<string, Device>();
    siteInfo.devices.forEach(device => devicesById.set(device.id, device));

    const validOutages = filterOutages(outages).filter(outage => devicesById.has(outage.id));

    return validOutages.map(outage => {
        const device = devicesById.get(outage.id) as Device;
        return {
            ...outage,
            ...device
        }
    });
}
