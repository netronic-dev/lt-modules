import { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactGA from "react-ga4";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import axios from "axios";
import { debounce } from "lodash";
// import Turnstile from "../../../lt-modules/functions/Turnstile";
import { searchParams } from "../../../store/searchParamsSlice";
import { useModals } from "../../../context/ModalsProvider";
import { schema } from "../../../Layouts/winnerValidate";
import style from "./style.module.scss";
import { postData } from "../../functions/postData";
import { sendEventToConversionApi } from "../../functions/sendFbPageView";
import { generateUUID } from "../../functions/generateUUID";
import { handleServerFormErrors } from "../../functions/handleServerFormErrors";
import { Icon } from "../../../components/Icon";

const Form = ({ thank_you_page_url, onClick }) => {
  const [regionCode, setRegionCode] = useState("");
  const modals = useModals();
  const router = useRouter();
  const eventId = generateUUID();
  // const [turnstileToken, setTurnstileToken] = useState("");
  // const formRenderTime = useRef(Date.now());

  // useEffect(() => {
  //   formRenderTime.current = Date.now();
  // }, []);

  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
    reset,
    getValues,
    setError,
    setValue,
    trigger,
    register,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      agreement: true,
      // middle_name: "",
    },
  });

  const debouncedSubmit = debounce(async (type, siteName) => {
    try {
      await axios.post("https://back.netronic.net/forms/trackSubmit", {
        type: type,
        siteName: siteName,
      });
    } catch (error) {
      console.error("Error tracking submit:", error);
    }
  }, 300);

  const handleAgreementChange = () => {
    setValue("agreement", !getValues("agreement"));
    trigger("agreement");
  };

  const queryParams = useSelector(searchParams);

  const onSubmit = async (values) => {
    // if (values.middle_name) {
    //   console.warn("Spam bot detected via honeypot!");
    //   return;
    // }

    // const elapsedTime = (Date.now() - formRenderTime.current) / 1000;
    // if (elapsedTime < 4) {
    //   console.warn(`Form submitted too fast: ${elapsedTime}s`);
    //   alert("Please take your time filling out the form.");
    //   return;
    // }

    // if (!turnstileToken) {
    //   alert("Please wait for the CAPTCHA to be verified.");
    //   return;
    // }
    debouncedSubmit("attempt", window.location.hostname);
    modals?.setUserName(values.name);

    const data = {
      ...values,
      phoneNumber: `+${values.phoneNumber}`,
      // turnstileToken,
    };

    try {
      await postData(
        data,
        "https://back.netronic.net/forms",
        `Easy Start`,
        window.location.href,
        window.location.hostname,
        queryParams || router.query,
      );

      debouncedSubmit("success", window.location.hostname);
      reset();
      ReactGA.event("generate_lead", {
        event_category: "form",
        event_label: "submit",
        page_path: router.pathname,
      });
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", {}, { eventID: eventId });
      }
      sendEventToConversionApi(
        window.location.href,
        "Lead",
        {
          email: values.email,
          phone: `+${values.phoneNumber}`,
        },
        eventId,
      );

      modals.closeModal();
      router.push("/thanks-call");
    } catch (error) {
      console.log(error);
      if (error?.response?.data) {
        handleServerFormErrors(error.response.data, setError);
      } else {
        console.error("Form submission error:", error);
      }
    }
  };

  useEffect(() => {
    modals?.region
      ? setRegionCode(modals?.region.toLowerCase())
      : setRegionCode("us");
  }, [modals.region]);

  return (
    <div className={`${style.container}`}>
      <div onClick={onClick} className={style.btn_close_wrapper}>
        <Icon
          className={style.btn_close}
          name="icon-cross"
          width={10}
          height={10}
        />
      </div>
      <h2 className={style.title}>Request Your Offer</h2>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        {/* <div
          style={{ position: "absolute", left: "-9999px" }}
          aria-hidden="true"
        >
          <input
            type="text"
            tabIndex="-1"
            autoComplete="middle_name"
            id="middle_name"
            {...register("middle_name")}
          />
        </div> */}
        <div className={style.input__label}>
          <input
            className={style.input}
            style={{
              borderColor: errors.name ? "#d22e2e" : "#000",
            }}
            error={errors.name ? "true" : "false"}
            {...register("name", {
              required: "Name is required",
            })}
            placeholder="Name*"
          />
          <p className={style.error__message}>{errors.name?.message}</p>
        </div>
        <div className={style.input__label}>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                international
                inputStyle={{
                  height: "55px",
                  width: "100%",
                  boxSizing: "border-box",
                  borderRadius: "8px",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderColor: errors.phoneNumber ? "#d22e2e" : "#000",
                  color: "#000",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "140px",
                  outline: "0",
                  backgroundColor: "#fff",
                }}
                buttonStyle={{
                  borderColor: errors.phoneNumber ? "#d22e2e" : "#000",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  height: "55px",
                }}
                country={regionCode}
                enableSearch
                excludeCountries={["ru"]}
                value={value}
                onChange={onChange}
                error={
                  value
                    ? isValidPhoneNumber(`+${value}`)
                      ? undefined
                      : "Invalid phone number"
                    : "Phone number is required"
                }
              />
            )}
          />
          {errors.phoneNumber && (
            <p className={style.error__message}>
              {errors.phoneNumber?.message}
            </p>
          )}
        </div>
        <div className={style.input__label}>
          <input
            className={style.input}
            style={{
              borderColor: errors.email ? "#d22e2e" : "#000",
            }}
            error={errors.email ? "true" : "false"}
            {...register("email", {
              required: "Email is required",
            })}
            placeholder="Email*"
          />
          <p className={style.error__message}>{errors.email?.message}</p>
        </div>
        <Controller
          name="agreement"
          control={control}
          render={({ field }) => (
            <Agreement
              agreement={field.value}
              agreementText="I confirm that I have read and agree to"
              agreementSpanText="the terms of the privacy policy"
              error={errors.agreement?.message}
              register={register}
              onAgreementChange={handleAgreementChange}
              isWinnerForm
            />
          )}
        />
        {/* <Turnstile
          siteKey={
            process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ??
            "0x4AAAAAAD9nNenDNZ5KX93b"
          }
          onSuccess={(token) => setTurnstileToken(token)}
          onExpire={() => setTurnstileToken("")}
        /> */}
        <button
          className={style.winner_form_button}
          type="submit"
          // disabled={!isValid || isSubmitting || !turnstileToken}
          disabled={!isValid || isSubmitting}
          size="mediumThinner"
        >
          {isSubmitting ? "Submitting..." : "Request Your Offer"}
        </button>
      </form>
    </div>
  );
};

export default Form;

function Agreement(props) {
  return (
    <div className={style.input_out__outer}>
      <div className={style.agreement}>
        <div
          className={
            props.agreement
              ? style.agreement_dot_button_active
              : style.agreement_dot_button
          }
          onClick={props.onAgreementChange}
        >
          {dotIcon}
        </div>
        <p className={style.agreement__text}>
          <span onClick={props.onAgreementChange}>
            {props.agreementText ||
              "I agree with conditions of the processing and use"}
          </span>{" "}
          <Link href="/privacy-policy">
            <a> {props.agreementSpanText || "of my personal data"}</a>
          </Link>
        </p>
      </div>
      {props.error && <div className={style.error}>{props.error}</div>}
    </div>
  );
}

const dotIcon = (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
    <circle
      className={style.dot_inside}
      cx="10"
      cy="10"
      r="10"
      fill="transparent"
      stroke="#0090FF"
    />
    <circle className={style.dot} cx="10" cy="10" r="6" fill="#0090FF" />
  </svg>
);
