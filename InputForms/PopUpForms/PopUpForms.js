import { useFormik } from "formik";
import { useEffect, useState } from "react";
import style from "../forms.module.scss";
import { useRouter } from "next/router";
import { icons } from "../icons/icons";
import { InputName, InputCall, InputEmail } from "../Inputs/Inputs";
import { useModals } from "../../../context/ModalsProvider";
import { useValidation } from "../../../context/ValidationProvider";
import { postData } from "../../functions/postData.ts";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../store/actions/userData";
import { useGAEvents } from "../../../context/GAEventsProvider";
import { phoneMasks } from "../../../Data/phoneMasks";
import ReactGA from "react-ga4";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import Dropdown from "react-dropdown";

function turnOnScroll() {
    document.body.className = "";
}

export function PopUpNamePhone(props) {
    const [valid, setValid] = useState(null);
    const [phone, setPhone] = useState(null);
    const [regionCode, setRegionCode] = useState();
    const [budgetRange, setBudgetRange] = useState(null);
    const [contactMethod, setContactMethod] = useState(null);
    const [planToUse, setPlanToUse] = useState(null);
    const [comment, setComment] = useState(null);

    const router = useRouter();
    const modal = useModals();
    const dispatch = useDispatch();
    const [agreement, changeAgreement] = useState(false);
    const GAEvents = useGAEvents();

    function onAgreementChange() {
        changeAgreement(!agreement);
    }

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

        if (!values.contactMethod) errors.contactMethod = "Required";
        // if (!values.budget) errors.budget = "Required";

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            name: "",
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
                window.location.hostname,
                router.query
            ).then(
                ReactGA.event("generate_lead", {
                    event_category: "button",
                    event_label: "generate_lead",
                })
            );
            modal.NamePhoneModalChangeVisibility();
            router.push(props.thank_you_page);
            turnOnScroll();
        },
    });

    useEffect(() => {
        console.log(modal?.region);
        modal?.region
            ? setRegionCode(modal?.region.toLowerCase())
            : setRegionCode("us");
    }, [modal.region]);

    return (
        <div className={style.inputs_block_out}>
            <div className={style.close_block} onClick={props.closeClick}></div>
            <div className={`${style.inputs_block} fade-up-animation`}>
                <div className={style.close}>
                    <button onClick={props.closeClick}>{icons.cross}</button>
                </div>
                <div className={style.text_block}>
                    <p className={style.title}>
                        {props.title || "Fill in the form below"}
                    </p>
                    <p className={style.paragraph}>
                        {props.subtitle || "Our manager will contact you"}
                    </p>
                </div>
                <div className={style.inputs_block__inputs}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={style.inputs_block__input}>
                            <div>
                                <InputName
                                    noIcons
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    error={formik.errors.name}
                                    placeholder={props.namePlaceholder}
                                />
                                <div
                                    className={`${style.phone__input_block} ${
                                        formik.errors.phone
                                            ? "phone__input__error"
                                            : ""
                                    }`}
                                >
                                    <PhoneInput
                                        containerClass="catalog_input__phone_container"
                                        inputClass={
                                            valid
                                                ? "input__phone"
                                                : "input__phone_error"
                                        }
                                        buttonClass={
                                            valid
                                                ? "drop_down"
                                                : "drop_down_error"
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
                                            const { format, dialCode } =
                                                country;
                                            setPhone(value);
                                            if (
                                                value.length > 5 &&
                                                value.length < 20
                                            ) {
                                                formik.setFieldValue(
                                                    "phone",
                                                    true
                                                );
                                                setValid(true);
                                            } else {
                                                formik.setFieldValue(
                                                    "phone",
                                                    false
                                                );
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
                                {/* <div className={style.input_block_out}>
                                    <Dropdown
                                        className={`Dropdown-black_form  ${
                                            formik.errors.budget
                                                ? "Dropdown-error"
                                                : ""
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
                            <div>
                                <div className={style.input_block_out}>
                                    <Dropdown
                                        className={`Dropdown-black_form  ${
                                            formik.errors.contactMethod
                                                ? "Dropdown-error"
                                                : ""
                                        }`}
                                        options={contactMethodValues}
                                        onChange={onSelectContactMethod}
                                        value={defaultContactMethodOption}
                                        placeholder={
                                            props.contactMethodPlaceholder
                                        }
                                    />
                                    {formik.errors.contactMethod && (
                                        <span className={style.error__message}>
                                            {formik.errors.contactMethod}
                                        </span>
                                    )}
                                </div>
                                {/* <div className={style.input_block_out}>
                                    <Dropdown
                                        className={`Dropdown-black_form  ${
                                            formik.errors.planToUse
                                                ? "Dropdown-error"
                                                : ""
                                        }`}
                                        options={planToUseValues}
                                        onChange={onSelectPlanToUse}
                                        value={defaultPlanToUseOption}
                                        placeholder={props.planToUsePlaceholder}
                                    />
                                    {formik.errors.planToUse && (
                                        <span className={style.error__message}>
                                            {formik.errors.planToUse}
                                        </span>
                                    )}
                                </div> */}
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
                        <div className={style.agreement}>
                            <div
                                className={
                                    agreement === true
                                        ? style.agreement_dot_button_active
                                        : style.agreement_dot_button
                                }
                                onClick={onAgreementChange}
                            >
                                {icons.dot}
                            </div>
                            <p className={style.agreement__text}>
                                <span onClick={onAgreementChange}>
                                    {props.agreement_text}
                                </span>{" "}
                                {props.agreement_link}
                            </p>
                        </div>
                        <button
                            type={agreement ? "submit" : "button"}
                            className={`${
                                agreement
                                    ? Object.keys(formik.errors).length == 0
                                        ? style.general_button_active
                                        : style.general_button_inactive
                                    : style.general_button_inactive
                            } "button-submit"`}
                        >
                            {props.buttonText}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export function PopUpEmail(props) {
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [agreement, changeAgreement] = useState(true);

    const router = useRouter();
    const modal = useModals();
    const GAEvents = useGAEvents();

    function onAgreementChange() {
        changeAgreement(!agreement);
        formik.setFieldValue("agreement", !agreement);
    }

    const languageValues = [
        "Español",
        "Deutsch",
        "Italiano",
        "Français",
        "Українська",
        "English",
    ];

    const onSelectLanguage = (option) => {
        setSelectedLanguage(option.value);
        formik.setFieldValue("language", option.value);
    };

    const validate = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = "Required";
        } else if (
            !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(
                values.email
            )
        ) {
            errors.email = "Invalid email address";
        }

        if (!values.language) errors.language = "Required";
        if (!values.agreement) errors.agreement = "Required";

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            agreement: true,
            language: "",
        },
        validate,
        onSubmit: (values) => {
            postData(
                data,
                props.destinationURL,
                props.orderName,
                props.lang,
                window.location.hostname,
                router.query
            );
            modal.closeModal();
        },
    });

    return (
        <div className={style.inputs_block_out}>
            <div className={style.close_block} onClick={props.closeClick}></div>
            <div className={`${style.inputs_block} fade-up-animation`}>
                <div className={style.close}>
                    <button onClick={props.closeClick}>{icons.cross}</button>
                </div>
                <div className={style.text_block}>
                    <p className={style.title}>
                        {props.title || "Fill in the form below"}
                    </p>
                </div>
                <div className={style.inputs_block__inputs}>
                    <form onSubmit={formik.handleSubmit}>
                        <InputEmail
                            noIcons
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            error={formik.errors.email}
                            placeholder={props.emailPlaceholder}
                        />
                        <div className={style.input_block_out}>
                            <Dropdown
                                className={`Dropdown-black_form  ${
                                    formik.errors.language
                                        ? "Dropdown-error"
                                        : ""
                                }`}
                                options={languageValues}
                                onChange={onSelectLanguage}
                                value={selectedLanguage}
                                placeholder={props.selectLanguagePlaceholder}
                            />
                            {formik.errors.language && (
                                <span className={style.error}>
                                    {formik.errors.language}
                                </span>
                            )}
                        </div>
                        <div className={style.agreement}>
                            <div
                                className={
                                    agreement === true
                                        ? style.agreement_dot_button_active
                                        : style.agreement_dot_button
                                }
                                onClick={onAgreementChange}
                            >
                                {icons.dot}
                            </div>
                            <p className={style.agreement__text}>
                                <span onClick={onAgreementChange}>
                                    {props.agreement_text}
                                </span>{" "}
                                {props.agreement_link}
                            </p>
                            {formik.errors.agreement && (
                                <span className={style.error}>
                                    {formik.errors.agreement}
                                </span>
                            )}
                        </div>
                        <button
                            type={agreement ? "submit" : "button"}
                            className={`${
                                agreement
                                    ? Object.keys(formik.errors).length == 0
                                        ? style.general_button_active
                                        : style.general_button_inactive
                                    : style.general_button_inactive
                            } "button-submit"`}
                        >
                            {props.buttonText}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export function PopUpEmailPhone(props) {
    const [valid, setValid] = useState(null);
    const [phone, setPhone] = useState(null);
    const [regionCode, setRegionCode] = useState();
    const [budgetRange, setBudgetRange] = useState(null);
    const [contactMethod, setContactMethod] = useState(null);
    const [planToUse, setPlanToUse] = useState(null);
    const [comment, setComment] = useState(null);

    const router = useRouter();
    const modal = useModals();
    const [agreement, changeAgreement] = useState(false);
    const GAEvents = useGAEvents();

    function onAgreementChange() {
        changeAgreement(!agreement);
    }

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
            axios
                .request(options)
                .then(console.log)
                .then(
                    postData(
                        data,
                        props.destinationURL,
                        props.orderName,
                        props.lang,
                        window.location.href,
                        router.query
                    )
                )
                .then(router.push(props.thank_you_page))
                .catch(console.log);
            ReactGA.event("generate_lead", {
                category: "form",
                action: "submit",
            });
            modal.EmailPhoneModalChangeVisibility();
            turnOnScroll();
        },
    });

    useEffect(() => {
        modal?.region
            ? setRegionCode(modal?.region.toLowerCase())
            : setRegionCode("us");
    }, [modal.region]);

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

    return (
        <div className={style.inputs_block_out}>
            <div className={style.close_block} onClick={props.closeClick}></div>
            <div className={style.inputs_block}>
                <div className={style.close}>
                    <button onClick={props.closeClick}>{icons.cross}</button>
                </div>
                <div className={style.text_block}>
                    <p className={style.title}>
                        {props.title || "Fill in the form below"}
                    </p>
                    <p className={style.paragraph}>
                        {props.subTitle ||
                            "Get an equipment catalog with prices"}
                    </p>
                </div>
                <div className={style.inputs_block__inputs}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={style.inputs_block__input}>
                            <div className={style.inputs_block__input_cell}>
                                <InputName
                                    noIcons
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    error={formik.errors.name}
                                    placeholder={props.namePlaceholder}
                                />

                                <div
                                    className={`${style.phone__input_block} ${
                                        formik.errors.phone
                                            ? "phone__input__error"
                                            : ""
                                    }`}
                                >
                                    <PhoneInput
                                        containerClass="catalog_input__phone_container"
                                        inputClass={
                                            valid
                                                ? "input__phone"
                                                : "input__phone_error"
                                        }
                                        buttonClass={
                                            valid
                                                ? "drop_down"
                                                : "drop_down_error"
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
                                            const { format, dialCode } =
                                                country;
                                            setPhone(value);
                                            if (
                                                value.length > 5 &&
                                                value.length < 20
                                            ) {
                                                formik.setFieldValue(
                                                    "phone",
                                                    true
                                                );
                                                setValid(true);
                                            } else {
                                                formik.setFieldValue(
                                                    "phone",
                                                    false
                                                );
                                                setValid(false);
                                            }
                                        }}
                                    />
                                    {!valid && (
                                        <span className={style.error_Phone}>
                                            Invalid mobile number
                                        </span>
                                    )}
                                </div>
                                {/* <div className={style.input_block_out}>
                                    <Dropdown
                                        className={`Dropdown-black_form  ${
                                            formik.errors.budget
                                                ? "Dropdown-error"
                                                : ""
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
                            <div className={style.inputs_block__input_cell}>
                                <InputEmail
                                    noIcons
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    error={formik.errors.email}
                                    placeholder={props.emailPlaceholder}
                                />
                                <div className={style.input_block_out}>
                                    <Dropdown
                                        className={`Dropdown-black_form  ${
                                            formik.errors.contactMethod
                                                ? "Dropdown-error"
                                                : ""
                                        }`}
                                        options={contactMethodValues}
                                        onChange={onSelectContactMethod}
                                        value={defaultContactMethodOption}
                                        placeholder={
                                            props.contactMethodPlaceholder
                                        }
                                    />
                                    {formik.errors.contactMethod && (
                                        <span className={style.error}>
                                            {formik.errors.contactMethod}
                                        </span>
                                    )}
                                </div>
                                {/* <div className={style.input_block_out}>
                                    <Dropdown
                                        className={`Dropdown-black_form  ${
                                            formik.errors.planToUse
                                                ? "Dropdown-error"
                                                : ""
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
                        <div className={style.agreement}>
                            <div
                                className={
                                    agreement === true
                                        ? style.agreement_dot_button_active
                                        : style.agreement_dot_button
                                }
                                onClick={onAgreementChange}
                            >
                                {icons.dot}
                            </div>
                            <p className={style.agreement__text}>
                                <span onClick={onAgreementChange}>
                                    {props.agreement_text}
                                </span>{" "}
                                {props.agreement_link}
                            </p>
                        </div>
                        <button
                            type={agreement ? "submit" : "button"}
                            className={`${
                                agreement
                                    ? Object.keys(formik.errors).length == 0
                                        ? style.general_button_active
                                        : style.general_button_inactive
                                    : style.general_button_inactive
                            } "button-submit"`}
                        >
                            {props.buttonText || "Get catalog"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export function PopUpEvent(props) {
    const [valid, setValid] = useState(null);
    const [phone, setPhone] = useState(null);
    const [regionCode, setRegionCode] = useState();
    const [budgetRange, setBudgetRange] = useState(null);
    const [contactMethod, setContactMethod] = useState(null);
    const [planToUse, setPlanToUse] = useState(null);
    const [comment, setComment] = useState(null);

    const router = useRouter();
    const modal = useModals();
    const dispatch = useDispatch();
    const [agreement, changeAgreement] = useState(false);
    const GAEvents = useGAEvents();

    function onAgreementChange() {
        changeAgreement(!agreement);
    }

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

    useEffect(() => {
        console.log(modal?.region);
        modal?.region
            ? setRegionCode(modal?.region.toLowerCase())
            : setRegionCode("us");
    }, [modal.region]);

    const formik = useFormik({
        initialValues: {
            email: "",
            phone: false,
            name: "",
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
                    window.location.hostname,
                    router.query
                ).then(
                    ReactGA.event("generate_lead", {
                        event_category: "button",
                        event_label: "generate_lead",
                    })
                )
            );
            modal.EventModalChangeVisibility();
            router.push(props.thank_you_page);
            turnOnScroll();
        },
    });

    return (
        <div className={style.inputs_block_out}>
            <div className={style.close_block} onClick={props.closeClick}></div>
            <div className={style.inputs_block}>
                <div className={style.close}>
                    <button onClick={props.closeClick}>{icons.cross}</button>
                </div>
                <div className={style.text_block}>
                    <p className={style.title}>
                        {props.title || "Fill in the form below"}
                    </p>
                    <p className={style.paragraph}>{props.subTitle}</p>
                </div>
                <div className={style.inputs_block__inputs}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={style.inputs_block__input}>
                            <InputName
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                error={formik.errors.name}
                            />

                            <div
                                className={`${style.phone__input_block} ${
                                    formik.errors.phone
                                        ? "phone__input__error"
                                        : ""
                                }`}
                            >
                                <PhoneInput
                                    containerClass="input__phone_container"
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
                                        if (
                                            value.length > 5 &&
                                            value.length < 20
                                        ) {
                                            formik.setFieldValue("phone", true);
                                            setValid(true);
                                        } else {
                                            formik.setFieldValue(
                                                "phone",
                                                false
                                            );
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
                            <InputEmail
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                error={formik.errors.email}
                            />
                            {/* <div className={style.input_block_out}>
                                <Dropdown
                                    className={`Dropdown-black_form  ${
                                        formik.errors.budget
                                            ? "Dropdown-error"
                                            : ""
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
                            <div className={style.input_block_out}>
                                <Dropdown
                                    className={`Dropdown-black_form  ${
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
                                    <span className={style.error__message}>
                                        {formik.errors.contactMethod}
                                    </span>
                                )}
                            </div>
                            {/* <div className={style.input_block_out}>
                                <Dropdown
                                    className={`Dropdown-black_form  ${
                                        formik.errors.planToUse
                                            ? "Dropdown-error"
                                            : ""
                                    }`}
                                    options={planToUseValues}
                                    onChange={onSelectPlanToUse}
                                    value={defaultPlanToUseOption}
                                    placeholder={props.planToUsePlaceholder}
                                />
                                {formik.errors.planToUse && (
                                    <span className={style.error__message}>
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
                        <div className={style.agreement}>
                            <div
                                className={
                                    agreement === true
                                        ? style.agreement_dot_button_active
                                        : style.agreement_dot_button
                                }
                                onClick={onAgreementChange}
                            >
                                {icons.dot}
                            </div>
                            <p className={style.agreement__text}>
                                <span onClick={onAgreementChange}>
                                    {props.agreement_text}
                                </span>{" "}
                                {props.agreement_link}
                            </p>
                        </div>
                        <button
                            type={agreement ? "submit" : "button"}
                            className={`${
                                agreement
                                    ? Object.keys(formik.errors).length == 0
                                        ? style.general_button_active
                                        : style.general_button_inactive
                                    : style.general_button_inactive
                            } "button-submit"`}
                        >
                            {props.buttonText}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export function PopUpNameEmail(props) {
    const router = useRouter();
    const modal = useModals();
    const dispatch = useDispatch();
    const [agreement, changeAgreement] = useState(false);
    const [budgetRange, setBudgetRange] = useState(null);
    const [contactMethod, setContactMethod] = useState(null);
    const [planToUse, setPlanToUse] = useState(null);
    const [comment, setComment] = useState(null);
    const GAEvents = useGAEvents();

    function onAgreementChange() {
        changeAgreement(!agreement);
    }

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
        if (!values.budget) errors.budget = "Required";

        return errors;
    };
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            contactMethod: "",
            planToUse: "",
            budget: "",
            comment: "",
        },
        validate,
        onSubmit: (values) => {
            dispatch(setUserData(values.name));
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
            axios
                .request(options)
                .then(console.log)
                .then(
                    postData(
                        data,
                        props.destinationURL,
                        props.orderName,
                        props.lang,
                        window.location.href,
                        router.query
                    )
                )
                .then(router.push(props.thank_you_page))
                .catch(console.log);
            ReactGA.event("generate_lead", {
                category: "form",
                action: "submit",
            });
            turnOnScroll();
        },
    });

    return (
        <div className={style.inputs_block_out}>
            <div className={style.close_block} onClick={props.closeClick}></div>
            <div className={style.inputs_block}>
                <div className={style.close}>
                    <button onClick={props.closeClick}>{icons.cross}</button>
                </div>
                <div className={style.text_block}>
                    <p className={style.title}>{props.title}</p>
                    <p className={style.paragraph}>{props.subtitle}</p>
                </div>
                <div className={style.inputs_block__inputs}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={style.inputs_block__input}>
                            <div>
                                <InputName
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    error={formik.errors.name}
                                    placeholder={props.namePlaceholder}
                                />
                                <InputEmail
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    error={formik.errors.email}
                                    placeholder={props.emailPlaceholder}
                                />
                                <div className={style.input_block_out}>
                                    <Dropdown
                                        className={`Dropdown-black_form  ${
                                            formik.errors.budget
                                                ? "Dropdown-error"
                                                : ""
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
                                </div>
                            </div>
                            <div>
                                <div className={style.input_block_out}>
                                    <Dropdown
                                        className={`Dropdown-black_form  ${
                                            formik.errors.contactMethod
                                                ? "Dropdown-error"
                                                : ""
                                        }`}
                                        options={contactMethodValues}
                                        onChange={onSelectContactMethod}
                                        value={defaultContactMethodOption}
                                        placeholder={
                                            props.contactMethodPlaceholder
                                        }
                                    />
                                    {formik.errors.contactMethod && (
                                        <span className={style.error}>
                                            {formik.errors.contactMethod}
                                        </span>
                                    )}
                                </div>
                                <div className={style.input_block_out}>
                                    <Dropdown
                                        className={`Dropdown-black_form  ${
                                            formik.errors.planToUse
                                                ? "Dropdown-error"
                                                : ""
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
                                </div>
                                <div className={style.agreement}>
                                    <div
                                        className={
                                            agreement === true
                                                ? style.agreement_dot_button_active
                                                : style.agreement_dot_button
                                        }
                                        onClick={onAgreementChange}
                                    >
                                        {icons.dot}
                                    </div>
                                    <p className={style.agreement__text}>
                                        <span onClick={onAgreementChange}>
                                            {props.agreement_text}
                                        </span>{" "}
                                        {props.agreement_link}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            type={agreement ? "submit" : "button"}
                            className={`${
                                agreement
                                    ? Object.keys(formik.errors).length == 0
                                        ? style.general_button_active
                                        : style.general_button_inactive
                                    : style.general_button_inactive
                            } "button-submit"`}
                        >
                            {props.buttonText || "Get"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

const Input = (props) => {
    return (
        <label className={style.input__label}>
            <input
                name={props.name}
                className={`${style.input} ${
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
