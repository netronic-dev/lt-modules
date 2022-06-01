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


export function StaticFormCall(props) {
  const router = useRouter();

  const [agreement, changeAgreement] = useState(false);

  function onAgreementChange() {
    changeAgreement(!agreement);
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
    },
    validate,
    onSubmit: (values) => {
      setTimeout(() => {
        router.push("/thanks-call").then(() => router.reload());
        document.body.className = "";
      }, 400);
    },
  });

  function turnOnScroll() {
    document.body.className = ""
  }

  function onAgreementLinkClick() {
    turnOnScroll()
  }

  const id = props.en ? "static-call-submit-en" : "static-call-submit"

  return (
    <div className={style.static_form}>
      <div className={style.inputs_block}>
        <div className={style.text_block}>
          <p className={style.title}>Заполните форму</p>
          <p className={style.paragraph}>
            Мы свяжемся с Вами в ближайшее время
          </p>
        </div>
        <div className={style.inputs_block__inputs}>
          <form
            onSubmit={formik.handleSubmit}
          >
            <div className={style.inputs_block__input}>
              <InputName
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.errors.name}
                nameFormID={props.nameFormID}
              />
              <InputCall
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                error={formik.errors.phoneNumber}
                phoneFormID={props.phoneFormID}
              />
            </div>
            <div className={style.agreement}>
              <div
                className={
                  agreement === true
                    ? style.agreement_dot_button_active
                    : style.agreement_dot_button
                }
                onClick={onAgreementChange}
              >
                {icons.dot}
              </div>
              <p className={style.agreement__text}>
                <span onClick={onAgreementChange}>
                  Подтверждаю, что ознакомился и согласен с условиями
                </span>
                <Link href="/agreement">
                  <a onClick={onAgreementLinkClick}>
                    {" "}
                    политики конфиденциальности
                  </a>
                </Link>
              </p>
            </div>
            <button
              type={agreement ? "submit" : "button"}
              id={agreement ? Object.keys(formik.errors).length == 0 ? id : null : null}
              className={`${agreement ? Object.keys(formik.errors).length == 0 ? style.general_button_active : style.general_button_inactive : style.general_button_inactive} "button-submit"`}
            >
              {props.text ? props.text : "Узнать цену"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function StaticFormCatalog(props) {
  const router = useRouter();

  const [agreement, changeAgreement] = useState(false);

  function onAgreementChange() {
    changeAgreement(!agreement);
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      phoneNumber: "",
    },
    validate,
    onSubmit: (values) => {
      setTimeout(() => {
        router.push("/thanks-catalog").then(() => router.reload());
        document.body.className = "";
      }, 400);
    },
  });

  const id = props.en ? "static-email-submit-en" : "static-email-submit"

  return (
    <div className={style.static_form}>
      <div className={style.inputs_block}>
        <div className={style.text_block}>
          <p className={style.title}>Заполните форму</p>
          <p className={style.paragraph}>
            Получите на почту каталог с ценами
          </p>
        </div>
        <div className={style.inputs_block__inputs}>
          <form
            onSubmit={formik.handleSubmit}
          >
            <div className={style.inputs_block__input}>
              <InputEmail
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.errors.email}
                emailFormID={props.emailFormID}
              />
              <InputCall
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                error={formik.errors.phoneNumber}
                phoneFormID={props.phoneFormID}
              />
            </div>
            <div className={style.agreement}>
              <div
                className={
                  agreement === true
                    ? style.agreement_dot_button_active
                    : style.agreement_dot_button
                }
                onClick={onAgreementChange}
              >
                {icons.dot}
              </div>
              <p className={style.agreement__text}>
                <span onClick={onAgreementChange}>
                  Подтверждаю, что ознакомился и согласен с условиями
                </span>
                <Link href="/agreement">
                  <a> политики конфиденциальности</a>
                </Link>
              </p>
            </div>
            <button
              type={agreement ? "submit" : "button"}
              id={agreement ? Object.keys(formik.errors).length == 0 ? id : null : null}
              className={`${agreement ? Object.keys(formik.errors).length == 0 ? style.general_button_active : style.general_button_inactive : style.general_button_inactive} "button-submit"`}
            >
              Получить каталог
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function StaticFormOutdoor(props) {
  const router = useRouter();

  const [agreement, changeAgreement] = useState(false);

  function onAgreementChange() {
    changeAgreement(!agreement);
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      phoneNumber: "",
    },
    validate,
    onSubmit: (values) => {
      setTimeout(() => {
        router.push("/thanks-catalog").then(() => router.reload());
        document.body.className = "";
      }, 400);
    },
  });

  const id = props.en ? "static-outdoor-submit-en" : "static-outdoor-submit"

  return (
    <div className={style.static_form}>
      <div className={style.inputs_block}>
        <div className={style.text_block}>
          <p className={style.title}>Заполните форму</p>
          <p className={style.paragraph}>
            Получите на почту руководство
          </p>
        </div>
        <div className={style.inputs_block__inputs}>
          <form
            onSubmit={formik.handleSubmit}
          >
            <div className={style.inputs_block__input}>
              <InputEmail
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.errors.email}
                emailFormID={props.emailFormID}
              />
              <InputCall
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                error={formik.errors.phoneNumber}
                phoneFormID={props.phoneFormID}
              />
            </div>
            <div className={style.agreement}>
              <div
                className={
                  agreement === true
                    ? style.agreement_dot_button_active
                    : style.agreement_dot_button
                }
                onClick={onAgreementChange}
              >
                {icons.dot}
              </div>
              <p className={style.agreement__text}>
                <span onClick={onAgreementChange}>
                  Подтверждаю, что ознакомился и согласен с условиями
                </span>
                <Link href="/agreement">
                  <a> политики конфиденциальности</a>
                </Link>
              </p>
            </div>
            <button
              type={agreement ? "submit" : "button"}
              id={agreement ? Object.keys(formik.errors).length == 0 ? id : null : null}
              className={`${agreement ? Object.keys(formik.errors).length == 0 ? style.general_button_active : style.general_button_inactive : style.general_button_inactive} "button-submit"`}
            >
              Получить руководство
            </button>
          </form>
        </div>
      </div>
    </div>
  );
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
          en={props.en}
          theme={props.theme}
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
          nameFormID={props.formID}
        />
        <InputCall
          en={props.en}
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
          en={props.en}
          theme={props.theme}
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
          nameFormID={props.formID}
        />
        <InputEmail
          en={props.en}
          theme={props.theme}
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
          emailFormID={props.formID}
        />
        <InputCall
          en={props.en}
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

