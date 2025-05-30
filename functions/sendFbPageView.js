// import { createHash } from "crypto";
// import axios from "axios";

// import { fbpCookie, getLocationData } from "./postData";

// const access_token =
//   "EAAN764ZC98fEBOZBeixQ3cINCjP8l1X33gnNC8jeHJzUjogI2oL2dOz2wtg1m8KcNiIpGZBTAZCmmT9JC4adYZB28AT80n9hB2ZArGGUZAUd3GlwAyyj091ZBNJ6V8X7ZBh2wfL5KoJRZB8uQuKPenYexO2VZAQxTlMeONlr8x77TwWaysAwehHE4ZCgiDuFH74OYZANp0QZDZD";
// const pixel_id = "1815249061859086";
// const url = `https://graph.facebook.com/v19.0/${pixel_id}/events`;

// export const sendEventToConversionApi = async (siteName, eventName) => {
//   const userLocationData = await getLocationData();
//   const userAgent = navigator.userAgent;

//   const hashedCity = createHash("sha256")
//     .update(userLocationData.city)
//     .digest("hex");
//   const hashedRegion = createHash("sha256")
//     .update(userLocationData.region.toLocaleLowerCase())
//     .digest("hex");
//   const hashedZipCode = createHash("sha256")
//     .update(userLocationData.zipcode)
//     .digest("hex");
//   const hashedCountry = createHash("sha256")
//     .update(userLocationData.country)
//     .digest("hex");

//   const data = [
//     {
//       event_name: eventName,
//       event_time: Math.floor(Date.now() / 1000),
//       user_data: {
//         ct: hashedCity,
//         st: hashedRegion,
//         zip: hashedZipCode,
//         country: hashedCountry,
//         client_ip_address: userLocationData.ip,
//         client_user_agent: userAgent,
//         fbc: fbpCookie,
//       },
//       event_source_url: siteName,
//       action_source: "website",
//     },
//   ];

//   const requestData = { data: data };

//   try {
//     console.log(requestData, "requestData");
//     const response = await axios.post(url, requestData, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       params: {
//         access_token: access_token,
//       },
//     });

//     console.log("✅ Facebook event sent successfully:", {
//       status: response.status,
//       statusText: response.statusText,
//       data: response.data,
//     });
//   } catch (error) {
//     console.error("❌ Error sending Facebook event:");

//     if (axios.isAxiosError(error)) {
//       if (error.response) {
//         console.error("Response error:", {
//           status: error.response.status,
//           data: error.response.data,
//         });
//       } else if (error.request) {
//         console.error("No response received:", error.request);
//       } else {
//         console.error("Error message:", error.message);
//       }
//     } else {
//       console.error("Unknown error:", error);
//     }
//   }
// };

import axios from "axios";
import { fbpCookie, getLocationData } from "./postData";

export const sendEventToConversionApi = async (siteName, eventName, userData = {}) => {
  const userLocationData = await getLocationData();
  const userAgent = navigator.userAgent;

  const eventPayload = {
    eventName: eventName,
    eventUrl: siteName,
    userData: {
      email: userData.email,
      phone: userData.phoneNumber,
      city: userLocationData.city,
      region: userLocationData.region,
      country: userLocationData.country,
      zip: userLocationData.zipcode,
      ip: userLocationData.ip,
      userAgent: userAgent,
      fbc: fbpCookie,
      fbp: undefined,
    },
  };

  console.log(eventPayload, "eventPayload");
  console.log(siteName, eventName, "siteName, eventName");

  try {
    const response = await axios.post(
      // "http://localhost:5002/facebook/event",
      "https://back.netronic.net/facebook/event",
      eventPayload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Facebook event sent successfully:", response.data);
  } catch (error) {
    console.error("❌ Error sending Facebook event:", error);
  }
};
