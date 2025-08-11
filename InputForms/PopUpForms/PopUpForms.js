import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select, { components } from "react-select";
import { isValidPhoneNumber } from "react-phone-number-input";
import { debounce } from "lodash";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import ReactGA from "react-ga4";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import "react-phone-input-2/lib/style.css";
import { schema } from "../../../Layouts/validate";
import { useModals } from "../../../context/ModalsProvider";
import { setUserData } from "../../../store/actions/userData";
import { searchParams } from "../../../store/searchParamsSlice";
import { postData } from "../../functions/postData";
import style from "../forms.module.scss";
import { icons } from "../icons/icons";
import { sendEventToConversionApi } from "../../functions/sendFbPageView";
import { selectOptions } from "../../../constants/globalConstants";
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
    height: "55px",
    padding: "18px 16px",
    borderRadius: "5px",
    border: "1px solid transparent",
    backgroundColor: "#212121",
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "#fff",
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
    color: "#fff",
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
          <path fill="#fff" d="M18.667 32l-16.166-28h32.332l-16.166 28z"></path>
        </svg>
      ) : (
        <svg id="icon-arrow-up" viewBox="0 0 37 32" width={12} height={12}>
          <path fill="#fff" d="M18.667 0l16.166 28h-32.332l16.166-28z"></path>
        </svg>
      )}
    </components.DropdownIndicator>
  );
};

