import style from "./style.module.scss";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";

import {
    InputEmail,
    InputCall,
    InputName,
} from "../../InputForms/Inputs/Inputs";
import Agreement from "../Agreement";
import { postData } from "../../functions/postData";
import { validate } from "../../InputForms/validate/validate";
import { useGAEvents } from "../../../context/GAEventsProvider";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../../store/actions/userData";
import { searchParams } from "../../../store/searchParamsSlice";

export function PopUpForm(props) {
    const router = useRouter();
    const gaEvents = useGAEvents();
    const dispatch = useDispatch();
    const queryParams = useSelector(searchParams);

    function onAgreementChange() {
        formik.setFieldValue(
            "isAgreePrivacyPolicy",
            !formik.values.isAgreePrivacyPolicy
        );
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            isAgreePrivacyPolicy: true,
        },
        validate,
        onSubmit: (values) => {
            dispatch(
                setUserData(
                    values.name,
                    values.email,
                    values.phone,
                    props.activeSet
                )
            );
            document.body.className = "";
            postData(
                values,
                props.destinationURL,
                props.orderName,
                props.lang,
                window.location.href,
                queryParams || router.query
            )
                .then(
                    ReactGA.event("generate_lead", {
                        category: "form",
                        action: "submit",
                    })
                )
                .then(ReactPixel.track("Lead"))
                .then(router.push(props.thank_you_page_url))
                .catch(console.log);
        },
    });

    return (
        <div className={style.pop_up_form}>
            <div className={style.quit_block} onClick={props.onQuitClick}></div>
            <div className={`${style.wrapper} fade-up-animation`}>
                <div className={style.quit_button_out}>
                    <button
                        className={style.quit_button}
                        onClick={props.onQuitClick}
                    >
                        {borderedCross}
                    </button>
                </div>
                <div className={style.background_left}>
                    <img src="/black-friday/form-bg-left.svg" />
                </div>
                <div className={style.background_right}>
                    <img src="/black-friday/form-bg-right.svg" />
                </div>
                <div className={style.background_mobile}>
                    <img src="/black-friday/form-bg-mobile.svg" />
                </div>
                <div className={style.title_cell}>
                    <h2 className={style.title}>{props.title}</h2>
                </div>
                <form className={style.form} onSubmit={formik.handleSubmit}>
                    <div className={style.input_name_out}>
                        <InputName
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            error={formik.errors.name}
                            theme="rounded"
                            noIcons
                            errorTheme="rounded_flat"
                        />
                    </div>
                    <div className={style.input_email_out}>
                        <InputEmail
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            error={formik.errors.email}
                            theme="rounded"
                            noIcons
                            errorTheme="rounded_flat"
                        />
                    </div>
                    <div className={style.input_call_out}>
                        <InputCall
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                            error={formik.errors.phone}
                            theme="rounded"
                            noIcons
                            errorTheme="rounded_flat"
                        />
                    </div>
                    <div className={style.submit}>
                        <div className={style.agreement_wrapper}>
                            <p className={style.cell_checklist_error}>
                                {formik.errors.isAgreePrivacyPolicy &&
                                    "Required"}
                            </p>
                            <Agreement
                                active={formik.values.isAgreePrivacyPolicy}
                                onClick={onAgreementChange}
                                text={props.agreement__text}
                                style={style.agreement}
                                error={formik.errors.isAgreePrivacyPolicy}
                            />
                        </div>
                        <button
                            type="submit"
                            className={style.button_submit}
                            onClick={props.onClick}
                        >
                            {props.buttonText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

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
