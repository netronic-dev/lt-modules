import { useFormik } from 'formik';
import style from '../forms.module.scss';
import { useRouter } from 'next/router';
import { InputName, InputCall, InputEmail } from '../Inputs/Inputs';
import { postData } from '../../functions/postData.ts';
import { useValidation } from '../../../context/ValidationProvider';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../store/actions/userData';
import ReactGA from 'react-ga4';
import PhoneInput from 'react-phone-number-input';
import { useEffect, useState } from 'react';
import { icons } from '../icons/icons.js';

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
    const [value, setValue] = useState('');
    const validate = useValidation();
    const router = useRouter();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
        },
        validate,
        onSubmit: (values) => {
            dispatch(setUserData(values.name));
            postData(
                values,
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

    const handleChange = (newValue) => {
        setValue(newValue);
        formik.setFieldValue('phone', newValue);
    };

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
                        className='business__input'
                        initialValueFormat='national'
                        international
                        placeholder={props.callPlaceholder || "Phone *"}
                        value={value}
                        onChange={handleChange}
                    />
                    {formik.errors.phone ? <span className={style.error__message}>{formik.errors.phone}</span> : null}
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
    const [value, setValue] = useState('');
    const validate = useValidation();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
        },
        validate,
        onSubmit: (values) => {
            postData(
                values,
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

    const handleChange = (newValue) => {
        setValue(newValue);
        formik.setFieldValue('phone', newValue);
    };

    const icon = {
        error: icons.error,
        agree: icons.agree,
    };

    return (
        <form
            onSubmit={formik.handleSubmit}
            className={
                themeFormTheme[props.formTheme ? props.formTheme : 'general']
            }
        >
            <div className={style.inputs}>
                <InputName
                    theme={props.theme}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    error={formik.errors.name}
                    placeholder={props.placeholderName}
                />
                <InputEmail
                    theme={props.theme}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.errors.email}
                    placeholder={props.placeholderEmail}
                />
                <div className={`${style.phone__input_block} ${formik.errors.phone ? 'phone__input__error__business' : ''}`}>
                    <PhoneInput
                        className='business__input'
                        initialValueFormat='national'
                        international
                        placeholder={props.callPlaceholder || "Phone *"}
                        value={value}
                        onChange={handleChange}
                    />
                    {formik.errors.phone ? <span className={style.error__message}>{formik.errors.phone}</span> : null}
                    {formik.errors.phone ? <div className={style.error_icon}>
                        {icon.error}
                    </div> : value?.length >= 13 ? <div className={style.error_icon}>
                        {icon.agree}
                    </div> : null}
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
