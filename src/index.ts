import {updateSiteOutages} from "./processing/updateSiteOutages";

console.log("Starting outage update process");
console.log("KF_API_URL: " + process.env.KF_API_URL);

updateSiteOutages("norwich-pear-tree")
    .then((response) => {
        console.log("Post response status: " + JSON.stringify(response.status));
    });
