import axios from "axios";

export async function postData(
	values: any,
	url: string,
	orderName: string,
	lang: string,
	siteDomain: string,
	routerQuerry: any,
	fields?: field[]
) {
	let locationInfo: any = getLocationData();
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
		ip: locationInfo.ip,
		fields: [
			{
				name: "Страна",
				value: locationInfo.country_name,
				BXName: "ADDRESS_COUNTRY ",
			},
			{
				name: "Страна",
				value: locationInfo.region,
				BXName: "ADDRESS_CITY",
			},
			{
				name: "IP",
				value: locationInfo.ip,
			},
			fields,
		],
	};
	axios.post(url, data);
}

export interface field {
	name: string;
	value: string;
	BXName?: string;
}
interface locationData {
	ip: string;
	region: string;
	country_name: string;
}

function getLocationData() {
	let locationData: locationData | {} = {};
	axios.get("https://ipapi.co/json/").then((response: any) => {
		locationData = {
			ip: response.ip,
			region: response.region,
			country_name: response.country_name,
		};
	});
	return locationData;
}
