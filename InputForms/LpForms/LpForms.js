import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import style from "../forms.module.scss";
import { useRouter } from "next/router";
import { validate } from "../validate/validate"
import { icons } from "../icons/icons"
import { InputName, InputCall, InputEmail } from "../Inputs/Inputs"

export function LPPopUpCall(props) {
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
        router.push("/lp/thanks-call").then(() => router.reload());
        document.body.className = "";
      }, 400);
    },
  });
  return (
    <div className={style.inputs_block_out}>
      <div className={style.close_block} onClick={props.closeClick}></div>
      <div className={style.inputs_block}>
        <div className={style.close}>
          <button onClick={props.closeClick}>{icons.cross}</button>
        </div>
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
                  Подтверждаю, что ознакомился и согласен с условиями
                                </span>
                <Link href="/agreement">
                  <a> политики конфиденциальности</a>
                </Link>
              </p>
            </div>
            {/* <Link href="/lp/thanks-call"> */}
            <button
              type="submit"
              id={agreement ? Object.keys(formik.errors).length == 0 ? "lp-popup-call-submit" : null : null}
              className={`${agreement ? Object.keys(formik.errors).length == 0 ? style.general_button_active : style.general_button_inactive : style.general_button_inactive} "button-submit"`}
            >
              Узнать цену
            </button>
            {/* </Link> */}
          </form>
        </div>
      </div>
    </div >
  );
}

export function LPPopUpEmail(props) {
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
        router.push("/lp/thanks-catalog").then(() => router.reload());
        document.body.className = "";
      }, 400);
    },
  });
  return (
    <div className={style.inputs_block_out}>
      <div className={style.close_block} onClick={props.closeClick}></div>
      <div className={style.inputs_block}>
        <div className={style.close}>
          <button onClick={props.closeClick}>{icons.cross}</button>
        </div>
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
                  Подтверждаю, что ознакомился и согласен с условиями
                                </span>
                <Link href="/agreement">
                  <a> политики конфиденциальности</a>
                </Link>
              </p>
            </div>
            {/* <Link href="/lp/thanks-catalog"> */}
            <button
              type="submit"
              id={agreement ? Object.keys(formik.errors).length == 0 ? "lp-popup-email-submit" : null : null}
              className={`${agreement ? Object.keys(formik.errors).length == 0 ? style.general_button_active : style.general_button_inactive : style.general_button_inactive} "button-submit"`}
            >
              Получить каталог
                            </button>
            {/* </Link> */}
          </form>
        </div>
      </div>
    </div >
  );
}
export function LPPopUpBp(props) {
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
        router.push("/lp/thanks-bp").then(() => router.reload());
        document.body.className = "";
      }, 400);
    },
  });
  return (
    <div className={style.inputs_block_out}>
      <div className={style.close_block} onClick={props.closeClick}></div>
      <div className={style.inputs_block}>
        <div className={style.close}>
          <button onClick={props.closeClick}>{icons.cross}</button>
        </div>
        <div className={style.text_block}>
          <p className={style.title}>Заполните форму</p>
          <p className={style.paragraph}>
            Получите на почту бизнес-план
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
                  Подтверждаю, что ознакомился и согласен с условиями
                                </span>
                <Link href="/agreement">
                  <a> политики конфиденциальности</a>
                </Link>
              </p>
            </div>
            {/* <Link href="/lp/thanks-bp"> */}
            <button
              type="submit"
              id={agreement ? Object.keys(formik.errors).length == 0 ? "lp-popup-bp-submit" : null : null}
              className={`${agreement ? Object.keys(formik.errors).length == 0 ? style.general_button_active : style.general_button_inactive : style.general_button_inactive} "button-submit"`}
            >
              Получить БП
                            </button>
            {/* </Link> */}
          </form>
        </div>
      </div>
    </div>
  );
}