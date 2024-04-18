import axios from "axios";
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
    lang: string,
    siteDomain: string,
    routerQuerry?: any,
    fields?: field[] | []
) {
    console.log("first");
    let locationInfo: locationData = await getLocationData();
    const storedCookieConsent = getLocalStorage("cookie_consent", null);

    let data: any = {
        siteName: siteDomain,
        orderName: orderName,
        name: values.name || "",
        email: values.email || "",
        phone: values.phone || "",
        lang: lang,
        cookies: storedCookieConsent,
        comment: values.comment,
        query: routerQuerry
            ? {
                  utm_campaign: routerQuerry.utm_campaign || "",
                  utm_medium: routerQuerry.utm_medium || "",
                  utm_source: routerQuerry.utm_source || "direct",
                  utm_term: routerQuerry.utm_term || "",
              }
            : { utm_source: "direct" },
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
            {
                name: "Бюджет клиента",
                value: values.budget,
                BXName: "UF_CRM_1706884779219",
            },
            {
                name: "Предпочтительный способ коммуникации",
                value: values.contactMethod,
                BXName: "UF_CRM_1706884832536",
            },
            {
                name: "Бизнес",
                value: values.planToUse,
                BXName: "UF_CRM_1706885168137",
            },
        ],
    };
    if (fields) {
        data.fields = [...data.fields, ...fields];
    }
    return await axios.post(url, data);
}

export interface field {
    name: string;
    value: string;
    BXName?: string;
}
interface locationData {
    ip: string;
    region: string;
    city: string;
    country: string;
    zipcode: string;
    state: string;
}

// export async function getLocationData() {
//     let locationData = {
//         ip: "",
//         city: "",
//         region: "",
//         country: "",
//         zipcode: "",
//         state: "",
//     };
//     await axios
//         .get(
//             "https://api.ipgeolocation.io/ipgeo?apiKey=2e4dabeb35b6489d9348d88276585aee"
//         )
//         .then((response) => {
//             locationData = {
//                 ip: response.data.ip,
//                 city: response.data.city,
//                 region: response.data.country_code2,
//                 country: response.data.country_name,
//                 zipcode: response.data.zipcode,
//                 state: response.data.state_prov,
//             };
//         })
//         .catch((error) => {
//             console.log(error);
//         });
//     return locationData;
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
            .catch((error) => {
                console.log(error);
            });

        let date = new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
        ).toUTCString();
        for (const [key, value] of Object.entries(locationData)) {
            document.cookie = `${key}=${value}; expires="${date}"`;
        }
    }

    return locationData;
}
