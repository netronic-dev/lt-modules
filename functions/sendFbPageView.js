import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { fbpCookie } from "./postData";
import { getLocationDataFromBackend } from "./getLocationDataFromBackend";

export const sendEventToConversionApi = async (
  siteName,
  eventName,
  userData = {}
) => {
  const userLocationData = (await getLocationDataFromBackend()) || {};
  const userAgent = navigator.userAgent;
  const eventId = uuidv4();

  const eventPayload = {
    eventName,
    eventUrl: siteName,
    eventId,
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
