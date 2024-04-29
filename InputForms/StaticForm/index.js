import { useFormik } from "formik";
import style from "../forms.module.scss";
import { useRouter } from "next/router";
import { InputName, InputCall, InputEmail } from "../Inputs/Inputs";
import { postData } from "../../functions/postData.ts";
import { useValidation } from "../../../context/ValidationProvider";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../../store/actions/userData";
import ReactGA from "react-ga4";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useEffect, useState } from "react";
import { useModals } from "../../../context/ModalsProvider.js";
import { phoneMasks } from "../../../Data/phoneMasks.js";
import axios from "axios";
import Dropdown from "react-dropdown";
import ReactPixel from "react-facebook-pixel";
import { searchParams } from "../../../store/searchParamsSlice.js";
const buttonTheme = {
    general: style.general_button_inactive,
    black: style.button_black_inactive,
    bigBlack: style.button_big_black_inactive,
};

const buttonActiveTheme = {
    general: style.general_button_active,
    white: style.button_white_active,
    black: style.button_black_active,
    bigBlack: style.button_big_black_active,
};
const themeFormTheme = {
    general: style.theme_form,
    mobile: style.theme_form_mobile,
};

export function ThemeForm(props) {
    const [valid, setValid] = useState(null);
    const [phone, setPhone] = useState(null);
    const [regionCode, setRegionCode] = useState();
    const [budgetRange, setBudgetRange] = useState(null);
    const [contactMethod, setContactMethod] = useState(null);
    const [planToUse, setPlanToUse] = useState(null);
    const [comment, setComment] = useState(null);
    // const validate = useValidation();
    const router = useRouter();
    const dispatch = useDispatch();
    const modal = useModals();
    const queryParams = useSelector(searchParams);

    const budgetRangeValues = [
        "$10,000 - $25,000",
        "$25,000 - $50,000",
        "more than $50,000",
    ];
    const defaultBudgetRangeOption = budgetRange;

    const contactMethodValues = ["phone / e-mail", "whatsapp / e-mail"];
    const defaultContactMethodOption = contactMethod;

    const planToUseValues = [
        "for an existing business",
        "to start a new business",
    ];
    const defaultPlanToUseOption = planToUse;

    const onSelectBudgetRange = (option) => {
        setBudgetRange(option.value);
        formik.setFieldValue("budget", option.value);
    };
    const onSelectContactMethod = (option) => {
        setContactMethod(option.value);
        formik.setFieldValue("contactMethod", option.value);
    };
    const onSelectPlanToUse = (option) => {
        setPlanToUse(option.value);
        formik.setFieldValue("planToUse", option.value);
    };
    const onChangeComment = (e) => {
        setComment(e.target.value);
        formik.setFieldValue("comment", e.target.value);
    };

    const validate = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = "Required";
        } else if (values.name.length < 2) {
            errors.name = "The name must have at least 2 characters";
        }

        if (!values.phone) {
            errors.phone = "Required";
        }

        if (!values.email) {
            errors.email = "Required";
        } else if (
            !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(
                values.email
            )
        ) {
            errors.email = "Invalid email address";
        }

        if (!values.contactMethod) errors.contactMethod = "Required";
        // if (!values.budget) errors.budget = "Required";

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: false,
            contactMethod: "",
            // planToUse: "",
            // budget: "",
            // comment: "",
        },
        validate,
        onSubmit: (values) => {
            dispatch(setUserData(values.name));
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
                queryParams || router.query
            )
                .then(() => {
                    formik.resetForm();
                    ReactGA.event("generate_lead", {
                        category: "form",
                        action: "submit",
                    });
                    ReactPixel.track("Lead");
                })
                .then(router.push("/thanks-pres"))
                .catch(console.log);
        },
    });

    useEffect(() => {
        modal?.region
            ? setRegionCode(modal?.region.toLowerCase())
            : setRegionCode("us");
    }, [modal.region]);

    return (
        <form
            onSubmit={formik.handleSubmit}
            className={
                themeFormTheme[props.formTheme ? props.formTheme : "general"]
            }
        >
            <div className={style.inputs}>
                <div className={style.inputs_cell}>
                    <InputName
                        noIcons
                        theme={props.theme}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        error={formik.errors.name}
                        placeholder={props.namePlaceholder}
                    />
                    <InputEmail
                        noIcons
                        theme={props.theme}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={formik.errors.email}
                    />

                    {/* <div className={style.input_block_out}>
                        <Dropdown
                            className={`Dropdown-blue_form  ${
                                formik.errors.budget ? "Dropdown-error" : ""
                            }`}
                            options={budgetRangeValues}
                            onChange={onSelectBudgetRange}
                            value={defaultBudgetRangeOption}
                            placeholder={props.budgetPlaceholder}
                        />
                        {formik.errors.budget && (
                            <span className={style.error}>
                                {formik.errors.budget}
                            </span>
                        )}
                    </div> */}
                </div>
                <div className={style.inputs_cell}>
                    <div
                        className={`${style.phone__input_block} ${
                            formik.errors.phone
                                ? "phone__input__error__business"
                                : ""
                        }`}
                    >
                        <PhoneInput
                            containerClass="business_input__phone_container"
                            inputClass={
                                valid ? "input__phone" : "input__phone_error"
                            }
                            buttonClass={
                                valid ? "drop_down" : "drop_down_error"
                            }
                            country={regionCode}
                            enableSearch
                            excludeCountries={["ru"]}
                            autoFormat={false}
                            placeholder={props.phonePlaceholder}
                            onChange={(value, country, e, formattedValue) => {
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
                            <span className={style.error}>
                                Invalid mobile number
                            </span>
                        )}
                    </div>
                    <div className={style.input_block_out}>
                        <Dropdown
                            className={`Dropdown-blue_form  ${
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
                        <Dropdown
                            className={`Dropdown-blue_form  ${
                                formik.errors.planToUse ? "Dropdown-error" : ""
                            }`}
                            options={planToUseValues}
                            onChange={onSelectPlanToUse}
                            value={defaultPlanToUseOption}
                            placeholder={props.planToUsePlaceholder}
                        />
                        {formik.errors.planToUse && (
                            <span className={style.error}>
                                {formik.errors.planToUse}
                            </span>
                        )}
                    </div>
                    <div className={style.input_block_out}>
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
            <button
                type="submit"
                className={`
        ${
            Object.keys(formik.errors).length == 0
                ? buttonActiveTheme[props.buttonActiveTheme]
                : buttonTheme[props.buttonTheme]
        }
        `}
                disabled={formik.isSubmitting}
            >
                {formik.isSubmitting ? props.submittingText : props.buttonText}
            </button>
        </form>
    );
}

export function ThemeFormAll(props) {
    const [valid, setValid] = useState(null);
    const [phone, setPhone] = useState(null);
    const [regionCode, setRegionCode] = useState();
    // const validate = useValidation();
    const router = useRouter();
    const modal = useModals();
    const queryParams = useSelector(searchParams);

    const validate = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = "Required";
        } else if (values.name.length < 2) {
            errors.name = "The name must have at least 2 characters";
        }

        if (!values.phone) {
            errors.phone = "Required";
        }

        if (!values.email) {
            errors.email = "Required";
        } else if (
            !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(
                values.email
            )
        ) {
            errors.email = "Invalid email address";
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
        },
        validate,
        onSubmit: (values) => {
            const data = {
                ...values,
                phone: `+${phone}`,
            };
            const options = {
                method: "POST",
                url: `https://api.netronic.net/send-email`,
                headers: {
                    "content-type": "application/json",
                },
                data: {
                    email: values.email,
                    fromName: props.fromName,
                    letterId: props.letterId,
                },
            };
            axios.request(options).then(
                postData(
                    data,
                    props.destinationURL,
                    props.orderName,
                    props.lang,
                    window.location.href,
                    queryParams || router.query
                )
                    .then(() => {
                        ReactGA.event("generate_lead", {
                            category: "form",
                            action: "submit",
                        });
                        ReactPixel.track("Lead");
                    })
                    .then(router.push("/thanks-pres"))
                    .catch(console.log)
            );
        },
    });

    useEffect(() => {
        modal?.region
            ? setRegionCode(modal?.region.toLowerCase())
            : setRegionCode("us");
    }, [modal.region]);

    return (
        <form
            onSubmit={formik.handleSubmit}
            className={
                themeFormTheme[props.formTheme ? props.formTheme : "general"]
            }
        >
            <div className={style.inputs}>
                <InputName
                    noIcons
                    theme={props.theme}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    error={formik.errors.name}
                    placeholder={props.placeholderName}
                />
                <InputEmail
                    noIcons
                    theme={props.theme}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.errors.email}
                    placeholder={props.placeholderEmail}
                />
                <div
                    className={`${style.phone__input_block} ${
                        formik.errors.phone
                            ? "phone__input__error__business"
                            : ""
                    }`}
                >
                    <PhoneInput
                        containerClass="input__phone_container"
                        inputClass={
                            valid ? "input__phone" : "input__phone_error"
                        }
                        buttonClass={valid ? "drop_down" : "drop_down_error"}
                        country={regionCode}
                        enableSearch
                        excludeCountries={["ru"]}
                        autoFormat={false}
                        placeholder={props.phonePlaceholder}
                        onChange={(value, country, e, formattedValue) => {
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
                            Invalid mobile number
                        </span>
                    )}
                </div>
                {/* <InputCall
                    theme={props.theme}
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    error={formik.errors.phone}
                    placeholder={props.placeholderCall}
                /> */}
            </div>
            <button
                type="submit"
                className={`
        ${
            Object.keys(formik.errors).length == 0
                ? buttonActiveTheme[props.buttonActiveTheme]
                : buttonTheme[props.buttonTheme]
        }
        `}
                disabled={formik.isSubmitting}
            >
                {formik.isSubmitting ? props.submittingText : props.buttonText}
            </button>
        </form>
    );
}

const Input = (props) => {
    return (
        <label className={style.input__label}>
            <input
                name={props.name}
                className={`${style.input_white} ${
                    props.error ? style.input__error : ""
                }`}
                type={props.type}
                onChange={props.onChange}
                value={props.value}
                placeholder={props.placeholder}
            />
            {props.error ? (
                <span className={style.error__message}>{props.error}</span>
            ) : null}
        </label>
    );
};
