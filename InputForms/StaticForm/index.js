import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import style from "../forms.module.scss";
import { useRouter } from "next/router";
import { validate } from "../validate/validate"
import { icons } from "../icons/icons"
import { InputName, InputCall, InputEmail, DropDownList } from "../Inputs/Inputs"
import { Fade } from "react-awesome-reveal";
import { useInView } from "react-hook-inview";

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

  const router = useRouter();

  const formik = useFormik({

    initialValues: {
      name: "",
      phoneNumber: ""
    },
    validate,
    onSubmit: () => {
      setTimeout(() => {
        router.push("/thanks-pres").then(() => router.reload());
        document.body.className = "";
      }, 400);
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
          nameFormID={props.formID}
        />
        <InputCall
          theme={props.theme}
          onChange={formik.handleChange}
          value={formik.values.phoneNumber}
          error={formik.errors.phoneNumber}
          phoneFormID={props.formID}
        />
      </div>
      <button
        type="submit"
        id={Object.keys(formik.errors).length == 0 ? props.id : null}
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

  const router = useRouter();

  const formik = useFormik({

    initialValues: {
      name: "",
      email: "",
      phoneNumber: ""
    },
    validate,
    onSubmit: () => {
      setTimeout(() => {
        router.push("/thanks-pres").then(() => router.reload());
        document.body.className = "";
      }, 400);
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
          nameFormID={props.formID}
        />
        <InputEmail
          theme={props.theme}
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
          emailFormID={props.formID}
        />
        <InputCall
          theme={props.theme}
          onChange={formik.handleChange}
          value={formik.values.phoneNumber}
          error={formik.errors.phoneNumber}
          phoneFormID={props.formID}
        />
      </div>
      <button
        type="submit"
        id={Object.keys(formik.errors).length == 0 ? props.id : null}
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
      setTimeout(() => {
        router.push("/thanks-pres").then(() => router.reload());
        document.body.className = "";
      }, 400);
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
          nameFormID={props.formID}
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
          emailFormID={props.formID}
          errorTheme={props.errorTheme}
          correct={formik.values.email ? formik.errors.email ? false : true : false}
        />
      </div>
      <div className={style.cell}>
        <button
          type="submit"
          id={Object.keys(formik.errors).length == 0 ? props.id : null}
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
      <Fade direction="up" triggerOnce>
        <div onClick={onAgreementChange} className={style.agreement}>
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
      </Fade>
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