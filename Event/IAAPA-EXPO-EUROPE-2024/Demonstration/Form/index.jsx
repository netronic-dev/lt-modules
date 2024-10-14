import { useFormik } from "formik";
import { useRouter } from "next/router";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-dropdown";
import style from "./style.module.scss";
import Agreement from "../Agreement";
import { postData } from "../../../../functions/postData";
import ReactGA from "react-ga4";
import { addUserData } from "../../../../../store/userSlice";
import ReactPixel from "react-facebook-pixel";
import { searchParams } from "../../../../../store/searchParamsSlice";
import { sendEventToConversionApi } from "../../../../functions/sendFbPageView";
import {
  InputCompanyName,
  InputCountry,
  InputEmail,
  InputName,
  InputWebsite,
} from "./Inputs/Inputs";
import { useEffect, useRef, useState } from "react";
import { useModals } from "../../../../../context/ModalsProvider";
import { isValidPhoneNumber } from "libphonenumber-js";
import { Icon } from "../../../../../components/Icon";

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

  function onBudgetChange(item) {
    formik.setFieldValue("budget", item.value);
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      companyName: "",
      website: "",
      country: "",
      method: "",
      budget: "",
      equipmentType: "",
      isAgreePrivacyPolicy: true,
    },
    validate,
    onSubmit: async (values) => {
      try {
        dispatch(addUserData(values.name));

        const data = {
          ...values,
          phoneNumber: `+${values.phone}`,
        };

        await postData(
          data,
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

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        handleBudgetBlur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const [isFocused, setIsFocused] = useState(false);

  const handleBudgetFocus = () => setIsFocused(true);

  const handleBudgetBlur = () => {
    if (!formik.values.budget) {
      setIsFocused(false);
    }
  };

  return (
    <form className={style.form} onSubmit={formik.handleSubmit} id={props.id}>
      <div className={style.inputs_wrapper}>
        <div className={style.cell}>
          <InputName
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.errors.name}
            touched={formik.touched.name}
            theme="rounded"
            noIcons
            errorTheme="rounded_flat"
          />
          <InputEmail
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.errors.email}
            touched={formik.touched.email}
            theme="rounded"
            noIcons
            errorTheme="rounded_flat"
          />
          <label className={style.label_wrapper}>
            <span
              className={`${style.dropdown_label} ${
                isFocused || formik.values.budget ? style.label_active : ""
              }`}
            >
              {props.label || "Budget range"}
              <Icon name="icon-label-star" width={7} height={7} />
            </span>
            <div ref={dropdownRef}>
              <Dropdown
                className="dropdown"
                options={props.budgetData}
                onChange={(item) => onBudgetChange(item)}
                value={formik.values.budget}
                placeholder=""
                onFocus={handleBudgetFocus}
              />
            </div>
          </label>
          <InputCountry
            onChange={formik.handleChange}
            value={formik.values.country}
            error={formik.errors.country}
            touched={formik.touched.country}
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
        </div>
        <div className={style.cell}>
          <InputCompanyName
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.companyName}
            error={formik.errors.companyName}
            touched={formik.touched.companyName}
            theme="rounded"
            noIcons
          />
          <PhoneInput
            country={regionCode}
            excludeCountries={"ru"}
            value={formik.values.phone}
            onChange={(value) => formik.setFieldValue("phone", value)}
            onBlur={() => formik.setFieldTouched("phone")}
            inputStyle={{
              width: "100%",
              height: "55px",
              padding: "16px 14px",
              paddingLeft: "48px",
              borderRadius: "8px",
              border: `1px solid ${
                (formik.errors.phone && formik.touched.phone) ||
                (!formik.errors.phone &&
                  formik.values.phone &&
                  !isValidPhoneNumber(`+${formik.values.phone}`))
                  ? "#d22e2e"
                  : "#000"
              }`,
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
              borderColor:
                (formik.errors.phone && formik.touched.phone) ||
                (!formik.errors.phone &&
                  formik.values.phone &&
                  !isValidPhoneNumber(`+${formik.values.phone}`))
                  ? "#d22e2e"
                  : "#000",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
            containerClass="responsive-input-container"
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className={style.error_rounded_flat}>{formik.errors.phone}</p>
          )}
          {!formik.errors.phone &&
            formik.values.phone &&
            !isValidPhoneNumber(`+${formik.values.phone}`) && (
              <p className={style.error_rounded_flat}>Invalid phone number</p>
            )}
          <InputWebsite
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.website}
            error={formik.errors.website}
            touched={formik.touched.website}
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
          disabled={
            formik.isSubmitting ||
            Object.keys(formik.errors).length > 0 ||
            formik.values.name === "" ||
            formik.values.phone === "" ||
            formik.values.email === "" ||
            formik.values.isAgreePrivacyPolicy === false
          }
        >
          {formik.isSubmitting
            ? props.submittingText || "Submitting..."
            : props.buttonText}
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

  if (values.phone !== undefined) {
    if (values.phone === "") {
      errors.phone = "Required";
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

  if (values.companyName !== undefined) {
    if (values.companyName === "") {
      errors.companyName = "Required";
    }
  }

  if (values.budget !== undefined) {
    if (values.budget === "") {
      errors.budget = "Required";
    }
  }
  return errors;
};
