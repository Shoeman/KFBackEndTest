import {Device} from "./siteInfo";
import {Outage} from "./outages";

export interface DeviceOutage extends Outage, Device {}
