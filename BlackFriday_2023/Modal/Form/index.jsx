import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import ReactGA from 'react-ga4';
import { validate } from './validate';

import style from './style.module.scss';

import Agreement from './Agreement';
import Input from './Inputs';
import { postData } from '../../../functions/postData';
import { useModals } from '../../../../context/ModalsProvider';

const ConsultationForm = (props) => {
	const [valid, setValid] = useState(null);
	const [phone, setPhone] = useState(null);
	const [regionCode, setRegionCode] = useState();
	const router = useRouter();
	const modal = useModals();

	const formik = useFormik({
		initialValues: {
			name: '',
			phone: false,
			email: '',
			agreement: true,
		},
		validate,
		onSubmit: (values) => {
			modal?.setUserName(values.name);
			const data = {
				...values,
				phone: `+${phone}`,
			};
			postData(data, props.destinationURL, props.orderName, props.lang, window.location.hostname, router.query)
				.then(modal?.closeModal())
				.then(
					ReactGA.event('generate_lead', {
						event_category: 'button',
						event_label: 'generate_lead',
					}),
				)
				.then(router.push(props.thank_you_page));
		},
	});

	const handleAgreementChange = () => {
		formik.setFieldValue('agreement', !formik.values.agreement);
	};

	const checkDisabled = () => {
		for (var key in formik.errors) {
			if (formik.errors.hasOwnProperty(key)) {
				return true;
			}
		}
		return false;
	};

	useEffect(() => {
		modal?.region ? setRegionCode(modal?.region.toLowerCase()) : setRegionCode('us');
	}, [modal.region]);

	return (
		<div
			className={`${style.form__block} ${
				props.isModal ? style.form__block_modal : props.inView ? style.animation_ltr : ''
			}`}>
			<div>
				{props.title ? <h3 className={style.form__title}>{props.title}</h3> : null}
				{props.text ? <h3 className={style.form__text}>{props.text}</h3> : null}
			</div>
			<form
				onSubmit={formik.handleSubmit}
				className={style.form}>
				<Input
					error={formik.errors.name}
					onChange={formik.handleChange}
					type={props.textType}
					value={formik.values.name}
					placeholder={props.namePlaceholder}
					name='name'
				/>
				<div className={style.phone__input_block}>
					<PhoneInput
						containerClass='modal_input__phone_container'
						inputClass={valid ? 'input__phone' : 'input__phone_error'}
						buttonClass={valid ? 'drop_down' : 'drop_down_error'}
						country={regionCode}
						enableSearch
						placeholder={props.phonePlaceholder}
						onChange={(value, country, e, formattedValue) => {
							const { format, dialCode } = country;
							setPhone(value);
							if (
								format?.length === formattedValue?.length &&
								(value.startsWith(dialCode) || dialCode.startsWith(value))
							) {
								formik.setFieldValue('phone', true);
								setValid(true);
							} else {
								formik.setFieldValue('phone', false);
								setValid(false);
							}
						}}
						isValid
					/>
					{!valid && <span className={style.error__message}>Invalid phone number</span>}
				</div>
				<Input
					error={formik.errors.email}
					onChange={formik.handleChange}
					type={props.emailType}
					value={formik.values.email}
					placeholder={props.emailPlaceholder}
					name='email'
				/>
				<Agreement
					isModal={props.isModal}
					agreement={formik.values.agreement}
					agreementText={props.agreementText}
					error={formik.errors.agreement}
					onChange={formik.handleChange}
					onClick={handleAgreementChange}
				/>
				<button
					className={style.submit__button}
					type='submit'
					disabled={checkDisabled()}>
					{props.btnText}
				</button>
			</form>
		</div>
	);
};

export default ConsultationForm;
