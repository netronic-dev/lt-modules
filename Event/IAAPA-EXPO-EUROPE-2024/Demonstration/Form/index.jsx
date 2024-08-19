import { useFormik } from "formik";
import { useRouter } from "next/router";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-dropdown";
import style from "./style.module.scss";
import Agreement from "../Agreement";
import { postData } from "../../../../functions/postData";
import { setUserData } from "../../../../../store/actions/userData";
import ReactGA from "react-ga4";
import { addUserData } from "../../../../../store/userSlice";
import ReactPixel from "react-facebook-pixel";
import { searchParams } from "../../../../../store/searchParamsSlice";
import { sendEventToConversionApi } from "../../../../functions/sendFbPageView";
import {
  InputCall,
  InputComment,
  InputCountry,
  InputEmail,
  InputName,
  InputWebsite,
} from "./Inputs/Inputs";
import { useEffect, useState } from "react";
import { useModals } from "../../../../../context/ModalsProvider";
import { isValidPhoneNumber } from "libphonenumber-js";
const Form = (props) => {
  let validate = validation;
  const [regionCode, setRegionCode] = useState();
  const modal = useModals();

  useEffect(() => {
    modal?.region
      ? setRegionCode(modal?.region.toLowerCase())
      : setRegionCode("us");
  }, [modal.region]);

  const router = useRouter();
  const dispatch = useDispatch();
  const queryParams = useSelector(searchParams);

  function onAgreementChange() {
    formik.setFieldValue(
      "isAgreePrivacyPolicy",
      !formik.values.isAgreePrivacyPolicy
    );
  }
  function onMethodChange(item) {
    formik.setFieldValue("method", item.value);
  }
  function onEquipmentTypeChange(item) {
    formik.setFieldValue("equipmentType", item.value);
  }
  function onEquipmentTypeOfBusinessChange(item) {
    formik.setFieldValue("typeOfBusiness", item.value);
  }
  function onBudgetChange(item) {
    formik.setFieldValue("budget", item.value);
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      website: "",
      comment: "",
      country: "",
      method: "",
      typeOfBusiness: "",
      budget: "",
      equipmentType: "",
      isAgreePrivacyPolicy: true,
    },
    validate,
    onSubmit: async (values) => {
      try {
        dispatch(addUserData(values.name));

        await postData(
          values,
          props.destinationURL,
          props.orderName,
          window.location.href,
          window.location.hostname,
          queryParams || router.query
        );

        ReactGA.event("generate_lead", {
          category: "form",
          action: "submit",
        });
        ReactPixel.track("Lead");
        sendEventToConversionApi(window.location.href, "Lead");
        document.body.className = "";
        router.push(props.thank_you_page_url);
      } catch (error) {
        console.log(error, "error");
        console.log(error.response, "error.response");
        handleServerErrors(error.response.data);
      }
    },
  });

    const handleServerErrors = (error) => {
      console.log(error, "error");
      Object.entries(error).forEach(([key, message]) => {
        if (["name", "email", "phone"].includes(key)) {
          formik.setFieldError(key, message);
        }
      });
      };

  return (
    <form className={style.form} onSubmit={formik.handleSubmit}>
      <div className={style.inputs_wrapper}>
        <div className={style.cell}>
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
          <InputWebsite
            onChange={formik.handleChange}
            value={formik.values.website}
            error={formik.errors.website}
            theme="rounded"
            noIcons
          />
          <Dropdown
            className="dropdown"
            options={props.methodsData}
            onChange={(item) => {
              onMethodChange(item);
            }}
            value={formik.values.method}
            placeholder="Preferred contact method"
          />
          <Dropdown
            className="dropdown"
            options={props.typeOfBusinessData}
            onChange={(item) => {
              onEquipmentTypeOfBusinessChange(item);
            }}
            value={formik.values.typeOfBusiness}
            placeholder="Type of business"
          />
        </div>
        <div className={style.cell}>
          <PhoneInput
            country={regionCode}
            excludeCountries={"ru"}
            value={formik.values.phone}
            onChange={(value) => formik.setFieldValue("phone", value)}
            inputStyle={{
              width: "100%",
              height: "55px",
              padding: "16px 14px",
              paddingLeft: "48px",
              borderRadius: "8px",
              border: "1px solid #000",
              background: "#fff",
              color: "#000",
              fontFamily: "Manrope",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "23px",
            }}
            inputClass="responsive-input"
            buttonStyle={{
              borderColor: formik.errors.phone ? "#d22e2e" : "#000",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
            containerClass="responsive-input-container"
          />
          <Dropdown
            className="dropdown"
            options={props.budgetData}
            onChange={(item) => {
              onBudgetChange(item);
            }}
            value={formik.values.budget}
            placeholder="Budget range*"
          />
          <InputCountry
            onChange={formik.handleChange}
            value={formik.values.country}
            error={formik.errors.country}
            theme="rounded"
            noIcons
            errorTheme="rounded_flat"
          />
          <Dropdown
            className="dropdown"
            onChange={(item) => {
              onEquipmentTypeChange(item);
            }}
            options={props.equipData}
            value={formik.values.equipmentType}
            placeholder="How do you plan to use the equipment?"
          />
          <InputComment
            onChange={formik.handleChange}
            value={formik.values.comment}
            error={formik.errors.comment}
            theme="rounded"
            noIcons
            errorTheme="rounded_flat"
          />
        </div>
      </div>
      <Agreement
        active={formik.values.isAgreePrivacyPolicy}
        onClick={onAgreementChange}
        text={props.agreement__text}
        text_req={props.agreement__text_req}
        error={formik.errors.isAgreePrivacyPolicy}
      />
      <div className={style.submit_wrapper}>
        <button
          type="submit"
          className={style.button_submit}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? props.submittingText : props.buttonText}
        </button>
      </div>
    </form>
  );
};

export default Form;

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
  if (values.isAgreePrivacyPolicy !== undefined) {
    if (values.isAgreePrivacyPolicy === false) {
      errors.isAgreePrivacyPolicy = "Required";
    }
  }
  if (values.budget !== undefined) {
    if (values.budget === "") {
      errors.budget = "Required";
    }
  }
  return errors;
};
