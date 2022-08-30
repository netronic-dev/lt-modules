import { useFormik } from "formik";
import { useState } from "react";
import style from "../forms.module.scss";
import { useRouter } from "next/router";
import { InputName, InputCall, InputEmail } from "../Inputs/Inputs"
import { useInView } from "react-hook-inview";
import { postData } from "../../functions/postData";
import { useValidation } from "../../../context/ValidationProvider";

const buttonTheme = {
  "general": style.general_button_inactive,
  "black": style.button_black_inactive,
  "bigBlack": style.button_big_black_inactive,
}

const buttonActiveTheme = {
  "general": style.general_button_active,
  "white": style.button_white_active,
  "black": style.button_black_active,
  "bigBlack": style.button_big_black_active,
}
const themeFormTheme = {
  "general": style.theme_form,
  "mobile": style.theme_form_mobile,
}

export function ThemeForm(props) {

  const validate = useValidation()
  const router = useRouter();

  const formik = useFormik({

    initialValues: {
      name: "",
      phone: ""
    },
    validate,
    onSubmit: () => {
      postData(values, props.destinationURL, props.orderName, props.lang, window.location.hostname, router.query)
      router.push("/thanks-pres").then(() => router.reload());
      document.body.className = "";
    },

  });

  return (
    <form onSubmit={formik.handleSubmit} className={themeFormTheme[props.formTheme ? props.formTheme : "general"]}>
      <div className={style.inputs}>
        <InputName
          theme={props.theme}
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
        />
        <InputCall
          theme={props.theme}
          onChange={formik.handleChange}
          value={formik.values.phone}
          error={formik.errors.phone}
        />
      </div>
      <button
        type="submit"
        className={`
        ${Object.keys(formik.errors).length == 0 ?
            buttonActiveTheme[props.buttonActiveTheme]
            :
            buttonTheme[props.buttonTheme]
          }
        `}
      >
        {props.buttonText}
      </button>
    </form>
  )
}

export function ThemeFormAll(props) {
  const validate = useValidation()
  const router = useRouter();

  const formik = useFormik({

    initialValues: {
      name: "",
      email: "",
      phone: ""
    },
    validate,
    onSubmit: () => {
      postData(values, props.destinationURL, props.orderName, props.lang, window.location.hostname, router.query)
      router.push("/thanks-pres").then(() => router.reload());
      document.body.className = "";
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={themeFormTheme[props.formTheme ? props.formTheme : "general"]}>
      <div className={style.inputs}>
        <InputName
          theme={props.theme}
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
        />
        <InputEmail
          theme={props.theme}
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <InputCall
          theme={props.theme}
          onChange={formik.handleChange}
          value={formik.values.phone}
          error={formik.errors.phone}
        />
      </div>
      <button
        type="submit"
        className={`
        ${Object.keys(formik.errors).length == 0 ?
            buttonActiveTheme[props.buttonActiveTheme]
            :
            buttonTheme[props.buttonTheme]
          }
        `}
      >
        {props.buttonText}
      </button>
    </form>
  )
}

export function FormWMaterials(props) {
  const validate = useValidation()
  const [ref, IsVisible] = useInView({
    unobserveOnEnter: true
  })

  const [agreement, changeAgreement] = useState(false)

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      materials: false
    },
    validate,
    onSubmit: () => {
      postData(values, props.destinationURL, props.orderName, props.lang, window.location.hostname, router.query)
      router.push("/thanks-pres").then(() => router.reload());
      document.body.className = "";
    },
  });

  function onAgreementChange() {
    changeAgreement(!agreement)
  }

  return (
    <form ref={ref} key={IsVisible ? 1 : 0} onSubmit={formik.handleSubmit} className={style.form_materials}>
      <div className={`${style.form_materials__input} ${style.name}`}>
        <InputName
          className="zoom-animation"
          error_1
          theme={props.theme}
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
          errorTheme={props.errorTheme}
          correct={formik.values.name ? formik.errors.name ? false : true : false}
        />
      </div>
      <div className={`${style.form_materials__input} ${style.email}`}>
        <InputEmail
          error_1
          className="zoom-animation animated-second"
          theme={props.theme}
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
          errorTheme={props.errorTheme}
          correct={formik.values.email ? formik.errors.email ? false : true : false}
        />
      </div>
      <div className={style.cell}>
        <button
          type="submit"
          className={`
        ${Object.keys(formik.errors).length == 0 ?
              buttonActiveTheme[props.buttonActiveTheme]
              :
              buttonTheme[props.buttonTheme]
            }
        `}
        >
          {props.buttonText}
        </button>
      </div>
      <div
        onClick={onAgreementChange}
        className={`${style.agreement} fade-animation`}
      >
        <Dot active={agreement ? true : false} colorDot={props.colorDot} />
        <input
          className={style.radioBox}
          name="materials"
          type='radio'
          id="radioBox-materials"
          value={agreement}
        />
        {props.materialsAgreementText}
      </div>
    </form>
  )
}

const Dot = (props) => {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      className={style.dot}
    >
      <circle
        cx="10.5"
        cy="10.5"
        r="10"
        stroke={props.colorDot}
        className={style.dot_border}
      />
      {props.active ?
        <circle
          cx="10.5"
          cy="10.5"
          r="6.5"
          fill={props.colorDot}
          className={style.dot_point}
        />
        : null}
    </svg>)
}