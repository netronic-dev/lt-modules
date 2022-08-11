import { useFormik } from "formik";
import { useRouter } from "next/router";
import { FunctionComponent, ReactNode } from "react";
import {
	DropDownList,
	InputCall,
	InputEmail,
	InputName,
} from "../../../InputForms/Inputs/Inputs";
import style from "./style.module.scss";
import Agreement from "../../Form/Agreement";

interface FormModalProps {
	thank_you_page_url: string;
	text: string;
	onQuitClick: () => void;
	title: ReactNode;
	agreement__text: ReactNode | string;
	submitButtonID: string;
	buttonText: string;
	dateTitle: string;
	datesData: dropdownInputDataCell[];
	equpmentTypeTitle: string;
	equipmentTypeData: dropdownInputDataCell[];
}
interface dropdownInputDataCell {
	name: string;
}
const FormModal: FunctionComponent<FormModalProps> = (props) => {
	let validate = validation;
	const router = useRouter();

	function onAgreementChange() {
		formik.setFieldValue(
			"isAgreePrivacyPolicy",
			!formik.values.isAgreePrivacyPolicy
		);
	}
	function onDateChange(name: string) {
		formik.setFieldValue("date", name);
	}
	function onEquipmentTypeChange(name: string) {
		formik.setFieldValue("equipmentType", name);
	}

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			phoneNumber: "",
			date: "",
			equipmentType: "",
			isAgreePrivacyPolicy: true,
		},
		validate,
		onSubmit: (values) => {
			setTimeout(() => {
				router.push(props.thank_you_page_url).then(() => router.reload());
			}, 400);
		},
	});

	function onQuitClick() {
		props.onQuitClick();
	}

	return (
		<div className={style.pop_up_form}>
			<div className={style.quit_block} onClick={onQuitClick}></div>
			<div className={`${style.wrapper} fade-up-animation`}>
				<div className={style.quit_button_out}>
					<button className={style.quit_button} onClick={onQuitClick}>
						{borderedCross}
					</button>
				</div>
				<div className={style.title_cell}>
					<h2 className={style.title}>{props.title}</h2>
					<p className={style.text}>{props.text}</p>
				</div>
				<form className={style.form} onSubmit={formik.handleSubmit}>
					<div className={style.inputs_wrapper}>
						<div className={style.cell}>
							<InputName
								onChange={formik.handleChange}
								value={formik.values.name}
								error={formik.errors.name}
								nameFormID="iaapa-popup-"
								theme="rounded"
								noIcons
								errorTheme="rounded_flat"
							/>
							<InputEmail
								onChange={formik.handleChange}
								value={formik.values.email}
								error={formik.errors.email}
								emailFormID="iaapa-popup-"
								theme="rounded"
								noIcons
								errorTheme="rounded_flat"
							/>
							<InputCall
								onChange={formik.handleChange}
								value={formik.values.phoneNumber}
								error={formik.errors.phoneNumber}
								phoneFormID="iaapa-popup-"
								theme="rounded"
								noIcons
								errorTheme="rounded_flat"
							/>
						</div>
						<div className={style.cell}>
							<DropDownList
								onClick={(name: string) => {
									onDateChange(name);
								}}
								id="iaapa-popup-dropdown"
								error={formik.errors.date}
								title={props.dateTitle}
								data={props.datesData}
								value={formik.values.date}
							/>
							<DropDownList
								onClick={(name: string) => {
									onEquipmentTypeChange(name);
								}}
								id="iaapa-popup-dropdown-1"
								error={formik.errors.equipmentType}
								title={props.equpmentTypeTitle}
								data={props.equipmentTypeData}
								value={formik.values.equipmentType}
							/>
							<Agreement
								active={formik.values.isAgreePrivacyPolicy}
								onClick={onAgreementChange}
								text={props.agreement__text}
								error={formik.errors.isAgreePrivacyPolicy}
							/>
						</div>
					</div>
					<div className={style.submit_wrapper}>
						<button
							id={props.submitButtonID}
							type="submit"
							className={style.button_submit}
						>
							{props.buttonText}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default FormModal;
const borderedCross = (
	<svg
		width="80"
		height="35"
		viewBox="0 0 80 35"
		fill="none"
		className={style.bordered_cross}
	>
		<rect x="0.5" y="0.5" width="79" height="34" rx="17" stroke="#8E8E8E" />
		<path
			d="M47 12.41L45.59 11L40 16.59L34.41 11L33 12.41L38.59 18L33 23.59L34.41 25L40 19.41L45.59 25L47 23.59L41.41 18L47 12.41Z"
			fill="white"
		/>
	</svg>
);
export const validation = (values: any) => {
	const errors: any = {};

	if (values.name !== undefined) {
		if (values.name === "") {
			errors.name = "Required";
		}
	}
	if (values.email !== undefined) {
		if (values.email === "") {
			errors.email = "Required";
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
		) {
			errors.email = "Wrong email";
		}
	}
	if (values.phoneNumber !== undefined) {
		if (values.phoneNumber === "") {
			errors.phoneNumber = "Required";
		} else if (
			!/^[\+]?[(]?[0-9]{1,3}[)]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{1,3}[-\s\.]?[0-9]{1,13}$/im.test(
				values.phoneNumber
			)
		) {
			errors.phoneNumber = "Wrong phone number";
		}
	}
	if (values.date !== undefined) {
		if (values.date === "") {
			errors.date = "Required";
		}
	}
	if (values.equipmentType !== undefined) {
		if (values.equipmentType === "") {
			errors.equipmentType = "Required";
		}
	}
	if (values.isAgreePrivacyPolicy !== undefined) {
		if (values.isAgreePrivacyPolicy === false) {
			errors.isAgreePrivacyPolicy = "Required";
		}
	}
	return errors;
};
