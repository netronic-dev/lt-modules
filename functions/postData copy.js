import axios from "axios";
import { getLocalStorage } from "../CookieBanner/storageHelper";

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
        query: routerQuerry
            ? {
                  utm_campaign: routerQuerry.utm_campaign || "",
                  utm_medium: routerQuerry.utm_medium || "",
                  utm_source: routerQuerry.utm_source || "direct",
                  utm_term: routerQuerry.utm_term || "",
              }
            : { utm_source: "direct" },
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

// async function getLocationData() {
//     let locationData: locationData | {} = {
//         ip: '',
//         region: '',
//         country: '',
//     };
//     await axios
//         .get(
//             'https://ipgeolocation.abstractapi.com/v1/?api_key=e2d2ea1613cd480b88aadaa79bc71675'
//         )
//         .then((response: any) => {
//             locationData = {
//                 ip: response.data.ip_address,
//                 region: response.data.region,
//                 country: response.data.country,
//             };
//         })
//         .catch((error) => {
//             console.log(error);
//         });
//     return locationData;
// }

async function getLocationData() {
    let locationData = {
        ip: "",
        region: "",
        country: "",
        city: "",
    };
    await axios
        .get(
            "https://api.ipgeolocation.io/ipgeo?apiKey=2e4dabeb35b6489d9348d88276585aee"
        )
        .then((response) => {
            locationData = {
                ip: response.data.ip,
                city: response.data.city,
                region: response.data.state_prov,
                country: response.data.country_name,
            };
        })
        .catch((error) => {
            console.log(error);
        });
    return locationData;
}