export function PopUpNamePhone(props) {
  const [regionCode, setRegionCode] = useState();

  const router = useRouter();
  const modal = useModals();
  const dispatch = useDispatch();
  const queryParams = useSelector(searchParams);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
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

  const onSubmit = async (values) => {
    debouncedSubmit("attempt", window.location.hostname);
    dispatch(setUserData(values.name));
    const data = {
      ...values,
      phoneNumber: `+${values.phoneNumber}`,
      budget: values.budget.value,
    };

    try {
      const postToCRMResponse = await postData(
        data,
        props.destinationURL,
        props.orderName,
        window.location.href,
        window.location.hostname,
        queryParams || router.query
      );

      Promise.all([postToCRMResponse]).then(() => {
        debouncedSubmit("success", window.location.hostname);
        reset();
        ReactGA.event("generate_lead", {
          category: "form",
          action: "submit",
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
          eventId
        );
        modal.closeModal();
        router.push(props.thank_you_page);
      });
    } catch (error) {
      if (error.response.data) {
        handleServerErrors(error.response.data);
      } else {
      }
    }
  };

  const handleMenuOpen = () => setMenuIsOpen(true);
  const handleMenuClose = () => setMenuIsOpen(false);

  useEffect(() => {
    modal?.region
      ? setRegionCode(modal?.region.toLowerCase())
      : setRegionCode("us");
  }, [modal.region]);

  return (
    <div className={style.inputs_block_out}>
      <div className={style.close_block} onClick={props.closeClick}></div>
      <div className={`${style.inputs_block} fade-up-animation`}>
        <div className={style.close}>
          <button onClick={props.closeClick}>{icons.cross}</button>
        </div>
        <div className={style.text_block}>
          <p className={style.title}>
            {props.title || "Fill in the form below"}
          </p>
          <p className={style.paragraph}>
            {props.subtitle || "Our manager will contact you"}
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.inputs_block__input}>
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
                      borderColor: errors.phoneNumber
                        ? "#d22e2e"
                        : "transparent",
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
          </div>

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
                <p
                  className={style.agreement__text}
                  onClick={() => modal.closeModal()}
                >
                  <span onClick={handleAgreementChange}>
                    {props.agreement_text}
                  </span>{" "}
                  {props.agreement_link}
                </p>
              </div>
              {errors.agreement && (
                <p className={style.error__message}>
                  {errors.agreement.message}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className={`${
              !isValid || isSubmitting
                ? style.general_button_inactive
                : style.general_button_active
            } button-submit`}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? props.submittingText : props.buttonText}
          </button>
        </form>
        {/* </div> */}
      </div>
    </div>
  );
}

export function PopUpEmail(props) {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const router = useRouter();
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

  const {
    register,
    handleSubmit,
    formState: { errors },
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

  const languageValues = [
    "Español",
    "Deutsch",
    "Italiano",
    "Français",
    "Українська",
    "English",
  ];

  const onSelectLanguage = (option) => {
    setSelectedLanguage(option.value);
  };

  const onSubmit = async (values) => {
    debouncedSubmit("attempt", window.location.hostname);
    const data = {
      ...values,
      phoneNumber: `+${values.phoneNumber}`,
      budget: values.budget.value,
    };

    try {
      const postToCRMResponse = await postData(
        data,
        props.destinationURL,
        props.orderName,
        window.location.href,
        window.location.hostname,
        queryParams || router.query
      );

      Promise.all([postToCRMResponse]).then(() => {
        debouncedSubmit("success", window.location.hostname);
        reset();
        ReactGA.event("generate_lead", {
          category: "form",
          action: "submit",
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
          eventId
        );
        modal.closeModal();
        router.push(props.thank_you_page);
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
    <div className={style.inputs_block_out}>
      <div className={style.close_block} onClick={props.closeClick}></div>
      <div className={`${style.inputs_block} fade-up-animation`}>
        <div className={style.close}>
          <button onClick={props.closeClick}>{icons.cross}</button>
        </div>
        <div className={style.text_block}>
          <p className={style.title}>
            {props.title || "Fill in the form below"}
          </p>
        </div>
        <div className={style.inputs_block__inputs}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className={style.input_block_out}>
              <Dropdown
                className={`Dropdown-black_form  ${
                  formik.errors.language ? "Dropdown-error" : ""
                }`}
                options={languageValues}
                onChange={onSelectLanguage}
                value={selectedLanguage}
                placeholder={props.selectLanguagePlaceholder}
              />
              {formik.errors.language && (
                <span className={style.error}>{formik.errors.language}</span>
              )}
            </div>
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
                  <p className={style.agreement__text}>
                    <span onClick={handleAgreementChange}>
                      {props.agreement_text}
                    </span>{" "}
                    {props.agreement_link}
                  </p>
                </div>
                {errors.agreement && (
                  <p className={style.error__message}>
                    {errors.agreement.message}
                  </p>
                )}
              </div>
            </div>
            <button
              type={agreement ? "submit" : "button"}
              className={`
                    ${style.general_button_inactive}
                "button-submit"`}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? props.submittingText : props.buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function PopUpEmailPhone(props) {
  const [regionCode, setRegionCode] = useState();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const router = useRouter();
  const modal = useModals();
  const queryParams = useSelector(searchParams);
  const eventId = generateUUID();

  const handleMenuOpen = () => setMenuIsOpen(true);
  const handleMenuClose = () => setMenuIsOpen(false);

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

  useEffect(() => {
    modal?.region
      ? setRegionCode(modal?.region.toLowerCase())
      : setRegionCode("us");
  }, [modal.region]);

  const onSubmit = async (values) => {
    debouncedSubmit("attempt", window.location.hostname);
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
        props.orderName,
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
          eventId
        );
        modal.closeModal();
        router.push(props.thank_you_page);
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
    <div className={style.inputs_block_out}>
      <div className={style.close_block} onClick={props.closeClick}></div>
      <div className={style.inputs_block}>
        <div className={style.close}>
          <button onClick={props.closeClick}>{icons.cross}</button>
        </div>
        <div className={style.text_block}>
          <p className={style.title}>
            {props.title || "Fill in the form below"}
          </p>
          <p className={style.paragraph}>
            {props.subTitle || "Get an equipment catalog with prices"}
          </p>
        </div>
        <div className={style.inputs_block__inputs}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.inputs_block__input}>
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
                        borderColor: errors.phoneNumber
                          ? "#d22e2e"
                          : "transparent",
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
            </div>
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
                  <p
                    className={style.agreement__text}
                    onClick={() => modal.closeModal()}
                  >
                    <span onClick={handleAgreementChange}>
                      {props.agreement_text}
                    </span>{" "}
                    {props.agreement_link}
                  </p>
                </div>
                {errors.agreement && (
                  <p className={style.error__message}>
                    {errors.agreement.message}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className={`${
                !isValid || isSubmitting
                  ? style.general_button_inactive
                  : style.general_button_active
              } button-submit`}
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting
                ? props.submittingText
                : props.buttonText || "Get catalog"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function PopUpEvent(props) {
  const [regionCode, setRegionCode] = useState();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const router = useRouter();
  const modal = useModals();
  const dispatch = useDispatch();
  const queryParams = useSelector(searchParams);
  const eventId = generateUUID();

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

  const handleAgreementChange = (e) => {
    setValue("agreement", !getValues("agreement"));
    trigger("agreement");
  };

  useEffect(() => {
    modal?.region
      ? setRegionCode(modal?.region.toLowerCase())
      : setRegionCode("us");
  }, [modal.region]);

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
        props.orderName,
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
          eventId
        );
        modal.closeModal();
        router.push(props.thank_you_page);
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
    <div className={style.inputs_block_out}>
      <div className={style.close_block} onClick={props.closeClick}></div>
      <div className={style.inputs_block}>
        <div className={style.close}>
          <button onClick={props.closeClick}>{icons.cross}</button>
        </div>
        <div className={style.text_block}>
          <p className={style.title}>
            {props.title || "Fill in the form below"}
          </p>
          <p className={style.paragraph}>{props.subTitle}</p>
        </div>
        <div className={style.inputs_block__inputs}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.inputs_block__input}>
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
                        borderColor: errors.phoneNumber
                          ? "#d22e2e"
                          : "transparent",
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
            </div>
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
                  <p className={style.agreement__text}>
                    <span onClick={handleAgreementChange}>
                      {props.agreement_text}
                    </span>{" "}
                    {props.agreement_link}
                  </p>
                </div>
                {errors.agreement && (
                  <p className={style.error__message}>
                    {errors.agreement.message}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className={`${
                !isValid || isSubmitting
                  ? style.general_button_inactive
                  : style.general_button_active
              } button-submit`}
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? props.submittingText : props.buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function PopUpNameEmail(props) {
  const router = useRouter();
  const modal = useModals();
  const dispatch = useDispatch();
  const queryParams = useSelector(searchParams);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [regionCode, setRegionCode] = useState();
  const eventId = generateUUID();

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
        props.orderName,
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
          eventId
        );
        modal.closeModal();
        router.push(props.thank_you_page);
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

  const handleAgreementChange = (e) => {
    setValue("agreement", !getValues("agreement"));
    trigger("agreement");
  };

  const handleMenuOpen = () => setMenuIsOpen(true);
  const handleMenuClose = () => setMenuIsOpen(false);

  return (
    <div className={style.inputs_block_out}>
      <div className={style.close_block} onClick={props.closeClick}></div>
      <div className={style.inputs_block}>
        <div className={style.close}>
          <button onClick={props.closeClick}>{icons.cross}</button>
        </div>
        <div className={style.text_block}>
          <p className={style.title}>{props.title}</p>
          <p className={style.paragraph}>{props.subtitle}</p>
        </div>
        <div className={style.inputs_block__inputs}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.inputs_block__input}>
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
                        borderColor: errors.phoneNumber
                          ? "#d22e2e"
                          : "transparent",
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
                    aria-label="Change budget"
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
              <div>
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
                      <p
                        className={style.agreement__text}
                        onClick={() => modal.closeModal()}
                      >
                        <span onClick={handleAgreementChange}>
                          {props.agreement_text}
                        </span>{" "}
                        {props.agreement_link}
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
            </div>

            <button
              type="submit"
              className={`${
                !isValid || isSubmitting
                  ? style.general_button_inactive
                  : style.general_button_active
              } button-submit`}
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting
                ? props.submittingText
                : props.buttonText || "Get catalog"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
