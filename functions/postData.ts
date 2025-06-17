import axios from "axios";
import { getName } from "country-list";
import { getCountryCode } from "./getCountryCode";
import { getLocalStorage } from "../CookieBanner/storageHelper";
import { getLocationDataFromBackend } from "./getLocationDataFromBackend";
import { ref } from "yup";

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
  let locationInfo: any = await getLocationDataFromBackend();
  const storedCookieConsent = getLocalStorage("cookie_consent");
  const countryName = getName(locationInfo.country);
  const countryCode = getCountryCode(values.phoneNumber);

  let referrer = "";
  if (typeof window !== "undefined") {
    referrer = localStorage.getItem("referrer") || "";
  }

  console.log(referrer, "referrer");

  const query = {
    utm_campaign: routerQuery.utm_campaign || "",
    utm_medium: routerQuery.utm_medium || "",
    utm_source: routerQuery.utm_source || "",
    utm_term: routerQuery.utm_term || "",
    gclid: routerQuery.gclid || "",
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
    // referrer,
    language: "Англійська",
    chatId: values.chatId || "",
  };
  return await axios.post(url, data);
}

export interface field {
  name: string;
  value: string;
}
