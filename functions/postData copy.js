import axios from "axios";
import { getLocalStorage } from "../CookieBanner/storageHelper";

export const fbpCookie = document.cookie
  .split("; ")
  .find((row) => row.startsWith("_fbp="))
  ?.split("=")[1];

export async function postData(
  values,
  url,
  orderName,
  lang,
  siteDomain,
  routerQuerry,
  fields
) {
  let locationInfo = await getLocationData();
  console.log(locationInfo, "locationInfo");
  const storedCookieConsent = getLocalStorage("cookie_consent", null);

  let data = {
    siteName: siteDomain,
    orderName: orderName,
    name: values.name || "",
    email: values.email || "",
    phone: values.phone || "",
    lang: lang,
    cookies: storedCookieConsent,
    comment: values.comment,
    query: {
      utm_campaign: routerQuerry.utm_campaign || "",
      utm_medium: routerQuerry.utm_medium || "",
      utm_source: routerQuerry.utm_source || "",
      utm_term: routerQuerry.utm_term || "",
      gclid: routerQuerry.gclid || "",
    },
    fbpCookie,
    userLocationData: {
      ip: locationInfo.ip,
      zipcode: locationInfo.zipcode,
      state: locationInfo.state,
      country: locationInfo.country,
      city: locationInfo.city,
      region: locationInfo.region,
    },
    fields: [
      {
        name: "Страна",
        value: locationInfo.country,
        BXName: "ADDRESS_COUNTRY",
      },
      {
        name: "Город",
        value: locationInfo.city,
        BXName: "ADDRESS_CITY",
      },
      {
        name: "Регион",
        value: locationInfo.region,
        BXName: "UF_CRM_1517920515",
      },
      {
        name: "IP",
        value: locationInfo.ip,
      },
    ],
  };
  if (fields) {
    data.fields = [...data.fields, ...fields];
  }
  return await axios.post(url, data);
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
  await axios
    .get(
      "https://api.ipgeolocation.io/ipgeo?apiKey=2e4dabeb35b6489d9348d88276585aee"
    )
    .then((response) => {
      locationData = {
        ip: response.data.ip,
        city: response.data.city,
        region: response.data.country_code2,
        country: response.data.country_name,
        zipcode: response.data.zipcode,
        state: response.data.state_prov,
      };
    })
    .catch(async (error) => {
      await axios.post(
        "https://back.netronic.net/telegram/send-error-message",
        {
          message: `frontend error: postData ❌ ${window.location.hostname}: ${error}`,
        }
      );
    });
  return locationData;
}
