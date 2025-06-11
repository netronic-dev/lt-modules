import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { isValidPhoneNumber } from "react-phone-number-input";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  linkWithCredential,
} from "firebase/auth";
import { debounce } from "lodash";
import Select, { components } from "react-select";
import style from "../forms.module.scss";
import { useRouter } from "next/router";
import { postData } from "../../functions/postData";
import { useDispatch, useSelector } from "react-redux";
import ReactGA from "react-ga4";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useEffect, useState } from "react";
import { useModals } from "../../../context/ModalsProvider.js";
import axios from "axios";
import ReactPixel from "react-facebook-pixel";
import { searchParams } from "../../../store/searchParamsSlice.js";
import { sendEventToConversionApi } from "../../functions/sendFbPageView.js";
import { authentication } from "../../../firebase-config";
import { schema } from "../../../Layouts/validate.js";
import { selectOptions } from "../../../constants/globalConstants";
import googleLogo from "../../../public/icons/google__logo.png";
import { icons } from "../icons/icons";
import { setUserData } from "../../../store/actions/userData.js";
import { Icon } from "../../../components/Icon";
import { generateUUID } from "../../functions/generateUUID";

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

const customStyles = {
  control: (provided) => ({
    ...provided,
    boxSizing: "border-box",
    width: "100%",
    height: "52px",
    padding: "16.5px 14px",
    borderRadius: "8px",
    border: "1px solid transparent",
    backgroundColor: "#fff",
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "#8f96a3",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "14px",
    outline: 0,
    padding: 0,

    "&:hover": {
      border: "1px solid transparent",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "#8f96a3",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
  }),
  menu: (provided) => ({
    ...provided,
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "#000",
  }),
  menuList: (provided) => ({
    ...provided,
    padding: "0",
  }),
  option: (provided) => ({
    ...provided,
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#8f96a3",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "140%",
    fontFamily: "Arial, Helvetica, sans-serif",
  }),
};

const DropdownIndicator = (props) => {
  const { selectProps } = props;
  const isMenuOpen = selectProps.menuIsOpen;
  return (
    <components.DropdownIndicator {...props}>
      {isMenuOpen ? (
        <svg id="icon-arrow-down" viewBox="0 0 37 32" width={12} height={12}>
          <path fill="#777" d="M18.667 32l-16.166-28h32.332l-16.166 28z"></path>
        </svg>
      ) : (
        <svg id="icon-arrow-up" viewBox="0 0 37 32" width={12} height={12}>
          <path fill="#777" d="M18.667 0l16.166 28h-32.332l16.166-28z"></path>
        </svg>
      )}
    </components.DropdownIndicator>
  );
};

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
  const [regionCode, setRegionCode] = useState();
  const [isDesktop, setIsDesktop] = useState(true);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [loggedViaSocials, setLoggedSocials] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const modal = useModals();
  const queryParams = useSelector(searchParams);
  const eventId = generateUUID();

  const handleServerErrors = (error) => {
    Object.entries(error).forEach(([key, message]) => {
      if (["name", "email", "phoneNumber"].includes(key)) {
        setError(key, {
          type: "server",
          message,
        });
      }
    });
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      boxSizing: "border-box",
      width: "100%",
      height: "52px",
      padding: "16.5px 14px",
      borderRadius: "8px",
      border: "1px solid transparent",
      backgroundColor: "#212121",
      fontFamily: "Arial, Helvetica, sans-serif",
      color: "#8f96a3",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "14px",
      outline: 0,
      padding: 0,

      "&:hover": {
        border: "1px solid transparent",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      fontFamily: "Arial, Helvetica, sans-serif",
      color: "#8f96a3",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
    }),
    menu: (provided) => ({
      ...provided,
      fontFamily: "Arial, Helvetica, sans-serif",
      color: "#000",
    }),
    menuList: (provided) => ({
      ...provided,
      padding: "0",
    }),
    option: (provided) => ({
      ...provided,
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#8f96a3",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "140%",
      fontFamily: "Arial, Helvetica, sans-serif",
    }),
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
    reset,
    setError,
    getValues,
    setValue,
    watch,
    trigger,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      agreement: true,
    },
  });

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1200);
  }, [window.innerWidth]);

  const googleAuth = async () => {
    await signOut(authentication);

    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(authentication, provider);
    setLoggedSocials("Google");
    reset({
      email: user.email,
      name: user.displayName,
    });
  };

  const facebookAuth = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const { user } = await signInWithPopup(authentication, provider);

      setLoggedSocials("Facebook");
      reset({
        email: user.email
          ? user.email
          : user.reloadUserInfo.providerUserInfo[0].email,
        name: user.displayName,
      });
    } catch (error) {
      if (error.code === "auth/popup-blocked") {
        alert("Please allow pop-ups for this site.");
      } else if (
        error.code === "auth/account-exists-with-different-credential"
      ) {
        const pendingCred = FacebookAuthProvider.credentialFromError(error);
        const googleProvider = new GoogleAuthProvider();
        const googleUser = await signInWithPopup(
          authentication,
          googleProvider
        );
        const user = await linkWithCredential(googleUser.user, pendingCred);
        reset({
          email: user._tokenResponse.email,
          name: user._tokenResponse.displayName,
        });
        setLoggedSocials("Facebook");
      } else {
        alert("Try again, please!");
      }
    }
  };

  const clearAuth = async () => {
    await signOut(authentication);
    setLoggedSocials("");
    reset({
      email: "",
      name: "",
      contactMethod: "",
    });
  };

  const handleAgreementChange = (e) => {
    setValue("agreement", !getValues("agreement"));
    trigger("agreement");
  };

  const orderName = loggedViaSocials
    ? `(${loggedViaSocials}) ${props.orderName}`
    : `(Noauthorization) ${props.orderName}`;

  const onSubmit = async (values) => {
    debouncedSubmit("attempt", window.location.hostname);
    dispatch(setUserData(values.name));
    const data = {
      ...values,
      phoneNumber: `+${values.phoneNumber}`,
      budget: values.budget.value,
    };

    const options = {
      method: "POST",
      url: `https://back.netronic.net/send-email`,
      headers: {
        "content-type": "application/json",
      },
      data: {
        email: values.email,
        fromName: props.fromName,
        letterId: props.letterId,
      },
    };
    try {
      const sendEmailResponse = await axios.request(options);
      const postToCRMResponse = await postData(
        data,
        props.destinationURL,
        orderName,
        window.location.href,
        window.location.hostname,
        queryParams || router.query
      );

      Promise.all([sendEmailResponse, postToCRMResponse]).then(() => {
        debouncedSubmit("success", window.location.hostname);
        reset();
        ReactGA.event("generate_lead", {
          category: "form",
          action: "submit",
        });
        ReactPixel.track("Lead", {}, { eventID: eventId });
        sendEventToConversionApi(
          window.location.href,
          "Lead",
          {
            email: values.email,
            phone: `+${values.phoneNumber}`,
          },
          eventId
        );
        modal.closeModal();
        router.push(
          props.thank_you_page ? props.thank_you_page : "/thanks-call"
        );
      });
    } catch (error) {
      if (error.response.data) {
        handleServerErrors(error.response.data);
      } else {
        await axios.post(
          "https://back.netronic.net/telegram/send-error-message",
          {
            message: `frontend error: FORM SUBMIT ❌ ${window.location.hostname}: ${error}`,
          }
        );
      }
    }
  };

  const handleMenuOpen = () => setMenuIsOpen(true);
  const handleMenuClose = () => setMenuIsOpen(false);

  const DropdownIndicator = (props) => {
    const { selectProps } = props;
    const isMenuOpen = selectProps.menuIsOpen;
    return (
      <components.DropdownIndicator {...props}>
        {isMenuOpen ? (
          <svg id="icon-arrow-down" viewBox="0 0 37 32" width={12} height={12}>
            <path
              fill="#fff"
              d="M18.667 32l-16.166-28h32.332l-16.166 28z"
            ></path>
          </svg>
        ) : (
          <svg id="icon-arrow-up" viewBox="0 0 37 32" width={12} height={12}>
            <path fill="#fff" d="M18.667 0l16.166 28h-32.332l16.166-28z"></path>
          </svg>
        )}
      </components.DropdownIndicator>
    );
  };

  useEffect(() => {
    modal?.region
      ? setRegionCode(modal?.region.toLowerCase())
      : setRegionCode("us");
  }, [modal.region]);

  return (
    <div>
      {isDesktop ? (
        <div className={style.auth_block}>
          <div className={style.buttons_row}>
            {loggedViaSocials ? (
              <>
                <button className={style.clear_button} onClick={clearAuth}>
                  Clear
                </button>
                <button
                  className={style.change_button}
                  onClick={
                    loggedViaSocials === "Google" ? googleAuth : facebookAuth
                  }
                >
                  Change account
                </button>
              </>
            ) : (
              <>
                <button className={style.google_button} onClick={googleAuth}>
                  <Image
                    src={googleLogo}
                    alt="google logo"
                    height={15}
                    width={15}
                  />{" "}
                  Authorization via Google
                </button>
                <button
                  className={style.facebook_button}
                  onClick={facebookAuth}
                >
                  <Icon
                    name="icon-facebook_logo"
                    className={style.facebook_icon}
                    width={15}
                    height={15}
                  />{" "}
                  Authorization via Meta (Facebook)
                </button>
              </>
            )}
          </div>
          <div className={style.divider_block}>
            <span
              className={`${style.divider} ${
                props.isModal ? "" : style.divider_white
              }`}
            ></span>
            <span
              className={`${style.divider_text} ${
                props.isModal ? "" : style.divider_text_white
              }`}
            >
              or
            </span>
            <span
              className={`${style.divider} ${
                props.isModal ? "" : style.divider_white
              }`}
            ></span>
          </div>
        </div>
      ) : null}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={
          themeFormTheme[props.formTheme ? props.formTheme : "general"]
        }
      >
        <div className={style.inputs}>
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
              placeholder={
                props.namePlaceholder ? props.namePlaceholder : "Name*"
              }
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
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: errors.phoneNumber ? "#d22e2e" : "transparent",
                    color: "#fff",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "140px",
                    outline: "0",
                    backgroundColor: "#212121",
                  }}
                  buttonStyle={{
                    borderColor: errors.phoneNumber ? "#d22e2e" : "#000",
                    borderWidth: "1px",
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
              {...register("email")}
              placeholder={
                props.emailPlaceholder ? props.emailPlaceholder : "Email*"
              }
            />
            <p className={style.error__message}>{errors.email?.message}</p>
          </div>
          <Controller
            control={control}
            name="budget"
            render={({ field }) => (
              <Select
                aria-label="Budget"
                {...field}
                placeholder={props.budgetPlaceholder}
                options={selectOptions}
                isSearchable={false}
                components={{ DropdownIndicator }}
                onMenuOpen={handleMenuOpen}
                onMenuClose={handleMenuClose}
                menuIsOpen={menuIsOpen}
                styles={customStyles}
              />
            )}
          />
          {errors.budget && (
            <p className={style.error__message}>
              {errors.budget.value.message}
            </p>
          )}
          <div className={style.agreement}>
            <div className={style.input__label}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  className={
                    getValues("agreement") === true
                      ? style.agreement_dot_button_active
                      : style.agreement_dot_button
                  }
                  onClick={handleAgreementChange}
                  {...register("agreement")}
                >
                  {icons.dot}
                </div>
                <p className={style.agreement__text_white}>
                  I agree with conditions of the processing and use{" "}
                  <a
                    href="/privacy-policy"
                    onClick={() => {
                      handleAgreementChange();
                      modal.closeModal();
                    }}
                  >
                    of my personal data
                  </a>{" "}
                </p>
              </div>
              {errors.agreement && (
                <p className={style.error__message}>
                  {errors.agreement.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className={`
          ${
            !isValid || isSubmitting
              ? buttonActiveTheme[props.buttonActiveTheme]
              : buttonTheme[props.buttonTheme]
          }
          `}
          style={{
            cursor: !isValid || isSubmitting ? "not-allowed" : "pointer",
          }}
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? props.submittingText : props.buttonText}
        </button>
      </form>
    </div>
  );
}

export function ThemeFormAll(props) {
  const [regionCode, setRegionCode] = useState();
  const router = useRouter();
  const modal = useModals();
  const queryParams = useSelector(searchParams);
  const [loggedViaSocials, setLoggedSocials] = useState("");
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const dispatch = useDispatch();
  const eventId = generateUUID();

  const handleServerErrors = (error) => {
    Object.entries(error).forEach(([key, message]) => {
      if (["name", "email", "phoneNumber"].includes(key)) {
        setError(key, {
          type: "server",
          message,
        });
      }
    });
  };

  useEffect(() => {
    modal?.region
      ? setRegionCode(modal?.region.toLowerCase())
      : setRegionCode("us");
  }, [modal.region]);

  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1200);
  }, [window.innerWidth]);

  const handleMenuOpen = () => setMenuIsOpen(true);
  const handleMenuClose = () => setMenuIsOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
    reset,
    setError,
    getValues,
    setValue,
    trigger,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      agreement: true,
    },
  });

  const handleAgreementChange = (e) => {
    setValue("agreement", !getValues("agreement"));
    trigger("agreement");
  };

  const googleAuth = async () => {
    await signOut(authentication);

    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(authentication, provider);
    setLoggedSocials("Google");
    reset({
      email: user.email,
      name: user.displayName,
    });
  };

  const facebookAuth = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const { user } = await signInWithPopup(authentication, provider);

      setLoggedSocials("Facebook");
      reset({
        email: user.email
          ? user.email
          : user.reloadUserInfo.providerUserInfo[0].email,
        name: user.displayName,
      });
    } catch (error) {
      if (error.code === "auth/popup-blocked") {
        alert("Please allow pop-ups for this site.");
      } else if (
        error.code === "auth/account-exists-with-different-credential"
      ) {
        const pendingCred = FacebookAuthProvider.credentialFromError(error);
        const googleProvider = new GoogleAuthProvider();
        const googleUser = await signInWithPopup(
          authentication,
          googleProvider
        );
        const user = await linkWithCredential(googleUser.user, pendingCred);
        reset({
          email: user._tokenResponse.email,
          name: user._tokenResponse.displayName,
        });
        setLoggedSocials("Facebook");
      } else {
        alert("Try again, please!");
      }
    }
  };

  const clearAuth = async () => {
    await signOut(authentication);
    setLoggedSocials("");
    reset({
      email: "",
      name: "",
    });
  };

  const orderName = loggedViaSocials
    ? `(${loggedViaSocials}) ${props.orderName}`
    : `(Noauthorization) ${props.orderName}`;

  const onSubmit = async (values) => {
    debouncedSubmit("attempt", window.location.hostname);
    dispatch(setUserData(values.name));
    const data = {
      ...values,
      phoneNumber: `+${values.phoneNumber}`,
      budget: values.budget.value,
    };

    const options = {
      method: "POST",
      url: `https://back.netronic.net/send-email`,
      headers: {
        "content-type": "application/json",
      },
      data: {
        email: values.email,
        fromName: props.fromName,
        letterId: props.letterId,
      },
    };
    try {
      const sendEmailResponse = await axios.request(options);
      const postToCRMResponse = await postData(
        data,
        props.destinationURL,
        orderName,
        window.location.href,
        window.location.hostname,
        queryParams || router.query
      );

      Promise.all([sendEmailResponse, postToCRMResponse]).then(() => {
        debouncedSubmit("success", window.location.hostname);
        reset();
        ReactGA.event("generate_lead", {
          category: "form",
          action: "submit",
        });
        ReactPixel.track("Lead", {}, { eventID: eventId });
        sendEventToConversionApi(
          window.location.href,
          "Lead",
          {
            email: values.email,
            phone: `+${values.phoneNumber}`,
          },
          eventId
        );
        modal.closeModal();
        router.push(
          props.thank_you_page ? props.thank_you_page : "/thanks-call"
        );
      });
    } catch (error) {
      if (error.response.data) {
        handleServerErrors(error.response.data);
      } else {
        await axios.post(
          "https://back.netronic.net/telegram/send-error-message",
          {
            message: `frontend error: FORM SUBMIT ❌ ${window.location.hostname}: ${error}`,
          }
        );
      }
    }
  };

  return (
    <div>
      {isDesktop ? (
        <div className={style.auth_block}>
          <div className={style.buttons_row}>
            {loggedViaSocials ? (
              <>
                <button className={style.clear_button} onClick={clearAuth}>
                  Clear
                </button>
                <button
                  className={style.change_button}
                  onClick={
                    loggedViaSocials === "Google" ? googleAuth : facebookAuth
                  }
                >
                  Change account
                </button>
              </>
            ) : (
              <>
                <button className={style.google_button} onClick={googleAuth}>
                  <Image
                    src={googleLogo}
                    alt="google logo"
                    height={15}
                    width={15}
                  />{" "}
                  Authorization via Google
                </button>
                <button
                  className={style.facebook_button}
                  onClick={facebookAuth}
                >
                  <Icon
                    name="icon-facebook_logo"
                    className={style.facebook_icon}
                    width={15}
                    height={15}
                  />{" "}
                  Authorization via Meta (Facebook)
                </button>
              </>
            )}
          </div>
          <div className={style.divider_block}>
            <span
              className={`${style.divider} ${
                props.isModal ? "" : style.divider_white
              }`}
            ></span>
            <span
              className={`${style.divider_text} ${
                props.isModal ? "" : style.divider_text_white
              }`}
            >
              or
            </span>
            <span
              className={`${style.divider} ${
                props.isModal ? "" : style.divider_white
              }`}
            ></span>
          </div>
        </div>
      ) : null}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={
          themeFormTheme[props.formTheme ? props.formTheme : "general"]
        }
      >
        <div className={style.inputs}>
          <div className={style.input__label}>
            <input
              className={style.input_white}
              style={{
                borderColor: errors.name ? "#d22e2e" : "transparent",
              }}
              error={errors.name ? "true" : "false"}
              {...register("name", {
                required: "Name is required",
              })}
              placeholder={
                props.namePlaceholder ? props.namePlaceholder : "Name*"
              }
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
                    height: "52px",
                    width: "100%",
                    boxSizing: "border-box",
                    borderRadius: "8px",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: errors.phoneNumber ? "#d22e2e" : "transparent",
                    color: "#8e8e8e",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "140px",
                    outline: "0",
                    backgroundColor: "#fff",
                  }}
                  buttonStyle={{
                    borderColor: errors.phoneNumber ? "#d22e2e" : "#8e8e8e",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    height: "52px",
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
              className={style.input_white}
              style={{
                borderColor: errors.email ? "#d22e2e" : "transparent",
              }}
              error={errors.email ? "true" : "false"}
              {...register("email")}
              placeholder={
                props.emailPlaceholder ? props.emailPlaceholder : "Email*"
              }
            />
            <p className={style.error__message}>{errors.email?.message}</p>
          </div>
          <Controller
            control={control}
            name="budget"
            render={({ field }) => (
              <Select
                aria-label="Change budget"
                {...field}
                placeholder={
                  props.budgetPlaceholder ? props.budgetPlaceholder : "Budget*"
                }
                options={selectOptions}
                isSearchable={false}
                components={{ DropdownIndicator }}
                onMenuOpen={handleMenuOpen}
                onMenuClose={handleMenuClose}
                menuIsOpen={menuIsOpen}
                styles={customStyles}
              />
            )}
          />
          {errors.budget && (
            <p className={style.error__message}>
              {errors.budget.value.message}
            </p>
          )}
          <div className={style.agreement}>
            <div className={style.input__label}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  className={
                    getValues("agreement") === true
                      ? style.agreement_dot_button_active
                      : style.agreement_dot_button
                  }
                  onClick={handleAgreementChange}
                  {...register("agreement")}
                >
                  {icons.dot}
                </div>
                <p className={style.agreement__text_white}>
                  I agree with conditions of the processing and use{" "}
                  <a
                    href="/privacy-policy"
                    onClick={() => {
                      handleAgreementChange();
                      modal.closeModal();
                    }}
                  >
                    of my personal data
                  </a>{" "}
                </p>
              </div>
              {errors.agreement && (
                <p className={style.error__message}>
                  {errors.agreement.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className={`
            ${
              !isValid || isSubmitting
                ? buttonTheme[props.buttonTheme]
                : buttonActiveTheme[props.buttonActiveTheme]
            }
            `}
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? props.submittingText : props.buttonText}
        </button>
      </form>
    </div>
  );
}

const Input = (props) => {
  return (
    <label className={style.input__label}>
      <input
        name={props.name}
        className={`${style.input_white} ${
          props.error ? style.input__error : ""
        }`}
        type={props.type}
        onChange={props.onChange}
        value={props.value}
        placeholder={props.placeholder}
      />
      {props.error ? (
        <span className={style.error__message}>{props.error}</span>
      ) : null}
    </label>
  );
};
