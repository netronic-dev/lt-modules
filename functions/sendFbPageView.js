import axios from "axios";
import { fbpCookie, getLocationData } from "./postData";

export const sendEventToConversionApi = async (
  siteName,
  eventName,
  userData = {}
) => {
  const userLocationData = await getLocationData();
  const userAgent = navigator.userAgent;

  const eventPayload = {
    eventName: eventName,
    eventUrl: siteName,
    userData: {
      email: userData.email,
      phone: userData.phone,
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
