import axios from "axios";
import { getLocalStorage } from "../CookieBanner/storageHelper";
import { getName } from "country-list";

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
    const countryName = getName(locationInfo.country);
    const queryLength = Object.keys(routerQuerry).length;
    const query =
        queryLength > 0
            ? {
                  utm_campaign: routerQuerry.utm_campaign || "",
                  utm_medium: routerQuerry.utm_medium || "",
                  utm_source: routerQuerry.utm_source || "direct",
                  utm_term: routerQuerry.utm_term || "",
              }
            : {
                  utm_source: "direct",
              };
    let data: any = {
        siteName: siteDomain,
        orderName: orderName,
        name: values.name || "",
        email: values.email || "",
        phone: values.phone || "",
        lang: lang,
        cookies: storedCookieConsent,
        comment: values.comment,
        query,
        fbpCookie,
        userLocationData: {
            ip: locationInfo.ip,
            zipcode: locationInfo.zipcode,
            state: locationInfo.state,
            country: countryName,
            city: locationInfo.city,
            region: locationInfo.region,
        },
        fields: [
            {
                name: "Страна",
                value: countryName,
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

        let date = new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
        ).toUTCString();
        for (const [key, value] of Object.entries(locationData)) {
            document.cookie = `${key}=${value}; expires="${date}"`;
        }
    }

    return locationData;
}
