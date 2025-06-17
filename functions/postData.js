import axios from "axios";
import { getName } from "country-list";
import { getCountryCode } from "./getCountryCode";
import { getLocalStorage } from "../CookieBanner/storageHelper";
import { getLocationDataFromBackend } from "./getLocationDataFromBackend";

// const getCookieByKey = (key: string) => {
const getCookieByKey = (key) => {
  if (typeof window !== "undefined") {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${key}=`))
      ?.split("=")[1];
  }
};

export const fbpCookie = getCookieByKey("_fbp");

export async function postData(
  // values: any,
  // url: string,
  // orderName: string,
  // siteDomain: string,
  // fromSite: string,
  // routerQuery?: any,
  // source?: string
  values,
  url,
  orderName,
  siteDomain,
  fromSite,
  routerQuery,
  source,
) {
  // let locationInfo: any = await getLocationDataFromBackend();
  let locationInfo = await getLocationData();
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

  // let data: any = {
  let data = {
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

// export interface field {
//   name: string;
//   value: string;
// }

// export async function getLocationData() {
//   let locationData = {
//     ip: "",
//     city: "",
//     region: "",
//     country: "",
//     zipcode: "",
//     state: "",
//   };
//   let cookieIp = getCookieByKey("ip");

//   const clientIP = await axios.get("https://api.ipify.org/?format=json");
//   if (clientIP.data.ip === cookieIp) {
//     locationData = {
//       ip: getCookieByKey("ip"),
//       city: getCookieByKey("city"),
//       region: getCookieByKey("region"),
//       country: getCookieByKey("country"),
//       zipcode: getCookieByKey("zipcode"),
//       state: getCookieByKey("state"),
//     };
//   } else {
//     await axios
//       .get("https://ipinfo.io/json?token=ee40c07fb51963")
//       .then((response) => {
//         locationData = {
//           ip: response.data.ip,
//           city: response.data.city,
//           region: response.data.country,
//           country: response.data.country,
//           zipcode: response.data.postal,
//           state: response.data.region,
//         };
//       })
//       .catch(async (error) => {
//         await axios
//           .get("https://ipinfo.io/json?token=eba5da567f5208")
//           .then((response) => {
//             locationData = {
//               ip: response.data.ip,
//               city: response.data.city,
//               region: response.data.country,
//               country: response.data.country,
//               zipcode: response.data.postal,
//               state: response.data.region,
//             };
//           })
//           .catch(console.log);
//       });

//     let date = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
//     date = date.toUTCString();
//     Object.keys(locationData).forEach((key) => {
//       document.cookie = `${key}=${locationData[key]}; expires=" + ${date}`;
//     });
//   }

//   return locationData;
// }

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
      ip: getCookieByKey("ip"),
      city: getCookieByKey("city"),
      region: getCookieByKey("region"),
      country: getCookieByKey("country"),
      zipcode: getCookieByKey("zipcode"),
      state: getCookieByKey("state"),
    };
  } else {
    try {
      const response = await axios.get(
        "https://ipinfo.io/json?token=ee40c07fb51963"
      );
      locationData = {
        ip: response.data.ip,
        city: response.data.city,
        region: response.data.country,
        country: response.data.country,
        zipcode: response.data.postal,
        state: response.data.region,
      };
    } catch (err1) {
      try {
        const response = await axios.get(
          "https://ipinfo.io/json?token=eba5da567f5208"
        );
        locationData = {
          ip: response.data.ip,
          city: response.data.city,
          region: response.data.country,
          country: response.data.country,
          zipcode: response.data.postal,
          state: response.data.region,
        };
      } catch (err2) {
        try {
          const response = await axios.get("https://ipwho.is/");
          if (response.data.success !== false) {
            locationData = {
              ip: response.data.ip || "",
              city: response.data.city || "",
              region: response.data.region || "",
              country: response.data.country_code || "",
              zipcode: response.data.postal || "",
              state: response.data.region || "",
            };
          }
        } catch (err3) {
          console.warn("All geolocation services failed:", err3.message);
        }
      }
    }

    // Set cookies for 30 days
    let date = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
    Object.keys(locationData).forEach((key) => {
      document.cookie = `${key}=${locationData[key]}; expires=${date}; path=/`;
    });
  }

  return locationData;
}