import {updateSiteOutages} from "./processing/updateSiteOutages";

console.log("Starting outage update process");
console.log("KF_API_URL: " + process.env.KF_API_URL);

if (!process.env.KF_API_URL || !process.env.KF_API_KEY) {
    console.warn("WARNING: missing KF_API_URL and/or KF_API_KEY")
}

const siteId = process.env.KF_SITE_ID ?? "norwich-pear-tree";

console.log(`Running update for ${siteId}`)

updateSiteOutages(siteId)
    .then((response) => {
        console.log("Post response status: " + JSON.stringify(response.status));
    });
