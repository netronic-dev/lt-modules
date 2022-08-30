import axios from "axios";

export function postData(
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
	axios.post(url, data);
}

export interface field {
	name: string;
	value: string;
	BXName?: string;
}
