import Link from "next/link";
import ReactGA from "react-ga4";
import style from "./style.module.scss";
import ReactPixel from "react-facebook-pixel";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useInView } from "react-hook-inview";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../../../store/actions/userData";
import { postData } from "../../../../lt-modules/functions/postData";
import { useGAEvents } from "../../../../context/GAEventsProvider";
import { searchParams } from "../../../../store/searchParamsSlice.js";

export function InputsWName(props) {
    const router = useRouter();
    const dispatch = useDispatch();
    const GAEvents = useGAEvents();
    const queryParams = useSelector(searchParams);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            agreement: true,
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
                queryParams || router.query
            )
                .then(
                    ReactGA.event("generate_lead", {
                        category: "form",
                        action: "submit",
                    })
                )
                .then(ReactPixel.track("Lead"))
                .then(router.push(props.thankYouPage))
                .catch(console.log);
        },
    });

    function onAgreementChange() {
        formik.setFieldValue("agreement", !formik.values.agreement);
    }

    const [ref, isVisible] = useInView({
        unobserveOnEnter: true,
    });

    return (
        <div className={style.input_land_out}>
            <form onSubmit={formik.handleSubmit} className="form_submit_land">
                <div className={style.content}>
                    <div className={style.input_out__outer}>
                        <div className={style.input_out}>
                            <input
                                className={
                                    formik.errors.name
                                        ? `${style.input} ${style.input_error}`
                                        : style.input
                                }
                                name="name"
                                maxLength="30"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                placeholder={props.namePlaceholder || "Name *"}
                            />
                        </div>
                        <div className={style.error}>{formik.errors.name}</div>
                    </div>
                    <div className={style.input_out__outer}>
                        <div className={style.input_out}>
                            <input
                                className={
                                    formik.errors.email
                                        ? `${style.input} ${style.input_error}`
                                        : style.input
                                }
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                maxLength="40"
                                name="email"
                                type="email"
                                placeholder={props.placeholder || "Email *"}
                            />
                        </div>
                        <div className={style.error}>{formik.errors.email}</div>
                    </div>
                    <div className={style.input_out__outer}>
                        <div className={style.input_out}>
                            <input
                                className={
                                    formik.errors.phone
                                        ? `${style.input} ${style.input_error}`
                                        : style.input
                                }
                                type="tel"
                                name="phone"
                                maxLength="30"
                                onChange={formik.handleChange}
                                value={formik.values.phone}
                                placeholder={
                                    props.callPlaceholder || "Phone number *"
                                }
                            />
                        </div>
                        <div className={style.error}>{formik.errors.phone}</div>
                    </div>
                </div>
                <Agreement
                    onAgreementChange={onAgreementChange}
                    agreement={formik.values.agreement}
                    error={formik.errors.agreement}
                    agreementText={props.agreementText}
                    agreementSpanText={props.agreementSpanText}
                />
                <button
                    className={style.button}
                    id={props.id ? props.id : ""}
                    type="submit"
                    disabled
                    onClick={props.onClick}
                >
                    {props.buttonText}
                </button>
            </form>
        </div>
    );
}

function Agreement(props) {
    return (
        <div className={style.agreement__outer}>
            <div className={style.agreement}>
                <div
                    className={
                        props.agreement
                            ? style.agreement_dot_button_active
                            : style.agreement_dot_button
                    }
                    onClick={props.onAgreementChange}
                >
                    {dotIcon}
                </div>
                <p className={style.agreement__text}>
                    <span onClick={props.onAgreementChange}>
                        {props.agreementText ||
                            "Подтверждаю, что ознакомился и согласен с условиями "}
                    </span>
                </p>
            </div>
            <div className={style.error}>{props.error}</div>
        </div>
    );
}

const dotIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="10" fill="#383838" />
        <circle className={style.dot} cx="10" cy="10" r="8" fill="#F1F4F6" />
    </svg>
);

export const validate = (values) => {
    const errors = {};

    if (values.name !== undefined) {
        if (values.name === "") {
            errors.name = "Required field";
        }
    }

    if (values.email !== undefined) {
        if (values.email === "") {
            errors.email = "Required field";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
            errors.email = "Wrong E-mail";
        }
    }

    if (values.phone !== undefined) {
        if (values.phone === "") {
            errors.phone = "Required field";
        } else if (
            !/^[\+]?[(]?[0-9]{1,3}[)]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{1,3}[-\s\.]?[0-9]{1,13}$/im.test(
                values.phone
            )
        ) {
            errors.phone = "Wrong phone number";
        }
    }

    if (values.agreement !== undefined) {
        if (values.agreement === false) {
            errors.agreement = "Required";
        }
    }

    return errors;
};
