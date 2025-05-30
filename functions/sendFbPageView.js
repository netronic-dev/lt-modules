// import axios from "axios";
// import { getLocationData, fbpCookie } from "./postData";

// export const sendEventToConversionApi = async (
//   siteName,
//   eventName,
//   userData = {}
// ) => {
//   const userLocationData = await getLocationData();
//   const userAgent = navigator.userAgent;

//   const eventPayload = {
//     eventName: eventName,
//     eventUrl: siteName,
//     userData: {
//       email: userData.email,
//       phone: userData.phone,
//       city: userLocationData.city,
//       region: userLocationData.region,
//       country: userLocationData.country,
//       zip: userLocationData.zipcode,
//       ip: userLocationData.ip,
//       userAgent: userAgent,
//       fbc: fbpCookie,
//       fbp: undefined,
//     },
//   };

//   try {
//     const response = await axios.post(
//       "https://back.netronic.net/facebook/event",
//       eventPayload,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("✅ Facebook event sent successfully:", response.data);
//   } catch (error) {
//     await axios.post("https://back.netronic.net/telegram/send-error-message", {
//       message: `❌ Error sending Facebook event ${window.location.hostname}: ${error}`,
//     });
//   }
// };

import axios from "axios";
import { getLocationData, fbpCookie } from "./postData";

export const sendEventToConversionApi = async (
  siteName,
  eventName,
  userData = {}
) => {
  const userLocationData = (await getLocationData()) || {};
  const userAgent = navigator.userAgent;

  const eventPayload = {
    eventName,
    eventUrl: siteName,
    userData: {
      ...userData,
      city: userLocationData.city || "",
      region: userLocationData.region || "",
      country: userLocationData.country || "",
      zip: userLocationData.zipcode || "",
      ip: userLocationData.ip || "",
      userAgent,
      fbc: fbpCookie || "",
      fbp: fbpCookie || "",
    },
  };

  try {
    const response = await axios.post(
      "https://back.netronic.net/facebook/event",                       
      // "http://localhost:5002/facebook/event",                       
      eventPayload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Facebook event sent successfully:", response.data);
  } catch (error) {
    await axios.post("https://back.netronic.net/telegram/send-error-message", {
      message: `❌ Error sending Facebook event ${window.location.hostname}: ${error}`,
    });
  }
};