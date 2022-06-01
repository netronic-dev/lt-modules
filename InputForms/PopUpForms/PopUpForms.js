import { useFormik } from "formik";
import { useState } from "react";
import style from "../forms.module.scss";
import { useRouter } from "next/router";
import { validate } from "../validate/validate";
import { icons } from "../icons/icons";
import { InputName, InputCall, InputEmail } from "../Inputs/Inputs";
import Link from "next/link"

export function PopUpCall(props) {
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
    onSubmit: () => {
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

  const id = props.en ? "popup-call-submit-en" : "popup-call-submit"

  return (
    <div className={style.inputs_block_out}>
      <div className={style.close_block} onClick={props.closeClick}></div>
      <div className={`${style.inputs_block} fade-up-animation`}>
        <div className={style.close}>
          <button onClick={props.closeClick}>{icons.cross}</button>
        </div>
        <div className={style.text_block}>
          <p className={style.title}>
            {props.en ? "Fill in the form below" : "Заполните форму"}
          </p>
          <p className={style.paragraph}>
            {props.en ? "Our manager will contact you" : "Мы свяжемся с Вами в ближайшее время"}
          </p>
        </div>
        <div className={style.inputs_block__inputs}>
          <form
            onSubmit={formik.handleSubmit}
          >
            <div className={style.inputs_block__input}>
              <InputName
                en={props.en}
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.errors.name}
              />
              <InputCall
                en={props.en}
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                error={formik.errors.phoneNumber} />
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
                  {props.en ? "I agree with conditions of the processing and use " : "Подтверждаю, что ознакомился и согласен с условиями"}
                </span>
                {" "}{props.en ?
                  <Link href="/privacy-policy">
                    <a onClick={onAgreementLinkClick}>
                      of my personal data
                    </a>
                  </Link>
                  :
                  <Link href="/agreement">
                    <a onClick={onAgreementLinkClick}>
                      политики конфиденциальности
                    </a>
                  </Link>
                }
              </p>
            </div>
            <button
              type={agreement ? "submit" : "button"}
              id={agreement ? Object.keys(formik.errors).length == 0 ? id : null : null}
              className={`${agreement ? Object.keys(formik.errors).length == 0 ? style.general_button_active : style.general_button_inactive : style.general_button_inactive} "button-submit"`}
            >
              {props.text ? props.text : props.en ? "Get price" : "Узнать цену"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function PopUpEmail(props) {
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

  function turnOnScroll() {
    document.body.className = ""
  }

  function onAgreementLinkClick() {
    turnOnScroll()
  }

  const id = props.id ? props.id : props.en ? "popup-email-submit-en" : "popup-email-submit"

  return (
    <div className={style.inputs_block_out}>
      <div className={style.close_block} onClick={props.closeClick}></div>
      <div className={style.inputs_block}>
        <div className={style.close}>
          <button onClick={props.closeClick}>{icons.cross}</button>
        </div>
        <div className={style.text_block}>
          <p className={style.title}>
            {props.title ? props.title : props.en ? "Fill in the form below" : "Заполните форму"}
          </p>
          <p className={style.paragraph}>
            {props.subTitle ? props.subTitle : props.en ? "Get an equipment catalog with prices" : "Получите на почту каталог с ценами"}
          </p>
        </div>
        <div className={style.inputs_block__inputs}>
          <form
            onSubmit={formik.handleSubmit}
          >
            <div className={style.inputs_block__input}>
              <InputEmail
                en={props.en}
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.errors.email}
                emailFormID={props.emailFormID}

              />
              <InputCall
                en={props.en}
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
                  {props.en ? "I agree with conditions of the processing and use " : "Подтверждаю, что ознакомился и согласен с условиями"}
                </span>
                {" "}{props.en ?
                  <Link href="/privacy-policy">
                    <a onClick={onAgreementLinkClick}>
                      of my personal data
                    </a>
                  </Link>
                  :
                  <Link href="/agreement">
                    <a onClick={onAgreementLinkClick}>
                      политики конфиденциальности
                    </a>
                  </Link>
                }
              </p>
            </div>
            <button
              type={agreement ? "submit" : "button"}
              id={agreement ? Object.keys(formik.errors).length == 0 ? id : null : null}
              className={`${agreement ? Object.keys(formik.errors).length == 0 ? style.general_button_active : style.general_button_inactive : style.general_button_inactive} "button-submit"`}
            >
              {props.formButtonText ? props.formButtonText : props.en ? "Get catalog" : "Получить каталог"}
            </button>
          </form>
        </div>
      </div >
    </div >
  );
}
export function PopUpOutdoor(props) {
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

  function turnOnScroll() {
    document.body.className = ""
  }

  function onAgreementLinkClick() {
    turnOnScroll()
  }

  const id = props.en ? "popup-outdoor-submit-en" : "popup-outdoor-submit"

  return (
    <div className={style.inputs_block_out}>
      <div className={style.close_block} onClick={props.closeClick}></div>
      <div className={style.inputs_block}>
        <div className={style.close}>
          <button onClick={props.closeClick}>{icons.cross}</button>
        </div>
        <div className={style.text_block}>
          <p className={style.title}>
            {props.en ? "Fill in the form below" : "Заполните форму"}
          </p>
          <p className={style.paragraph}>
            {props.en ? "Get the guide to laser tag scenarios" : "Получите на почту руководство"}
          </p>
        </div>
        <div className={style.inputs_block__inputs}>
          <form
            onSubmit={formik.handleSubmit}
          >
            <div className={style.inputs_block__input}>
              <InputEmail
                en={props.en}
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.errors.email}
              />
              <InputCall
                en={props.en}
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                error={formik.errors.phoneNumber} />
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
                  {props.en ? "I agree with conditions of the processing and use " : "Подтверждаю, что ознакомился и согласен с условиями"}
                </span>
                {" "}{props.en ?
                  <Link href="/privacy-policy">
                    <a onClick={onAgreementLinkClick}>
                      of my personal data
                    </a>
                  </Link>
                  :
                  <Link href="/agreement">
                    <a onClick={onAgreementLinkClick}>
                      политики конфиденциальности
                    </a>
                  </Link>
                }
              </p>
            </div>
            <button
              type={agreement ? "submit" : "button"}
              id={agreement ? Object.keys(formik.errors).length == 0 ? id : null : null}
              className={`${agreement ? Object.keys(formik.errors).length == 0 ? style.general_button_active : style.general_button_inactive : style.general_button_inactive} "button-submit"`}
            >
              {props.en ? "Get the guide" : "Получить руководство"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function PopUpEvent(props) {
  const router = useRouter();

  const [agreement, changeAgreement] = useState(false);

  function onAgreementChange() {
    changeAgreement(!agreement);
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      phoneNumber: "",
      name: ""
    },
    validate,
    onSubmit: (values) => {
      setTimeout(() => {
        router.push("/thanks-pres").then(() => router.reload());
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

  const id = props.en ? `popup-event-${props.eventNumber}-submit-en` : `popup-event-${props.eventNumber}-submit`

  return (
    <div className={style.inputs_block_out}>
      <div className={style.close_block} onClick={props.closeClick}></div>
      <div className={style.inputs_block}>
        <div className={style.close}>
          <button onClick={props.closeClick}>{icons.cross}</button>
        </div>
        <div className={style.text_block}>
          <p className={style.title}>
            {props.en ? "Fill in the form below" : "Заполните форму"}
          </p>
          <p className={style.paragraph}>
            {props.subTitle}
          </p>
        </div>
        <div className={style.inputs_block__inputs}>
          <form
            onSubmit={formik.handleSubmit}
          >
            <div className={style.inputs_block__input}>
              <InputName
                en={props.en}
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.errors.name}
              />
              <InputEmail
                en={props.en}
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.errors.email}
              />
              <InputCall
                en={props.en}
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                error={formik.errors.phoneNumber} />
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
                  {props.en ? "I agree with conditions of the processing and use " : "Подтверждаю, что ознакомился и согласен с условиями"}
                </span>
                {" "}{props.en ?
                  <Link href="/privacy-policy">
                    <a onClick={onAgreementLinkClick}>
                      of my personal data
                    </a>
                  </Link>
                  :
                  <Link href="/agreement">
                    <a onClick={onAgreementLinkClick}>
                      политики конфиденциальности
                    </a>
                  </Link>
                }
              </p>
            </div>
            <button
              type={agreement ? "submit" : "button"}
              id={agreement ? Object.keys(formik.errors).length == 0 ? id : null : null}
              className={`${agreement ? Object.keys(formik.errors).length == 0 ? style.general_button_active : style.general_button_inactive : style.general_button_inactive} "button-submit"`}
            >
              {props.buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function PopUpNameEmail(props) {
  const router = useRouter();

  const [agreement, changeAgreement] = useState(false);

  function onAgreementChange() {
    changeAgreement(!agreement);
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validate,
    onSubmit: () => {
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

  const id = props.id ? props.id : props.en ? "popup-name-email-en" : "popup-name-email"

  return (
    <div className={style.inputs_block_out}>
      <div className={style.close_block} onClick={props.closeClick}></div>
      <div className={style.inputs_block}>
        <div className={style.close}>
          <button onClick={props.closeClick}>{icons.cross}</button>
        </div>
        <div className={style.text_block}>
          <p className={style.title}>
            {props.title}
          </p>
          <p className={style.paragraph}>
            {props.subTitle}
          </p>
        </div>
        <div className={style.inputs_block__inputs}>
          <form
            onSubmit={formik.handleSubmit}
          >
            <div className={style.inputs_block__input}>
              <InputName
                en={props.en}
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.errors.name}
                nameFormID={props.nameFormID}
              />
              <InputEmail
                en={props.en}
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.errors.email}
                emailFormID={props.emailFormID}
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
                  {props.en ? "I agree with conditions of the processing and use " : "Подтверждаю, что ознакомился и согласен с условиями"}
                </span>
                {" "}{props.en ?
                  <Link href="/privacy-policy">
                    <a onClick={onAgreementLinkClick}>
                      of my personal data
                    </a>
                  </Link>
                  :
                  <Link href="/agreement">
                    <a onClick={onAgreementLinkClick}>
                      политики конфиденциальности
                    </a>
                  </Link>
                }
              </p>
            </div>
            <button
              type={agreement ? "submit" : "button"}
              id={agreement ? Object.keys(formik.errors).length == 0 ? id : null : null}
              className={`${agreement ? Object.keys(formik.errors).length == 0 ? style.general_button_active : style.general_button_inactive : style.general_button_inactive} "button-submit"`}
            >
              {props.buttonText ? props.buttonText : props.en ? "Get" : "Получить"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}