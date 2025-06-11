import axios from "axios";
import { fbpCookie } from "./postData";
import { getLocationDataFromBackend } from "./getLocationDataFromBackend";
import { generateUUID } from "./generateUUID";

function getFbclid() {
  if (typeof window === "undefined") return null;
  const urlParams = new URLSearchParams(window.location.search);
  const fbclid = urlParams.get("fbclid");
  return fbclid ? `fb.${Math.floor(Date.now() / 1000)}.${fbclid}` : null;
}

export const sendEventToConversionApi = async (
  siteName,
  eventName,
  userData = {},
  eventId
) => {
  const userLocationData = (await getLocationDataFromBackend()) || {};
  const userAgent = navigator.userAgent;
  const finalEventId = eventId || generateUUID(); 

  const eventPayload = {
    eventName,
    eventUrl: siteName,
    eventId: finalEventId,
    userData: {
      ...userData,
      city: userLocationData.city || "",
      region: userLocationData.region || "",
      country: userLocationData.country || "",
      zip: userLocationData.zipcode || "",
      ip: userLocationData.ip || "",
      userAgent,
      fbp: fbpCookie || "",
      fbc: getFbclid() || "",
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

    console.log(
      `✅ Facebook event "${eventName}" sent successfully:`,
      response.data
    );
  } catch (error) {
    await axios.post("https://back.netronic.net/telegram/send-error-message", {
      message: `❌ Error sending Facebook event ${window.location.hostname}: ${error}`,
    });
  }
};
