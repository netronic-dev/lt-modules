import axios from "axios";
import { fbpCookie, getLocationData } from "./postData";
// import { getLocationDataFromBackend } from "./getLocationDataFromBackend";
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
  // const userLocationData = (await getLocationDataFromBackend()) || {};
  const userLocationData = (await getLocationData()) || {};
  const userAgent = navigator.userAgent;
  const finalEventId = eventId || generateUUID();
  const fbclid = getFbclid();

  const finalUserData = {
    ...userData,
    city: userLocationData.city || "",
    region: userLocationData.region || "",
    country: userLocationData.country || "",
    zip: userLocationData.zipcode || "",
    ip: userLocationData.ip || "",
    userAgent,
    ...(fbpCookie && { fbp: fbpCookie }),
    ...(fbclid && { fbc: fbclid }),
  };

  const eventPayload = {
    eventName,
    eventUrl: siteName,
    eventId: finalEventId,
    userData: finalUserData,
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
