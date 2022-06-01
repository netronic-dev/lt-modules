import style from "./style.module.scss";
import Link from "next/link";
import { useState } from "react";
import { navData } from "../../Data/navData";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { LPPopUpBp, LPPopUpCall, LPPopUpEmail } from "../InputForms/LpForms/LpForms";

export default function LPHeader() {
  const [isBurgerOpen, setBurgerOpen] = useState(false);
  const [isInputFormOpen, setInputFormOpen] = useState(false);
  const [isCallFormOpen, setCallFormState] = useState(false);

  function openBurgerMenu() {
    setBurgerOpen(!isBurgerOpen);
    setInputFormOpen(false);
    isBurgerOpen === false
      ? (document.body.className = "popUp")
      : (document.body.className = "");
  }

  function onInputFormOpen() {
    setInputFormOpen(!isInputFormOpen);
    isInputFormOpen === true
      ? (document.body.className = "")
      : (document.body.className = "popUp");
  }

  function onCallFormViewChange() {
    setCallFormState(!isCallFormOpen);
    isCallFormOpen === true
      ? (document.body.className = "")
      : (document.body.className = "popUp");
  }

  return (
    <>
      {isInputFormOpen === true ? (
        <LPPopUpEmail closeClick={onInputFormOpen} />
      ) : (
          <></>
        )}
      {isCallFormOpen === true ? (
        <LPPopUpCall closeClick={onCallFormViewChange} />
      ) : (
          <></>
        )}
      <div
        className={`${isBurgerOpen === true ? style.menu_mobile__open : 0} ${style.header
          } ${isBurgerOpen === true ? "menu_mobile__open" : 0} header`}
      >
        <nav className={style.header_inside}>
          <ul className={style.menu}>
            <li className={style.header__logo}>
              <Link href="/lp">
                <a>
                  <img src="/forpost-logo.svg" alt="logo Forpost" />
                </a>
              </Link>
            </li>
            <li>
              <AnchorLink inset="100" href="#outdoor">
                Внеаренный лазертаг
              </AnchorLink>
            </li>
            <li>
              <AnchorLink href="#indoor">Аренный лазертаг</AnchorLink>
            </li>
            <li>
              <AnchorLink offset="100" href="#business">
                Бизнес-план
              </AnchorLink>
            </li>

            <li className={`${style.drop} ${style.phone_numbers}`}>
              <a target="_blank" href="tel:+74722402916">
                +7 472 240 29 16
              </a>
              <ul className={`${style.dropmenu} ${style.phonenumbers_menu}`}>
                <li className={style.phone_numbers}>
                  <span>Многоканальный телефон</span>
                  <a target="_blank" href="tel:+74722402916">
                    +7 472 240 29 16
                  </a>
                  <a target="_blank" href="tel:+74993504052">
                    +7 499 350 40 52
                  </a>
                </li>
                <li className={style.phone_numbers}>
                  <span>WhatsApp</span>
                  <a target="_blank" href="https://wa.me/79163276546">
                    +7 916 327 65 46
                  </a>
                </li>
                <li className={style.phone_numbers}>
                  <span>Viber</span>
                  <a target="_blank" href="viber://chat?number=+79163276546">
                    +7 916 327 65 46
                  </a>
                </li>
                <li className={style.phone_numbers}>
                  <span>Тех. поддержка</span>
                  <a target="_blank" href="tel:+74722402915">
                    +7 472 240 29 15
                  </a>
                </li>
              </ul>
            </li>
            <li className={style.nav_button}>
              <button
                onClick={onInputFormOpen}
                className={`${style.nav_button_button} header_catalog`}
              >
                Скачать каталог
              </button>
            </li>
          </ul>
          <div className={style.header_mobile}>
            <button
              className={style.header_mobile__burger}
              onClick={openBurgerMenu}
            >
              <svg
                width="20"
                height="11"
                viewBox="0 0 20 11"
                fill="none"
                className={`${isBurgerOpen === true
                  ? style.header_mobile__burger_svg_active
                  : 0
                  } ${style.header_mobile__burger_svg}`}
              >
                <line
                  className={style.burger_line_top}
                  y1="0.5"
                  x2="20"
                  y2="0.5"
                  stroke="white"
                />
                <line
                  className={style.burger_line_bottom}
                  y1="10.5"
                  x2="20"
                  y2="10.5"
                  stroke="white"
                />
              </svg>
            </button>
            <div className={style.header_mobile__logo}>
              <Link href="/lp">
                <a>
                  <img src="/forpost-logo.svg" alt="logo Forpost" />
                </a>
              </Link>
            </div>
            <button
              onClick={onCallFormViewChange}
              className={`${style.header_mobile__call} header_response_button`}
              style={isBurgerOpen === true ? { display: "none" } : null}
            >
              {isInputFormOpen === false ? (
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <circle
                    className={style.phone_icon__circle}
                    cx="13"
                    cy="13"
                    r="13"
                    fill="white"
                  />
                  <path
                    d="M19.0075 15.535C18.085 15.535 17.1925 15.385 16.36 15.115C16.0975 15.025 15.805 15.0925 15.6025 15.295L14.425 16.7725C12.3025 15.76 10.315 13.8475 9.2575 11.65L10.72 10.405C10.9225 10.195 10.9825 9.9025 10.9 9.64C10.6225 8.8075 10.48 7.915 10.48 6.9925C10.48 6.5875 10.1425 6.25 9.7375 6.25H7.1425C6.7375 6.25 6.25 6.43 6.25 6.9925C6.25 13.96 12.0475 19.75 19.0075 19.75C19.54 19.75 19.75 19.2775 19.75 18.865V16.2775C19.75 15.8725 19.4125 15.535 19.0075 15.535Z"
                    fill="#070707"
                  />
                </svg>
              ) : (
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none">
                    <line
                      x1="1.35355"
                      y1="0.646447"
                      x2="16.2028"
                      y2="15.4957"
                      stroke="white"
                    />
                    <line
                      y1="-0.5"
                      x2="21"
                      y2="-0.5"
                      transform="matrix(-0.707107 0.707107 0.707107 0.707107 16 1)"
                      stroke="white"
                    />
                  </svg>
                )}
            </button>
          </div>
          <div className={style.menu_mobile}>
            <div onClick={openBurgerMenu} className={style.mobile_menu__item}>
              <AnchorLink inset="100" href="#outdoor">
                <p className={style.mobile_menu__item_text}>
                  Внеаренный лазертаг
                </p>
              </AnchorLink>
            </div>
            <div onClick={openBurgerMenu} className={style.mobile_menu__item}>
              <AnchorLink href="#indoor">
                <p className={style.mobile_menu__item_text}>Аренный лазертаг</p>
              </AnchorLink>
            </div>
            <div onClick={openBurgerMenu} className={style.mobile_menu__item}>
              <AnchorLink offset="100" href="#business">
                <p className={style.mobile_menu__item_text}>Бизнес-план</p>
              </AnchorLink>
            </div>
            <div className={style.accordion}>
              <input
                type="checkbox"
                name="tab-group"
                id="phone-numbers"
                className={style.accordion__input}
              />
              <label htmlFor="phone-numbers" className={style.tab_title}>
                <a target="_blank" href="tel:+74993504052">
                  <p className={style.accordion__text}> +7 499 350 40 52</p>
                </a>
                <div className={style.accordion__arrow}>
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path
                      d="M10.59 7.40997L6 2.82997L1.41 7.40997L1.23266e-07 5.99997L6 -2.72274e-05L12 5.99997L10.59 7.40997Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </label>
              <span className={style.tab_content}>
                <ul>
                  <a target="_blank" href="tel:+74993504052">
                    <li className={style.tab_content__list_lp}>
                      <span>Многоканальный телефон</span>
                      +7 499 350 40 52
                    </li>
                  </a>
                  <a target="_blank" href="https://wa.me/79163276546">
                    <li className={style.tab_content__list_lp}>
                      <span>WhatsApp</span>
                      +7 916 327 65 46
                    </li>
                  </a>
                  <a target="_blank" href="viber://chat?number=+79163276546">
                    <li className={style.tab_content__list_lp}>
                      <span>Viber</span>
                      +7 916 327 65 46
                    </li>
                  </a>
                  <a target="_blank" href="tel:+74722402915">
                    <li className={style.tab_content__list_lp}>
                      <span>Тех. поддержка</span>
                      +7 472 240 29 15
                    </li>
                  </a>
                </ul>
              </span>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
