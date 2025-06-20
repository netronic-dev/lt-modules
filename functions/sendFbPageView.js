import axios from "axios";
import { fbpCookie, getLocationData } from "./postData";
import { generateUUID } from "./generateUUID";
import getOrCreateExternalId from "./getOrCreateExternalId";

function getFbc() {
  if (typeof window === "undefined") return null;

  const existingFbc = document.cookie
    .split("; ")
    .find((row) => row.startsWith("_fbc="))
    ?.split("=")[1];

  const urlParams = new URLSearchParams(window.location.search);
  const fbclid = urlParams.get("fbclid");

  if (!fbclid) return existingFbc ?? null;

  const existingFbclid = existingFbc?.split(".").at(-1);
  if (!existingFbc || existingFbclid !== fbclid) {
    const newFbc = `fb.1.${Date.now()}.${fbclid}`;
    document.cookie = `_fbc=${newFbc}; path=/; max-age=${90 * 24 * 60 * 60}`;
    return newFbc;
  }

  return existingFbc;
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
  const fbc = getFbc();
  const externalId = getOrCreateExternalId();

  const finalUserData = {
    ...userData,
    external_id: externalId,
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
