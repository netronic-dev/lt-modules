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
	let locationInfo: any = await getLocationData();

	return await axios.post(url, {
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
		fields: [
			{
				name: "Страна",
				value: locationInfo.country,
				BXName: "ADDRESS_COUNTRY",
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
	});
}

export interface field {
	name: string;
	value: string;
	BXName?: string;
}
interface locationData {
	ip: string;
	region: string;
	country: string;
}

async function getLocationData() {
	let locationData: locationData | {} = {};
	await axios
		.get(
			"https://ipgeolocation.abstractapi.com/v1/?api_key=e2d2ea1613cd480b88aadaa79bc71675"
		)
		.then((response: any) => {
			locationData = {
				ip: response.data.ip_address,
				region: response.data.region,
				country: response.data.country,
			};
		});
	return locationData;
}
