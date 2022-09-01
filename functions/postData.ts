import axios, { AxiosResponse } from "axios";

export async function postData(
	values: any,
	url: string,
	orderName: string,
	lang: string,
	siteDomain: string,
	routerQuerry: any,
	fields?: field[]
) {
	let data = {
		siteName: siteDomain,
		orderName: orderName,
		name: values.name || "",
		email: values.email || "",
		phone: values.phone || "",
		lang: lang,
		query: {
			utm_campaign: routerQuerry.utm_campaign || "",
			utm_medium: routerQuerry.utm_medium || "",
			utm_source: routerQuerry.utm_source || "",
			utm_term: routerQuerry.utm_term || "",
		},
		fields: fields,
	};
	let locationData: locationData | {} = {};

	axios.get("https://ipapi.co/json/").then((response: any) => {
		locationData = {
			ip: response.ip,
			region: response.region,
			country_name: response.country_name,
			timezone: response.timezone,
			utc_offset: response.utc_offset,
			currency: response.currency,
			currency_name: response.currency_name,
		};
	});
	console.log(locationData);
	axios.post(url, data);
}

export interface field {
	name: string;
	value: string;
	BXName?: string;
}
interface locationData {
	ip: AxiosResponse<any>;
	region: AxiosResponse<any>;
	country_name: AxiosResponse<any>;
	timezone: AxiosResponse<any>;
	utc_offset: AxiosResponse<any>;
	currency: AxiosResponse<any>;
	currency_name: AxiosResponse<any>;
}
