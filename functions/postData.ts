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
          gclid: routerQuery.gclid || "",
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
    companyName: values.companyName || "",
    query,
    cookies: storedCookieConsent,
    geoInfo: {
      country: values.country ? values.country : countryName,
      city: locationInfo.city,
    },
    source: source || "",
    language: "Англійська",
    chatId: values.chatId || "",
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
    await axios
      .get("https://ipinfo.io/json?token=ee40c07fb51963")
      .then((response) => {
        locationData = {
          ip: response.data.ip,
          city: response.data.city,
          region: response.data.country,
          country: response.data.country,
          zipcode: response.data.postal,
          state: response.data.region,
        };
      })
      .catch(async (error) => {
        await axios
          .get("https://ipinfo.io/json?token=eba5da567f5208")
          .then((response) => {
            locationData = {
              ip: response.data.ip,
              city: response.data.city,
              region: response.data.country,
              country: response.data.country,
              zipcode: response.data.postal,
              state: response.data.region,
            };
          })
          .catch(console.log);
      });

    let date = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
    for (const [key, value] of Object.entries(locationData)) {
      document.cookie = `${key}=${value}; expires="${date}"`;
    }
  }

  return locationData;
}
