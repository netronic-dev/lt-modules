import style from "./style.module.scss"
import { DropDownList, InputCall, InputEmail, InputName } from "../../InputForms/Inputs/Inputs"
import { useFormik } from "formik";
import { useState } from "react";
import { useRouter } from "next/router";

export default function IAAPAForm(props) {
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
    },
    validate,
    onSubmit: (values) => {
      setTimeout(() => {
        router.push(props.thank_you_link).then(() => router.reload());
      }, 400);
    },
  });

  return (
    <section className={style.form_block} id="form">
      <div className={style.form_block_in}>
        <img
          src="/black-friday/form-bg-left.svg"
          className={style.bg_feature_left}
        />
        <img
          src="/black-friday/form-bg-right.svg"
          className={style.bg_feature_right}
        />
        <div className={style.form_block_in_in}>
          <h2 className={style.title}>
            {props.title}
          </h2>
          <p className={style.text}>
            {props.text}
          </p>
          <form onSubmit={formik.handleSubmit} className={style.form}>
            <div className={style.inputs}>
              <InputName
                en={props.en}
                theme={props.theme}
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.errors.name}
                nameFormID="black-friday-"
                theme="rounded"
                noIcons
                errorTheme="rounded_flat"
                bg_color="#D6D6D6"
                color="#040E18"
                placeholder={props.placeholderName}
              />
              <InputEmail
                en={props.en}
                theme={props.theme}
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.errors.email}
                emailFormID="black-friday-"
                theme="rounded"
                noIcons
                errorTheme="rounded_flat"
                bg_color="#D6D6D6"
                color="#040E18"
                placeholder={props.placeholderEmail}
              />
              <InputCall
                en={props.en}
                theme={props.theme}
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                error={formik.errors.phoneNumber}
                phoneFormID="black-friday-"
                theme="rounded"
                noIcons
                errorTheme="rounded_flat"
                bg_color="#D6D6D6"
                color="#040E18"
                placeholder={props.placeholderCall}
              />
            </div>
            <button
              className={`${style.button_submit} ${Object.keys(formik.errors).length == 0 ? style.button_submit_active : ""}`}
              type={"submit"}
              id={Object.keys(formik.errors).length == 0 ? props.submit_button_id : null}
            >{props.submit_button_text}</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export const validate = (values) => {
  const errors = {};
  if (values.name === "") {
    errors.name = "Required";
  }
  if (values.email === "") {
    errors.email = "Required";
  }
  if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Wrong email";
  }
  if (values.phoneNumber === "") {
    errors.phoneNumber = "Required";
  }
  if (!/^[\+]?[(]?[0-9]{1,3}[)]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{1,3}[-\s\.]?[0-9]{1,13}$/im.test(values.phoneNumber)) {
    errors.phoneNumber = "Wrong phone number";
  }
  if (values.date === "") {
    errors.date = "Required";
  }
  return errors;
};