export function StaticFormExtended(props) {
  const router = useRouter();

  const [agreement, changeAgreement] = useState(false);
  const droplist1Data = props.droplistFirst
  const droplist2Data = props.droplistSecond
  function onAgreementChange() {
    changeAgreement(!agreement);
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      input3: "",
      input4: "",
    },
    validate,
    onSubmit: (values) => {
      setTimeout(() => {
        router.push("/thanks-catalog").then(() => router.reload());
        document.body.className = "";
      }, 400);
    },
  });

  const id = props.en ? "static-extended-submit-en" : "static-extended-submit"

  return (
    <div className={style.static_form_extended}>
      <div className={style.inputs_block}>
        <div className={style.text_block}>
          <p className={style.title}>Заполните форму</p>
          <p className={style.paragraph}>
            Получите на почту руководство
          </p>
        </div>
        <div className={style.inputs_block__inputs}>
          <form
            onSubmit={formik.handleSubmit}
          >
            <div className={style.inputs_block__input}>
              <InputName
                en={props.en}
                theme={props.theme}
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.errors.name}
                nameFormID="static-"
              />
              <InputEmail
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.errors.email}
                emailFormID="static-"
              />
              <InputCall
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                error={formik.errors.phoneNumber}
                phoneFormID="static-"
              />
              <DropDownList
                title={props.dropList1Title}
                data={props.droplistFirst}
                onClick={(index) => { formik.values.input3 = droplist1Data[index].name }}
                error={formik.errors.input3}
                radioBoxID="static-"
              />
              <DropDownList
                title={props.dropList2Title}
                data={props.droplistSecond}
                onClick={(index) => { formik.values.input4 = droplist2Data[index].name }}
                error={formik.errors.input4}
                radioBoxID="static-2-"
              />
            </div>
            <div className={style.agreement}>
              <div
                className={
                  agreement === true
                    ? style.agreement_dot_button_active
                    : style.agreement_dot_button
                }
                onClick={onAgreementChange}
              >
                {icons.dot}
              </div>
              <p className={style.agreement__text}>
                <span onClick={onAgreementChange}>
                  Подтверждаю, что ознакомился и согласен с условиями
                </span>
                <Link href="/agreement">
                  <a> политики конфиденциальности</a>
                </Link>
              </p>
            </div>
            <button
              type={agreement ? "submit" : "button"}
              id={Object.keys(formik.errors).length == 0 ? id : null}
              className={`${Object.keys(formik.errors).length == 0 ? style.general_button_active : style.general_button_inactive} "button-submit"`}
            >
              Получить руководство
            </button>
          </form>
        </div>
      </div>
    </div>
  );
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
          en={props.en}
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
          en={props.en}
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