import { createHash } from "crypto";
import axios from "axios";

import { fbpCookie, getLocationData } from "./postData";

const access_token =
    "EAAN764ZC98fEBOZBeixQ3cINCjP8l1X33gnNC8jeHJzUjogI2oL2dOz2wtg1m8KcNiIpGZBTAZCmmT9JC4adYZB28AT80n9hB2ZArGGUZAUd3GlwAyyj091ZBNJ6V8X7ZBh2wfL5KoJRZB8uQuKPenYexO2VZAQxTlMeONlr8x77TwWaysAwehHE4ZCgiDuFH74OYZANp0QZDZD";
const pixel_id = "1815249061859086";
const url = `https://graph.facebook.com/v19.0/${pixel_id}/events`;

export const sendEventToConversionApi = async (siteName) => {
    const userLocationData = await getLocationData();
    const userAgent = navigator.userAgent;
    console.log("User agent:", userAgent);
    console.log(userLocationData);

    const hashedCity = createHash("sha256")
        .update(userLocationData.city)
        .digest("hex");
    const hashedRegion = createHash("sha256")
        .update(userLocationData.region.toLocaleLowerCase())
        .digest("hex");
    const hashedZipCode = createHash("sha256")
        .update(userLocationData.zipcode)
        .digest("hex");
    const hashedCountry = createHash("sha256")
        .update(userLocationData.country)
        .digest("hex");

    const data = [
        {
            event_name: "PageView",
            event_time: Math.floor(Date.now() / 1000),
            user_data: {
                ct: hashedCity,
                st: hashedRegion,
                zip: hashedZipCode,
                country: hashedCountry,
                client_ip_address: userLocationData.ip,
                client_user_agent: userAgent,
                fbc: fbpCookie,
            },
            event_source_url: siteName,
            action_source: "website",
        },
    ];

    const requestData = { data: data };

    await axios
        .post(url, requestData, {
            headers: {
                "Content-Type": "application/json",
            },
            params: {
                access_token: access_token,
            },
        })
        .then((response) => {
            console.log("Response:", response.data);
        })
        .catch((error) => {
            console.error("Error:", error.response.data);
        });
};
