import {Outage} from "../requests/outages";

const BEGIN_THRESHOLD = new Date("2022-01-01T00:00:00.000Z");

export function validOutage(outage: Outage): boolean {
    return new Date(outage.begin) >= BEGIN_THRESHOLD;
}
