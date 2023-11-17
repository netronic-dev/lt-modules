import { useFormik } from 'formik';
import style from '../forms.module.scss';
import { useRouter } from 'next/router';
import { InputName, InputCall, InputEmail } from '../Inputs/Inputs';
import { postData } from '../../functions/postData.ts';
import { useValidation } from '../../../context/ValidationProvider';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../store/actions/userData';
import ReactGA from 'react-ga4';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useEffect, useState } from 'react';
import { useModals } from '../../../context/ModalsProvider.js';
import { icons } from '../icons/icons.js';
import { phoneMasks } from '../../../Data/phoneMasks.js';

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

export function ThemeForm (props) {
    const [valid, setValid] = useState(null);
    const [phone, setPhone] = useState(null);
    const [regionCode, setRegionCode] = useState();
    // const validate = useValidation();
    const router = useRouter();
    const dispatch = useDispatch();
    const modal = useModals();

    const validate = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = 'Required';

        } else if (values.name.length < 2) {
            errors.name = 'The name must have at least 2 characters';
        }

        if (!values.phone) {
            errors.phone = 'Required';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: false,
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
                ReactGA.event('generate_lead', {
                    event_category: 'button',
                    event_label: 'generate_lead',
                })
            ).then(router.push('/thanks-pres'));
        },
    });

    useEffect(() => {
        console.log(modal?.region);
        modal?.region ? setRegionCode(modal?.region.toLowerCase()) : setRegionCode('us');
    }, [modal.region]);

    return (
        <form
            onSubmit={formik.handleSubmit}
            className={
                themeFormTheme[props.formTheme ? props.formTheme : 'general']
            }
        >
            <div className={style.inputs}>
                <InputName
                    noIcons
                    theme={props.theme}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    error={formik.errors.name}
                    placeholder={props.namePlaceholder}
                />
                <div className={`${style.phone__input_block} ${formik.errors.phone ? 'phone__input__error__business' : ''}`}>
                    <PhoneInput
                        containerClass='business_input__phone_container'
                        inputClass={valid ? 'input__phone' : 'input__phone_error'}
                        buttonClass={valid ? 'drop_down' : 'drop_down_error'}
                        country={regionCode}
                        enableSearch
                        masks={phoneMasks}
                        placeholder="Phone *"
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
                {/* <InputCall
                    theme={props.theme}
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    error={formik.errors.phone}
                    placeholder={props.callPlaceholder}
                /> */}
            </div>
            <button
                type='submit'
                className={`
        ${Object.keys(formik.errors).length == 0
                        ? buttonActiveTheme[props.buttonActiveTheme]
                        : buttonTheme[props.buttonTheme]
                    }
        `}
            >
                {props.buttonText}
            </button>
        </form>
    );
}

export function ThemeFormAll (props) {
    const [valid, setValid] = useState(null);
    const [phone, setPhone] = useState(null);
    const [regionCode, setRegionCode] = useState();
    // const validate = useValidation();
    const router = useRouter();
    const modal = useModals();

    const validate = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = 'Required';

        } else if (values.name.length < 2) {
            errors.name = 'The name must have at least 2 characters';
        }

        if (!values.phone) {
            errors.phone = 'Required';
        }

        if (!values.email) {
            errors.email = 'Required';
        } else if (
            !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
        },
        validate,
        onSubmit: (values) => {
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
                ReactGA.event('generate_lead', {
                    event_category: 'button',
                    event_label: 'generate_lead',
                })
            ).then(router.push('/thanks-pres'));
        },
    });

    useEffect(() => {
        console.log(modal?.region);
        modal?.region ? setRegionCode(modal?.region.toLowerCase()) : setRegionCode('us');
    }, [modal.region]);

    return (
        <form
            onSubmit={formik.handleSubmit}
            className={
                themeFormTheme[props.formTheme ? props.formTheme : 'general']
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
                <div className={`${style.phone__input_block} ${formik.errors.phone ? 'phone__input__error__business' : ''}`}>
                    <PhoneInput
                        containerClass='input__phone_container'
                        inputClass={valid ? 'input__phone' : 'input__phone_error'}
                        buttonClass={valid ? 'drop_down' : 'drop_down_error'}
                        country={regionCode}
                        enableSearch
                        masks={phoneMasks}
                        placeholder={props.placeholderCall}
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
                {/* <InputCall
                    theme={props.theme}
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    error={formik.errors.phone}
                    placeholder={props.placeholderCall}
                /> */}
            </div>
            <button
                type='submit'
                className={`
        ${Object.keys(formik.errors).length == 0
                        ? buttonActiveTheme[props.buttonActiveTheme]
                        : buttonTheme[props.buttonTheme]
                    }
        `}
            >
                {props.buttonText}
            </button>
        </form>
    );
}
