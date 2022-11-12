import {getOutages, Outage} from "./requests/outages";
import {filterOutages} from "./processing/outageFilter";

console.log("Hello World");
console.log("KF_API_URL: " + process.env.KF_API_URL);

// This will eventually do something useful
export async function processOutages(): Promise<Outage[]> {
    return await getOutages().then(outages => filterOutages(outages));
}

export async function main() {
    processOutages().then(console.log);
}
