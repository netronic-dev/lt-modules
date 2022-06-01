import Link from "next/link";
import { useState } from "react";
import { bcClubsMap } from "../../Data/breadCrumbData";
import { PageLayout } from "../../Layouts/PageLayout";
import { BreadCrumbs } from "../BreadCrumbs/BreadCrumbs";
import style from "./style.module.scss";
import { clubsData } from "../../Data/clubsData";

export default function InputPage(props) {
  const [clubNameInput, changeClubName] = useState(null);
  const [cityInput, changeCity] = useState(null);
  const [addressInput, changeAddress] = useState(null);
  const [phoneInput, changePhone] = useState(null);
  const [emailInput, changeEmail] = useState(null);
  const [linkInput, changeLink] = useState(null);
  const [socialLink, changeSocialLink] = useState(null);
  const [socialLinkSecond, changeSocialLinkSecond] = useState(null);
  const [privacyPolicy, changePrivacyPolicy] = useState(false);
  const [thankYouPage, showthankYouPage] = useState(false);

  function onClubNameChange(event) {
    changeClubName(event.target.value);
  }
  function onCityChange(event) {
    changeCity(event.target.value);
  }
  function onAddressChange(event) {
    changeAddress(event.target.value);
  }
  function onPhoneChange(event) {
    changePhone(event.target.value);
  }
  function onEmailChange(event) {
    changeEmail(event.target.value);
  }
  function onLinkChange(event) {
    changeLink(event.target.value);
  }
  function onSocialLinkChange(event) {
    changeSocialLink(event.target.value);
  }
  function onSecondSocialLinkChange(event) {
    changeSocialLinkSecond(event.target.value);
  }
  function onChangePrivacyPolicy() {
    changePrivacyPolicy(!privacyPolicy);
  }
  return (
    <div className={style.page}>
      <PageLayout>
        <BreadCrumbs color="grey" breadcrumbData={bcClubsMap} />
        <div className={style.inputs_head}>
          <div className={style.inputs_head__content}>
            <h2 className={style.inputs_title}>Заявка на добавление клуба</h2>
            <p className={style.inputs_text}>
              Заполните форму для добавления Вашего клуба на интерактивную карту
              клиентов FORPOST
            </p>
          </div>
          <div
            className={style.inputs_head__back}
            onClick={props.changeInputsView}
          >
            <button className={style.inputs_head__button}>
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                <path
                  d="M7.41016 1.41L2.83016 6L7.41016 10.59L6.00016 12L0.00015614 6L6.00016 -6.16331e-08L7.41016 1.41Z"
                  fill="#8E8E8E"
                  className={style.input_vector}
                />
              </svg>
              <span className={style.inputs_head__button_text}>Назад</span>
            </button>
          </div>
        </div>
        <div className={style.inputs_body}>
          <input
            className={style.inputs_body__input}
            type="text"
            onChange={onClubNameChange}
            name="clubName"
            placeholder="Название клуба"
          />
          <input
            className={style.inputs_body__input}
            type="text"
            name="city"
            onChange={onCityChange}
            placeholder="Выберите город"
          />
          {cityInput !== null ? <DroppedList data={clubsData} /> : <></>}
          <input
            className={style.inputs_body__input}
            type="text"
            onChange={onAddressChange}
            name="address"
            placeholder="Адрес"
          />
          <input
            className={style.inputs_body__input}
            type="tel"
            name="phone"
            onChange={onPhoneChange}
            placeholder="Телефон"
          />
          <input
            className={style.inputs_body__input}
            type="email"
            onChange={onEmailChange}
            name="email"
            placeholder="Email"
          />
          <input
            className={style.inputs_body__input}
            type="url"
            name="site"
            onChange={onLinkChange}
            placeholder="Введите URL cайта"
          />
          <input
            className={style.inputs_body__input}
            type="url"
            onChange={onSocialLinkChange}
            name="socialLink"
            placeholder="Введите URL соц.сети"
          />
          <input
            className={style.inputs_body__input}
            type="url"
            onChange={onSecondSocialLinkChange}
            name="socialLinkSecond"
            placeholder="Введите URL соц.сети"
          />
        </div>
        <div className={style.send_block}>
          <div
            className={style.send_block_left}
            onClick={onChangePrivacyPolicy}
          >
            <button
              className={`${style.radio} ${privacyPolicy === true ? style.radio_active : 0
                }`}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle
                  className={style.circle}
                  cx="10"
                  cy="10"
                  r="9.5"
                  fill="#212121"
                  stroke="#4F4F4F"
                />
              </svg>
            </button>
            <p className={style.send_block__text}>
              Подтверждаю, что ознакомился и согласен с условиями
              <Link href="/agreement">
                <a> политики конфиденциальности</a>
              </Link>
            </p>
          </div>
          <button
            className={`${style.send_button} ${privacyPolicy === true ? style.send_button_active : 0
              }`}
          >
            Отправить
          </button>
        </div>
      </PageLayout>
    </div>
  );
}
function SocialLinks() {
  return (
    <div className={style.social_block}>
      <div className={style.social}>Facebook</div>
      <input
        className={style.inputs_bottom__input}
        type="url"
        name="link"
        placeholder="Введите URL cайта"
      />
    </div>
  );
}
function DroppedList(props) {
  return (
    <div className={style.dropped_list}>
      {props.data.map((data) => (
        <DroppedListElement text={data.city} />
      ))}
    </div>
  );
}
function DroppedListElement(props) {
  return <p>{props.text}</p>;
}
