import { useFormik } from "formik";
import { useRouter } from "next/router";
import { FunctionComponent, ReactNode } from "react";
import {
  DropDownList,
  InputCall,
  InputEmail,
  InputName,
} from "../../../InputForms/Inputs/Inputs";
import style from "./style.module.scss";
import Agreement from "../../Form/Agreement";

import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../../../store/actions/userData";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";
import { searchParams } from "../../../../store/searchParamsSlice";
import { postData } from "../../../functions/postData";
import { sendEventToConversionApi } from "../../../functions/sendFbPageView";
import { generateUUID } from "../../../functions/generateUUID";

const FormModal = (props) => {
  let validate = validation;

  const router = useRouter();
  const dispatch = useDispatch();
    const queryParams = useSelector(searchParams);
    const eventId = generateUUID();

  function onAgreementChange() {
    formik.setFieldValue(
      "isAgreePrivacyPolicy",
      !formik.values.isAgreePrivacyPolicy
    );
  }
  function onDateChange(item) {
    formik.setFieldValue("date", item.myName);
  }
  function onEquipmentTypeChange(item) {
    formik.setFieldValue("equipmentType", item.myName);
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      equipmentType: "",
      isAgreePrivacyPolicy: true,
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
        queryParams || router.query,
        [
          {
            name: "date",
            value: values.date,
            BXName: "UF_CRM_1599805349",
          },
          {
            name: "Type of Equipment",
            value: values.equipmentType,
            BXName: "UF_CRM_1624974650",
          },
        ]
      )
        .then(() => {
          formik.resetForm();
          ReactGA.event("generate_lead", {
            category: "form",
            action: "submit",
          });
          ReactPixel.track("Lead", { eventID: eventId });
          sendEventToConversionApi(
            window.location.href,
            "Lead",
            {
              email: values.email,
              phone: `+${values.phoneNumber}`,
            },
            eventId
          );
          document.body.className = "";
          router.push(props.thank_you_page_url);
        })
        .catch(console.log);
    },
  });

  function onQuitClick() {
    props.onQuitClick();
  }

  return (
    <div
      className={props.blogForm ? style.pop_up_form_blog : style.pop_up_form}
    >
      <div className={style.quit_block} onClick={onQuitClick}></div>
      <div
        className={`${
          props.blogForm ? style.wrapper_blog : style.wrapper
        } fade-up-animation`}
      >
        <div
          className={
            props.blogForm ? style.quit_button_out_right : style.quit_button_out
          }
        >
          <button
            className={
              props.blogForm ? style.quit_button_round : style.quit_button
            }
            onClick={onQuitClick}
          >
            {props.blogForm ? borderedCrossRound : borderedCross}
          </button>
        </div>
        <div className={style.title_cell}>
          <h2 className={style.title}>{props.title}</h2>
          <p className={style.text}>{props.text}</p>
        </div>
        <form
          className={props.blogForm ? style.form_blog : style.form}
          onSubmit={formik.handleSubmit}
        >
          <div
            className={
              props.blogForm ? style.inputs_wrapper_blog : style.inputs_wrapper
            }
          >
            <div className={props.blogForm ? style.cell_blog : style.cell}>
              <InputName
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.errors.name}
                theme="rounded"
                noIcons
                errorTheme="rounded_flat"
              />
              <InputEmail
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.errors.email}
                theme="rounded"
                noIcons
                errorTheme="rounded_flat"
              />
              <InputCall
                onChange={formik.handleChange}
                value={formik.values.phone}
                error={formik.errors.phone}
                theme="rounded"
                noIcons
                errorTheme="rounded_flat"
              />
            </div>
            {props.blogForm ? (
              <div className={style.blog_form_agreement}>
                <Agreement
                  active={formik.values.isAgreePrivacyPolicy}
                  onClick={onAgreementChange}
                  text={props.agreement__text}
                  text_req={props.agreement__text_req}
                  error={formik.errors.isAgreePrivacyPolicy}
                />
              </div>
            ) : null}

            {props.datesData ? (
              <div className={style.cell}>
                <DropDownList
                  onClick={(item) => {
                    onDateChange(item);
                  }}
                  error={formik.errors.date}
                  title={props.dateTitle}
                  data={props.datesData}
                  value={formik.values.date}
                />
                <DropDownList
                  onClick={(item) => {
                    onEquipmentTypeChange(item);
                  }}
                  error={formik.errors.equipmentType}
                  title={props.equpmentTypeTitle}
                  data={props.equipmentTypeData}
                  value={formik.values.equipmentType}
                />
                <Agreement
                  active={formik.values.isAgreePrivacyPolicy}
                  onClick={onAgreementChange}
                  text={props.agreement__text}
                  text_req={props.agreement__text_req}
                  error={formik.errors.isAgreePrivacyPolicy}
                />
              </div>
            ) : null}
          </div>
          <div
            className={
              props.blogForm ? style.submit_wrapper_blog : style.submit_wrapper
            }
          >
            <button
              type="submit"
              className={style.button_submit}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? props.submittingText : props.buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
const borderedCross = (
  <svg
    width="35"
    height="35"
    viewBox="0 0 35 35"
    fill="none"
    className={style.bordered_cross}
  >
    <rect x="0.5" y="0.5" width="34" height="34" rx="17" stroke="#8E8E8E" />
    <path
      d="M47 12.41L45.59 11L40 16.59L34.41 11L33 12.41L38.59 18L33 23.59L34.41 25L40 19.41L45.59 25L47 23.59L41.41 18L47 12.41Z"
      fill="white"
    />
  </svg>
);

const borderedCrossRound = (
  <svg
    width="49"
    height="49"
    viewBox="0 0 49 49"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="48" height="48" rx="24" stroke="#8E8E8E" />
    <path
      d="M16 16L33 33M16 33L33 16"
      stroke="#8E8E8E"
      stroke-width="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const validation = (values) => {
  const errors = {};

  if (values.name !== undefined) {
    if (values.name === "") {
      errors.name = "Required";
    }
  }
  if (values.email !== undefined) {
    if (values.email === "") {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Wrong email";
    }
  }
  if (values.phone !== undefined) {
    if (values.phone === "") {
      errors.phone = "Required";
    } else if (
      !/^[\+]?[(]?[0-9]{1,3}[)]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{1,3}[-\s\.]?[0-9]{1,13}$/im.test(
        values.phone
      )
    ) {
      errors.phone = "Wrong phone number";
    }
  }
  if (values.isAgreePrivacyPolicy !== undefined) {
    if (values.isAgreePrivacyPolicy === false) {
      errors.isAgreePrivacyPolicy = "Required";
    }
  }
  return errors;
};
