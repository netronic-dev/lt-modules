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
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

function turnOnScroll () {
    document.body.className = '';
}

export function PopUpNamePhone (props) {
    const [valid, setValid] = useState(null);
    const [phone, setPhone] = useState(null);
    const [regionCode, setRegionCode] = useState();
    // const validate = useValidation();
    const router = useRouter();
    const modal = useModals();
    const dispatch = useDispatch();
    const [agreement, changeAgreement] = useState(false);
    const GAEvents = useGAEvents();

    function onAgreementChange () {
        changeAgreement(!agreement);
    }

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
            );
            modal.NamePhoneModalChangeVisibility();
            router.push(props.thank_you_page);
            turnOnScroll();
        },
    });

    useEffect(() => {
        console.log(modal?.region);
        modal?.region ? setRegionCode(modal?.region.toLowerCase()) : setRegionCode('us');
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
                                noIcons
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                error={formik.errors.name}
                                placeholder={props.namePlaceholder}
                            />
                            <div className={`${style.phone__input_block} ${formik.errors.phone ? 'phone__input__error' : ''}`}>
                                <PhoneInput
                                    containerClass='catalog_input__phone_container'
                                    inputClass={valid ? 'input__phone' : 'input__phone_error'}
                                    buttonClass={valid ? 'drop_down' : 'drop_down_error'}
                                    country={regionCode}
                                    enableSearch
                                    placeholder={props.callPlaceholder}
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
    const [valid, setValid] = useState(null);
    const [phone, setPhone] = useState(null);
    const [regionCode, setRegionCode] = useState();
    // const validate = useValidation();
    const router = useRouter();
    const modal = useModals();
    const [agreement, changeAgreement] = useState(false);
    const GAEvents = useGAEvents();

    function onAgreementChange () {
        changeAgreement(!agreement);
    }

    const validate = (values) => {
        const errors = {};

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
            email: '',
            phone: false,
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
            );
            modal.EmailPhoneModalChangeVisibility();
            router.push(props.thank_you_page);
            turnOnScroll();
        },
    });

    useEffect(() => {
        modal?.region ? setRegionCode(modal?.region.toLowerCase()) : setRegionCode('us');
    }, [modal.region]);

    console.log(formik.errors);

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
                                noIcons
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                error={formik.errors.email}
                                placeholder={props.emailPlaceholder}
                            />
                            <div className={`${style.phone__input_block} ${formik.errors.phone ? 'phone__input__error' : ''}`}>
                                <PhoneInput
                                    containerClass='catalog_input__phone_container'
                                    inputClass={valid ? 'input__phone' : 'input__phone_error'}
                                    buttonClass={valid ? 'drop_down' : 'drop_down_error'}
                                    country={regionCode}
                                    enableSearch
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
    const [valid, setValid] = useState(null);
    const [phone, setPhone] = useState(null);
    const [regionCode, setRegionCode] = useState();
    // const validate = useValidation();
    const router = useRouter();
    const modal = useModals();
    const dispatch = useDispatch();
    const [agreement, changeAgreement] = useState(false);
    const GAEvents = useGAEvents();

    function onAgreementChange () {
        changeAgreement(!agreement);
    }

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

    useEffect(() => {
        console.log(modal?.region);
        modal?.region ? setRegionCode(modal?.region.toLowerCase()) : setRegionCode('us');
    }, [modal.region]);

    const formik = useFormik({
        initialValues: {
            email: '',
            phone: false,
            name: '',
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
                                    containerClass='input__phone_container'
                                    inputClass={valid ? 'input__phone' : 'input__phone_error'}
                                    buttonClass={valid ? 'drop_down' : 'drop_down_error'}
                                    country={regionCode}
                                    enableSearch
                                    placeholder={props.phonePlaceholder}
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
    const modal = usemodal();
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
            modal.NameEmailModalChangeVisibility();
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

