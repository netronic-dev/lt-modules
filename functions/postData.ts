import axios from "axios";
import { getName } from "country-list";
import { getCountryCode } from "./getCountryCode";
import { getLocalStorage } from "../CookieBanner/storageHelper";

const getCookieByKey = (key: string) => {
  if (typeof window !== "undefined") {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${key}=`))
      ?.split("=")[1];
  }
};

export const fbpCookie = getCookieByKey("_fbp");

export async function postData(
  values: any,
  url: string,
  orderName: string,
  siteDomain: string,
  fromSite: string,
  routerQuery?: any,
  source?: string
) {
  let locationInfo: any = await getLocationData();
  console.log(locationInfo, 'locationInfo');
  const storedCookieConsent = getLocalStorage("cookie_consent");
  const countryName = getName(locationInfo.country);
  const countryCode = getCountryCode(values.phoneNumber);
  const queryLength = Object.keys(routerQuery).length;
  const query =
    queryLength > 0
      ? {
          utm_campaign: routerQuery.utm_campaign || "",
          utm_medium: routerQuery.utm_medium || "referral",
          utm_source: routerQuery.utm_source || "google",
          utm_term: routerQuery.utm_term || "",
        }
      : {
          utm_source: "google",
          utm_medium: "referral",
        };

  let data: any = {
    fromPage: siteDomain,
    fromSite,
    orderName: orderName,
    name: values.name || "",
    email: values.email || "",
    budget: values.budget || "",
    equipmentType: values.equipmentType || "",
    method: values.method || "",
    typeOfBusiness: values.typeOfBusiness || "",
    website: values.website || "",
    comment: values.comment || "",
    phoneNumber: values.phone ? `+${values.phone}` : values.phoneNumber || "",
    chatPhone: values.chatPhone || "",
    countryCode: countryCode || "",
    query,
    cookies: storedCookieConsent,
    geoInfo: {
      country: values.country ? values.country : countryName,
      city: locationInfo.city,
    },
    source: source || "",
  };
  return await axios.post(url, data);
}

export interface field {
  name: string;
  value: string;
}

export async function getLocationData() {
  let locationData = {
    ip: "",
    city: "",
    region: "",
    country: "",
    zipcode: "",
    state: "",
  };

  let cookieIp = getCookieByKey("ip");

  try {
    const clientIP = await axios.get("https://api.ipify.org/?format=json");

    if (clientIP.data.ip === cookieIp) {
      locationData = {
        ip: getCookieByKey("ip") || "",
        city: getCookieByKey("city") || "",
        region: getCookieByKey("region") || "",
        country: getCookieByKey("country") || "",
        zipcode: getCookieByKey("zipcode") || "",
        state: getCookieByKey("state") || "",
      };
    } else {
      try {
        const response = await axios.get(
          "https://ipinfo.io/json?token=ee40c07fb51963"
        );
        locationData = {
          ip: response.data.ip,
          city: response.data.city,
          region: response.data.region,
          country: response.data.country,
          zipcode: response.data.postal,
          state: response.data.region,
        };
      } catch (error) {
        console.log("First ipinfo.io request failed, trying fallback token");
        await axios.post(
          "https://back.netronic.net/telegram/send-error-message",
          {
            message: `frontend error: postData ❌ ${window.location.hostname}: First ipinfo.io request failed, trying fallback token,
            ${error}`,
          }
        );
        try {
          const fallbackResponse = await axios.get(
            "https://ipinfo.io/json?token=eba5da567f5208"
          );
          locationData = {
            ip: fallbackResponse.data.ip,
            city: fallbackResponse.data.city,
            region: fallbackResponse.data.region,
            country: fallbackResponse.data.country,
            zipcode: fallbackResponse.data.postal,
            state: fallbackResponse.data.region,
          };
        } catch (fallbackError) {
          console.error(
            "Error fetching location data from fallback ipinfo.io",
            fallbackError
          );
          await axios.post(
            "https://back.netronic.net/telegram/send-error-message",
            {
              message: `frontend error: postData ❌ ${window.location.hostname}: Error fetching location data from fallback ipinfo.io,
            ${fallbackError}`,
            }
          );
        }
      }

      let date = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
      for (const [key, value] of Object.entries(locationData)) {
        document.cookie = `${key}=${value}; expires="${date}"`;
      }
    }
  } catch (initialError) {
    console.error("Error fetching IP address from ipify", initialError);
  }

  return locationData;
}
