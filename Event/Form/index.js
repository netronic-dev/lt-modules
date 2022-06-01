import style from "./style.module.scss"
import { InputCall, InputEmail, InputName } from "../../InputForms/Inputs/Inputs"
import { useFormik } from "formik";
import { useState } from "react";
import { useRouter } from "next/router";

export default function IAAPAForm(props) {

  const validate = props.validate

  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      agreement: true
    },
    validate,
    onSubmit: (values) => {
      setTimeout(() => {
        router.push(props.thankYouLink).then(() => router.reload());
      }, 400);
    },
  });

  function onAgreementChange() {
    formik.setFieldValue("agreement", !formik.values.agreement)
  }

  return (
    <section className={style.form_block} id="form">
      <div className={style.form_block_in}>
        <div className={style.form_block_in_in}>
          <h2 className={style.title}>
            {props.title}
          </h2>
          <p className={style.text}>
            {props.text}
          </p>
          <form onSubmit={formik.handleSubmit} className={style.form}>
            <div
              className={style.inputs}
              style={{ gridTemplateColumns: `repeat(${props.gridColumns}, 1fr)` }}
            >
              {props.name ?
                <InputName
                  en={props.en}
                  theme={props.theme}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  error={formik.errors.name}
                  nameFormID="event-"
                  theme="rounded"
                  noIcons
                  errorTheme="rounded_flat"
                /> : ""}
              {props.email ?
                <InputEmail
                  en={props.en}
                  theme={props.theme}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  error={formik.errors.email}
                  emailFormID="event-"
                  theme="rounded"
                  noIcons
                  errorTheme="rounded_flat"
                /> : ""}
              {props.phone ?
                <InputCall
                  en={props.en}
                  theme={props.theme}
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                  error={formik.errors.phoneNumber}
                  phoneFormID="event-"
                  theme="rounded"
                  noIcons
                  errorTheme="rounded_flat"
                /> : ""}
            </div>
            <Agreement
              onClick={onAgreementChange}
              active={formik.values.agreement}
              agreementText={props.agreementText}
              agreementLink={props.agreementLink}
              error={formik.errors.agreement}
            />
            <button
              className={`${style.button_submit}
              ${Object.keys(formik.errors).length == 0 ?
                  style.button_submit_active : ""}
              `}
              type={Object.keys(formik.errors).length == 0 ?
                "submit" : "button"}
              id={Object.keys(formik.errors).length == 0 ?
                props.submitButtonId : ""}
            >
              {props.submitButtonText}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

function Agreement(props) {
  return (
    <div className={style.agreement}>
      <div
        className={style.agreement_button}
        onClick={props.onClick}
      >
        <AgreementArrow
          active={props.active}
        />
      </div>
      <div className={style.agreement_text}>
        <span
          className={style.agreement_text__text}
          onClick={props.onClick}
        >
          {props.agreementText}
        </span>{" "}
        <span className={style.agreement_text__link}>
          {props.agreementLink}
        </span>
        <span className={style.agreement_error}>
          {props.error}
        </span>
      </div>
    </div>
  )
}

function AgreementArrow(props) {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 25 25"
      fill="none"
      className={style.agreement_arrow}
    >
      <rect
        x="1.49854"
        y="1"
        width="23"
        height="23"
        rx="11.5"
        stroke="#8E8E8E"
      />
      {props.active ?
        <path
          d="M17.59 10L13 14.58L8.41 10L7 11.41L13 17.41L19 11.41L17.59 10Z"
          fill="#0090FF"
        />
        : ""}
    </svg>

  )
}