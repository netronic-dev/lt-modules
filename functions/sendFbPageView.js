import axios from "axios";
import { fbpCookie, getLocationData } from "./postData";
import { generateUUID } from "./generateUUID";

function getFbclid() {
  if (typeof window === "undefined") return null;

  const fbcCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("fbc="))
    ?.split("=")[1];

  if (fbcCookie) {
    return fbcCookie;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const fbclid = urlParams.get("fbclid");

  if (fbclid) {
    const fbc = `fb.1.${Math.floor(Date.now() / 1000)}.${fbclid}`;

    document.cookie = `fbc=${fbc}; path=/; max-age=${90 * 24 * 60 * 60}`;

    return fbc;
  }

  return null;
}

export const sendEventToConversionApi = async (
  siteName,
  eventName,
  userData = {},
  eventId
) => {
  const userLocationData = (await getLocationData()) || {};
  const userAgent = navigator.userAgent;
  const finalEventId = eventId || generateUUID();
  const fbc = getFbclid();

  const finalUserData = {
    ...userData,
    city: userLocationData.city || "",
    region: userLocationData.region || "",
    country: userLocationData.country || "",
    zip: userLocationData.zipcode || "",
    ip: userLocationData.ip || "",
    userAgent,
    ...(fbpCookie && { fbp: fbpCookie }),
    ...(fbc && { fbc }),
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
