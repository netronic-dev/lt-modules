import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import style from '../forms.module.scss';
import { useRouter } from 'next/router';
import { icons } from '../icons/icons';
import { InputName, InputCall, InputEmail } from '../Inputs/Inputs';
import { useModals } from '../../../context/ModalsProvider';
import { useValidation } from '../../../context/ValidationProvider';
import { postData } from '../../functions/postData.ts';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../store/actions/userData';
import { useGAEvents } from '../../../context/GAEventsProvider';
import ReactGA from 'react-ga4';
import PhoneInput from 'react-phone-number-input';

function turnOnScroll () {
    document.body.className = '';
}

export function PopUpNamePhone (props) {
    const [value, setValue] = useState('');
    const validate = useValidation();
    const router = useRouter();
    const modals = useModals();
    const dispatch = useDispatch();
    const [agreement, changeAgreement] = useState(false);
    const GAEvents = useGAEvents();

    function onAgreementChange () {
        changeAgreement(!agreement);
    }

    const icon = {
        error: icons.error,
        agree: icons.agree,
    };

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
            );
            modals.NamePhoneModalChangeVisibility();
            router.push(props.thank_you_page);
            turnOnScroll();
        },
    });

    // useEffect(() => {
    //     formik.setFieldValue('phone', value);
    // }, []);

    const handleChange = (newValue) => {
        setValue(newValue);
        formik.setFieldValue('phone', newValue);
    };

    return (
        <div className={style.inputs_block_out}>
            <div className={style.close_block} onClick={props.closeClick}></div>
            <div className={`${style.inputs_block} fade-up-animation`}>
                <div className={style.close}>
                    <button onClick={props.closeClick}>{icons.cross}</button>
                </div>
                <div className={style.text_block}>
                    <p className={style.title}>
                        {props.title || 'Fill in the form below'}
                    </p>
                    <p className={style.paragraph}>
                        {props.subtitle || 'Our manager will contact you'}
                    </p>
                </div>
                <div className={style.inputs_block__inputs}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={style.inputs_block__input}>
                            <InputName
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                error={formik.errors.name}
                                placeholder={props.namePlaceholder}
                            />
                            <div className={`${style.phone__input_block} ${formik.errors.phone ? 'phone__input__error' : ''}`}>
                                <PhoneInput
                                    initialValueFormat='national'
                                    international
                                    placeholder={props.callPlaceholder || "Phone*"}
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
                                onChange={formik.handleChange}
                                value={formik.values.phone}
                                error={formik.errors.phone}
                                placeholder={props.callPlaceholder}
                            /> */}
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
                                </span>{' '}
                                {props.agreement_link}
                            </p>
                        </div>
                        <button
                            type={agreement ? 'submit' : 'button'}
                            className={`${agreement
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

export function PopUpEmailPhone (props) {
    const [value, setValue] = useState(null);
    const validate = useValidation();
    const router = useRouter();
    const modals = useModals();
    const [agreement, changeAgreement] = useState(false);
    const GAEvents = useGAEvents();

    const icon = {
        error: icons.error,
        agree: icons.agree,
    };

    function onAgreementChange () {
        changeAgreement(!agreement);
    }

    const formik = useFormik({
        initialValues: {
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
            );
            modals.EmailPhoneModalChangeVisibility();
            router.push(props.thank_you_page);
            turnOnScroll();
        },
    });

    // useEffect(() => {
    //     console.log(value === undefined);
    //     if (value !== null) {
    //         formik.setFieldValue('phone', value);
    //     } else if (value === undefined) {
    //         console.log(6 + 6);
    //         formik.setFieldValue('phone', " ");
    //     } else if (value === '+') {
    //         console.log("+");
    //         formik.setFieldValue('phone', value);
    //     }
    // }, [value]);

    const handleChange = (newValue) => {
        setValue(newValue);
        formik.setFieldValue('phone', newValue);
    };

    // console.log(value);

    return (
        <div className={style.inputs_block_out}>
            <div className={style.close_block} onClick={props.closeClick}></div>
            <div className={style.inputs_block}>
                <div className={style.close}>
                    <button onClick={props.closeClick}>{icons.cross}</button>
                </div>
                <div className={style.text_block}>
                    <p className={style.title}>
                        {props.title || 'Fill in the form below'}
                    </p>
                    <p className={style.paragraph}>
                        {props.subTitle ||
                            'Get an equipment catalog with prices'}
                    </p>
                </div>
                <div className={style.inputs_block__inputs}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={style.inputs_block__input}>
                            <InputEmail
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                error={formik.errors.email}
                                placeholder={props.emailPlaceholder}
                            />
                            <div className={`${style.phone__input_block} ${formik.errors.phone ? 'phone__input__error' : ''}`}>
                                <PhoneInput
                                    className={formik.errors.phone ? style.fd : ''}
                                    initialValueFormat='national'
                                    international
                                    placeholder={props.callPlaceholder || "Phone*"}
                                    value={value}
                                    onChange={handleChange}
                                />
                                {formik.errors.phone ? <span className={style.error__message}>{formik.errors.phone}</span> : null}
                                {formik.errors.phone ? <div className={style.error_icon}>
                                    {icon.error}
                                </div> : value === "" ? <div className={style.error_icon}>
                                    {icon.error}
                                </div> : value !== null ? <div className={style.error_icon}>
                                    {icon.agree}
                                </div> : null}
                            </div>
                            {/* <InputCall
                                onChange={formik.handleChange}
                                value={formik.values.phone}
                                error={formik.errors.phone}
                                placeholder={props.callPlaceholder}
                            /> */}
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
                                </span>{' '}
                                {props.agreement_link}
                            </p>
                        </div>
                        <button
                            type={agreement ? 'submit' : 'button'}
                            className={`${agreement
                                ? Object.keys(formik.errors).length == 0
                                    ? style.general_button_active
                                    : style.general_button_inactive
                                : style.general_button_inactive
                                } "button-submit"`}
                        >
                            {props.buttonText || 'Get catalog'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export function PopUpEvent (props) {
    onst[value, setValue] = useState('');
    const validate = useValidation();
    const router = useRouter();
    const modals = useModals();
    const dispatch = useDispatch();
    const [agreement, changeAgreement] = useState(false);
    const GAEvents = useGAEvents();

    const icon = {
        error: icons.error,
        agree: icons.agree,
    };

    function onAgreementChange () {
        changeAgreement(!agreement);
    }

    const handleChange = (newValue) => {
        setValue(newValue);
        formik.setFieldValue('phone', newValue);
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            phone: '',
            name: '',
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
            );
            modals.EventModalChangeVisibility();
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
                        {props.title || 'Fill in the form below'}
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
                            <InputEmail
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                error={formik.errors.email}
                            />
                            <div className={`${style.phone__input_block} ${formik.errors.phone ? 'phone__input__error' : ''}`}>
                                <PhoneInput
                                    className={formik.errors.phone ? style.fd : ''}
                                    initialValueFormat='national'
                                    international
                                    placeholder={props.callPlaceholder || "Phone*"}
                                    value={value}
                                    onChange={handleChange}
                                />
                                {formik.errors.phone ? <span className={style.error__message}>{formik.errors.phone}</span> : null}
                                {formik.errors.phone ? <div className={style.error_icon}>
                                    {icon.error}
                                </div> : value === "" ? <div className={style.error_icon}>
                                    {icon.error}
                                </div> : value !== null ? <div className={style.error_icon}>
                                    {icon.agree}
                                </div> : null}
                            </div>
                            {/* <InputCall
                                onChange={formik.handleChange}
                                value={formik.values.phone}
                                error={formik.errors.phone}
                            /> */}
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
                                </span>{' '}
                                {props.agreement_link}
                            </p>
                        </div>
                        <button
                            type={agreement ? 'submit' : 'button'}
                            className={`${agreement
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

export function PopUpNameEmail (props) {
    const validate = useValidation();
    const router = useRouter();
    const modals = useModals();
    const dispatch = useDispatch();
    const [agreement, changeAgreement] = useState(false);
    const GAEvents = useGAEvents();

    function onAgreementChange () {
        changeAgreement(!agreement);
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
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
            );
            modals.NameEmailModalChangeVisibility();
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
                    <p className={style.title}>{props.title}</p>
                    <p className={style.paragraph}>{props.subtitle}</p>
                </div>
                <div className={style.inputs_block__inputs}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={style.inputs_block__input}>
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
                                </span>{' '}
                                {props.agreement_link}
                            </p>
                        </div>
                        <button
                            type={agreement ? 'submit' : 'button'}
                            className={`${agreement
                                ? Object.keys(formik.errors).length == 0
                                    ? style.general_button_active
                                    : style.general_button_inactive
                                : style.general_button_inactive
                                } "button-submit"`}
                        >
                            {props.buttonText || 'Get'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
