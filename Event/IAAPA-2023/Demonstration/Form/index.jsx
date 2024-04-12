import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Dropdown from "react-dropdown";
import ReactPixel from "react-facebook-pixel";
import {
    InputCall,
    InputEmail,
    InputName,
} from "../../../../InputForms/Inputs/Inputs";
import style from "./style.module.scss";
import Agreement from "../Agreement";
import { postData } from "../../../../functions/postData";
import { setUserData } from "../../../../../store/actions/userData";
import ReactGA from "react-ga4";

const Form = (props) => {
    let validate = validation;

    const router = useRouter();
    const dispatch = useDispatch();

    function onAgreementChange() {
        formik.setFieldValue(
            "isAgreePrivacyPolicy",
            !formik.values.isAgreePrivacyPolicy
        );
    }
    function onDateChange(item) {
        formik.setFieldValue("date", item.value);
    }
    function onEquipmentTypeChange(item) {
        formik.setFieldValue("equipmentType", item.value);
    }
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            date: "",
            equipmentType: "",
            isAgreePrivacyPolicy: true,
        },
        validate,
        onSubmit: (values) => {
            dispatch(setUserData(values.name));
            postData(
                values,
                props.destinationURL,
                props.orderName,
                props.lang,
                window.location.href,
                router.query,
                [
                    {
                        name: "date",
                        value: values.date,
                        BXName: "UF_CRM_1599805349",
                    },
                    {
                        name: "Type of Equipment",
                        value: values.equipmentType,
                        BXName: "UF_CRM_1624974650",
                    },
                ]
            )
                .then(
                    ReactGA.event("generate_lead", {
                        category: "form",
                        action: "submit",
                    })
                )
                .then(ReactPixel.track("Lead"))
                .then(() => {
                    document.body.className = "";
                    router.push(props.thank_you_page_url);
                })
                .catch(console.log);
        },
    });

    return (
        <form className={style.form} onSubmit={formik.handleSubmit}>
            <div className={style.inputs_wrapper}>
                <div className={style.cell}>
                    <InputName
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        error={formik.errors.name}
                        theme="rounded"
                        noIcons
                        errorTheme="rounded_flat"
                    />
                    <InputEmail
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={formik.errors.email}
                        theme="rounded"
                        noIcons
                        errorTheme="rounded_flat"
                    />
                    <InputCall
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        error={formik.errors.phone}
                        theme="rounded"
                        noIcons
                        errorTheme="rounded_flat"
                    />
                </div>
                <div className={style.cell}>
                    <Dropdown
                        className="dropdown"
                        options={props.dateData}
                        onChange={(item) => {
                            onDateChange(item);
                        }}
                        value={formik.values.date}
                        placeholder="Preferred meeting date"
                    />
                    <Dropdown
                        className="dropdown_equip"
                        onChange={(item) => {
                            onEquipmentTypeChange(item);
                        }}
                        options={props.equipData}
                        value={formik.values.equipmentType}
                        placeholder="What equipment are you interested in?"
                    />
                    <Agreement
                        active={formik.values.isAgreePrivacyPolicy}
                        onClick={onAgreementChange}
                        text={props.agreement__text}
                        text_req={props.agreement__text_req}
                        error={formik.errors.isAgreePrivacyPolicy}
                    />
                </div>
            </div>
            <div className={style.submit_wrapper}>
                <button type="submit" className={style.button_submit}>
                    {props.buttonText}
                </button>
            </div>
        </form>
    );
};

export default Form;

export const validation = (values) => {
    const errors = {};

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
    if (values.phone !== undefined) {
        if (values.phone === "") {
            errors.phone = "Required";
        } else if (
            !/^[\+]?[(]?[0-9]{1,3}[)]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{1,3}[-\s\.]?[0-9]{1,13}$/im.test(
                values.phone
            )
        ) {
            errors.phone = "Wrong phone number";
        }
    }
    if (values.isAgreePrivacyPolicy !== undefined) {
        if (values.isAgreePrivacyPolicy === false) {
            errors.isAgreePrivacyPolicy = "Required";
        }
    }
    return errors;
};
