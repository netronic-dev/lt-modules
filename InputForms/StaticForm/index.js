import { useFormik } from 'formik';
import style from '../forms.module.scss';
import { useRouter } from 'next/router';
import { InputName, InputCall, InputEmail } from '../Inputs/Inputs';
import { postData } from '../../functions/postData.ts';
import { useValidation } from '../../../context/ValidationProvider';

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
    const validate = useValidation();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: '',
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
            ).then(router.push('/thanks-pres'));
        },
    });

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
                    placeholder={props.namePlaceholder}
                />
                <InputCall
                    theme={props.theme}
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    error={formik.errors.phone}
                    placeholder={props.callPlaceholder}
                />
            </div>
            <button
                type='submit'
                className={`
        ${
            Object.keys(formik.errors).length == 0
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

export function ThemeFormAll(props) {
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
            ).then(router.push('/thanks-pres'));
        },
    });

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
                <InputCall
                    theme={props.theme}
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    error={formik.errors.phone}
                    placeholder={props.placeholderCall}
                />
            </div>
            <button
                type='submit'
                className={`
        ${
            Object.keys(formik.errors).length == 0
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
