import axios from 'axios';

export async function postData(
	values: any,
	url: string,
	orderName: string,
	lang: string,
	siteDomain: string,
	routerQuerry?: any,
	fields?: field[] | [],
) {
	let locationInfo: any = await getLocationData();
	let data: any = {
		siteName: siteDomain,
		orderName: orderName,
		name: values.name || '',
		email: values.email || '',
		phone: values.phone || '',
		lang: lang,
		query: routerQuerry
			? {
					utm_campaign: routerQuerry.utm_campaign || '',
					utm_medium: routerQuerry.utm_medium || '',
					utm_source: routerQuerry.utm_source || '',
					utm_term: routerQuerry.utm_term || '',
			  }
			: {},
		fields: [
			{
				name: 'Страна',
				value: locationInfo.country,
				BXName: 'ADDRESS_COUNTRY',
			},
			{
				name: 'Город',
				value: locationInfo.city,
				BXName: 'ADDRESS_CITY',
			},
			{
				name: 'Регион',
				value: locationInfo.region,
				BXName: 'UF_CRM_1517920515',
			},
			{
				name: 'IP',
				value: locationInfo.ip,
			},
		],
	};
	if (fields) {
		data.fields = [...data.fields, ...fields];
	}
	return await axios.post(url, data, {
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		}
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
	let locationData: locationData | {} = {
		ip: '',
		region: '',
		country: '',
		city: '',
	};
	await axios
		.get(
			'https://api.ipgeolocation.io/ipgeo?apiKey=2e4dabeb35b6489d9348d88276585aee',
		)
		.then((response: any) => {
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
