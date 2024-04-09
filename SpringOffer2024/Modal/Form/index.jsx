import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReactGA from "react-ga4";
import Dropdown from "react-dropdown";

import style from "./style.module.scss";

import Agreement from "./Agreement";
import Input from "./Inputs";
import { postData } from "../../../functions/postData";
import { useModals } from "../../../../context/ModalsProvider";

const ConsultationForm = (props) => {
    const [valid, setValid] = useState(null);
    const [phone, setPhone] = useState(null);
    const [regionCode, setRegionCode] = useState();
    const [contactMethod, setContactMethod] = useState(null);
    const [comment, setComment] = useState(null);
    const router = useRouter();
    const modal = useModals();

    const setErrorText = () => {
        const errorMessages = {};
        switch (true) {
            case props.lang === "de":
                errorMessages.required = "Erforderlich";
                errorMessages.email = "Ungültige E-Mail-Adresse";
                errorMessages.nameLength =
                    "Der Name muss mindestens 2 Zeichen lang sein";
                return errorMessages;
            case props.lang === "fr":
                errorMessages.required = "Requis";
                errorMessages.email = "Adresse e-mail invalide";
                errorMessages.nameLength =
                    "El nombre debe tener al menos 2 caracteres.";
                return errorMessages;
            case props.lang === "es":
                errorMessages.required = "Necesariamente";
                errorMessages.email =
                    "Dirección de correo electrónico no válida";
                errorMessages.nameLength =
                    "El nombre debe tener al menos 2 caracteres.";
                return errorMessages;
            case props.lang === "it":
                errorMessages.required = "Obbligatorio";
                errorMessages.email = "indirizzo email non valido";
                errorMessages.nameLength =
                    "Il nome deve contenere almeno 2 caratteri.";
                return errorMessages;
            case props.lang === "us":
                errorMessages.required = "Required";
                errorMessages.email = "Invalid email address";
                errorMessages.nameLength =
                    "The name must have at least 2 characters";
                return errorMessages;
            default:
                errorMessages.required = "Required";
                errorMessages.email = "Invalid email address";
                errorMessages.nameLength =
                    "The name must have at least 2 characters";
                return errorMessages;
        }
    };

    const validate = (values) => {
        const errors = {};

        const errorMessages = setErrorText();

        if (!values.name) {
            errors.name = errorMessages.required;
        } else if (values.name.length < 2) {
            errors.name = errorMessages.nameLength;
        }

        if (!values.phone) {
            errors.phone = errorMessages.required;
        }

        if (!values.email) {
            errors.email = errorMessages.required;
        } else if (
            !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(
                values.email
            )
        ) {
            errors.email = errorMessages.email;
        }

        if (!values.agreement) {
            errors.agreement = errorMessages.required;
        }

        if (!values.contactMethod)
            errors.contactMethod = errorMessages.required;
        return errors;
    };

    const contactMethodValues =
        props.lang === "de"
            ? ["Telefon  / E-Mail", "WhatsApp  / E-Mail"]
            : props.lang === "fr"
            ? ["téléphone  / E-mail", "WhatsApp  / E-mail"]
            : props.lang === "it"
            ? ["telefono  / E-mail", "WhatsApp  / E-mail"]
            : props.lang === "es"
            ? [
                  "teléfono  / correo electrónico",
                  "WhatsApp  / correo electrónico",
              ]
            : ["phone / e-mail", "whatsapp / e-mail"];
    const defaultContactMethodOption = contactMethod;

    const onSelectContactMethod = (option) => {
        setContactMethod(option.value);
        formik.setFieldValue("contactMethod", option.value);
    };

    const onChangeComment = (e) => {
        setComment(e.target.value);
        formik.setFieldValue("comment", e.target.value);
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            phone: false,
            email: "",
            agreement: true,
            contactMethod: "",
            // comment: "",
        },
        validate,
        onSubmit: (values) => {
            modal?.setUserName(values.name);
            const data = {
                ...values,
                phone: `+${phone}`,
            };
            postData(
                data,
                props.destinationURL,
                props.orderName,
                props.lang,
                window.location.href,
                router.query
            )
                .then(modal?.closeModal())
                .then(
                    ReactGA.event("generate_lead", {
                        event_category: "button",
                        event_label: "generate_lead",
                    })
                )
                .then(router.push(props.thank_you_page));
        },
    });

    const handleAgreementChange = () => {
        formik.setFieldValue("agreement", !formik.values.agreement);
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
        modal?.region
            ? setRegionCode(modal?.region.toLowerCase())
            : setRegionCode("us");
    }, [modal.region]);

    return (
        <div
            className={`${style.form__block} ${
                props.isModal
                    ? style.form__block_modal
                    : props.inView
                    ? style.animation_ltr
                    : ""
            }`}
        >
            <div>
                {props.title ? (
                    <h3 className={style.form__title}>{props.title}</h3>
                ) : null}
                {props.text ? (
                    <h3 className={style.form__text}>{props.text}</h3>
                ) : null}
            </div>
            <form onSubmit={formik.handleSubmit} className={style.form}>
                <div className={style.grid}>
                    <div className={style.grid_cell}>
                        <Input
                            error={formik.errors.name}
                            onChange={formik.handleChange}
                            type={props.textType}
                            value={formik.values.name}
                            placeholder={props.namePlaceholder}
                            name="name"
                        />
                        <div className={style.phone__input_block}>
                            <PhoneInput
                                containerClass="modal_input__phone_container"
                                inputClass={
                                    valid
                                        ? "input__phone"
                                        : "input__phone_error"
                                }
                                buttonClass={
                                    valid ? "drop_down" : "drop_down_error"
                                }
                                country={regionCode}
                                enableSearch
                                excludeCountries={["ru"]}
                                autoFormat={false}
                                placeholder={props.phonePlaceholder}
                                onChange={(
                                    value,
                                    country,
                                    e,
                                    formattedValue
                                ) => {
                                    const { format, dialCode } = country;
                                    setPhone(value);
                                    if (value.length > 5 && value.length < 20) {
                                        formik.setFieldValue("phone", true);
                                        setValid(true);
                                    } else {
                                        formik.setFieldValue("phone", false);
                                        setValid(false);
                                    }
                                }}
                            />
                            {!valid && (
                                <span className={style.error__message}>
                                    {props.errorPhoneText}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className={style.grid_cell}>
                        <Input
                            error={formik.errors.email}
                            onChange={formik.handleChange}
                            type={props.emailType}
                            value={formik.values.email}
                            placeholder={props.emailPlaceholder}
                            name="email"
                        />
                        <div className={style.input_block_out}>
                            <Dropdown
                                className={`Dropdown-white_form  ${
                                    formik.errors.contactMethod
                                        ? "Dropdown-error"
                                        : ""
                                }`}
                                options={contactMethodValues}
                                onChange={onSelectContactMethod}
                                value={defaultContactMethodOption}
                                placeholder={props.contactMethodPlaceholder}
                            />
                            {formik.errors.contactMethod && (
                                <span className={style.error}>
                                    {formik.errors.contactMethod}
                                </span>
                            )}
                        </div>
                        {/* <div className={style.input_block_out}>
                            <Input
                                onChange={onChangeComment}
                                type="text"
                                value={formik.values.comment}
                                placeholder={props.commentPlaceholder}
                                name="comment"
                            />
                        </div> */}
                    </div>
                </div>
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
                    type="submit"
                    disabled={checkDisabled()}
                >
                    {props.btnText}
                </button>
            </form>
        </div>
    );
};

export default ConsultationForm;
