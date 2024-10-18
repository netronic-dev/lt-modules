import style from "./style.module.scss";
import Link from "next/link";
import { useState } from "react";
import { useModals } from "../../context/ModalsProvider";
import { useGAEvents } from "../../context/GAEventsProvider";
import dynamic from "next/dynamic";
const Calendly = dynamic(() => import("../Calendly"), { ssr: false });
import { PopupModal } from "react-calendly";

export function HeaderMobile(props) {
  const [isBurgerOpen, setBurgerOpen] = useState(false);
  const [isOpen, setState] = useState(false);
  const [isCalendly, setIsCalendly] = useState(false);
  const modals = useModals();

  function onInputFormOpen() {
    modals.NamePhoneModalChangeVisibility();
  }

  function openBurgerMenu() {
    setBurgerOpen(!isBurgerOpen);
    isBurgerOpen === false
      ? (document.body.className = "popUp")
      : (document.body.className = "");
  }
  const GAEvents = useGAEvents();

  function onGAEventSend(link) {
    GAEvents.buttonClick("Header", "link click", link);
  }
  return (
    <>
      <nav
        className={`${style.navigation_mobile} ${
          isBurgerOpen ? style.burgerOpen : undefined
        }`}
      >
        <div className={style.header_mobile}>
          <button
            className={style.header_mobile__burger}
            onClick={openBurgerMenu}
          >
            <BurgerVector isBurgerOpen={isBurgerOpen} />
          </button>
          <div className={style.header_mobile__logo}>
            <Link href="/">
              <a onClick={() => onGAEventSend("/")}>
                <img src={props.logo} alt="logo" width={101} height="auto" />
              </a>
            </Link>
          </div>
          {/* <button
                        onClick={onInputFormOpen}
                        className={style.header_mobile__call}
                        style={
                            isBurgerOpen === true ? { display: 'none' } : null
                        }
                    >
                        {phoneIcon}
                    </button> */}
          <Calendly setIsCalendly={setIsCalendly} setState={setState} />
        </div>
        {isBurgerOpen ? (
          <div className={style.mobile__burger_menu}>
            {props.data.map((item, index) =>
              item.items ? (
                <HeaderAccordion
                  key={index}
                  data={item.items}
                  id={index}
                  link={item.link}
                  title={item.name}
                  click={openBurgerMenu}
                  onLinkClick={(link) => onGAEventSend(link)}
                />
              ) : (
                <NonBurgerItem
                  key={index}
                  link={item.link}
                  text={item.name}
                  click={openBurgerMenu}
                  onLinkClick={(link) => onGAEventSend(link)}
                />
              )
            )}
          </div>
        ) : (
          ""
        )}
      </nav>
      {isCalendly && (
        <PopupModal
          url="https://calendly.com/lasertag_net/30min"
          pageSettings={props.pageSettings}
          utm={props.utm}
          prefill={props.prefill}
          onModalClose={() => setState(false)}
          open={isOpen}
          rootElement={document.getElementById("__next")}
        />
      )}
    </>
  );
}

export function HeaderAccordion(props) {
  function onMenuButtonClick() {
    document.body.className = "";
  }
  return (
    <div className={style.accordion}>
      <input
        type="checkbox"
        name="tab-group"
        id={props.id}
        className={style.accordion__input}
      />
      <label htmlFor={props.id} className={style.tab_title}>
        {props.link ? (
          <Link href={props.link}>
            <p
              onClick={(props.click, onMenuButtonClick)}
              className={style.accordion__text}
            >
              {props.title}
            </p>
          </Link>
        ) : (
          <p className={style.accordion__text}>{props.title}</p>
        )}
        <div className={style.accordion__arrow}>{accordionArrow}</div>
      </label>
      <span className={style.tab_content}>
        <ul>
          {props.data.map((item, index) => (
            <HeaderAccordionItem
              key={index}
              link={item.link}
              text={item.name}
              click={props.click}
              developing={item.developing}
              items={item.items}
              onLinkClick={() => props.onLinkClick(item.link)}
            />
          ))}
        </ul>
      </span>
    </div>
  );
}

export function HeaderAccordionItem(props) {
  console.log(props, "props");
  console.log(props.items, "items");
  function onMenuButtonClick() {
    document.body.className = "";
  }
  return (
    <Link href={props.link ? props.link : ""}>
      <a target={props.blank ? "_blank" : false} onClick={props.onLinkClick}>
        <li
          onClick={(onMenuButtonClick, props.click)}
          className={style.tab_content__list}
        >
          {props.text}
        </li>
        {props.items && props.items.length > 0 && (
          <ul className={style.submenu}>
            {props.items.map((subItem, index) => (
              <li key={index} className={style.tab_content__list}>
                <Link href={subItem.link}>
                  <a
                    className={`${style.nav__item_a} ${style.submenu_item}`}
                    onClick={props.onLinkClick}
                  >
                    {subItem.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </a>
    </Link>
  );
}

function NonBurgerItem(props) {
  function onMenuButtonClick() {
    document.body.className = "";
  }
  return (
    <div
      onClick={(onMenuButtonClick, props.click)}
      className={style.nonBurgerItem}
    >
      <Link href={props.link}>
        <a onClick={props.onLinkClick}>
          <p className={style.nonBurgerItem_text}>{props.text}</p>
        </a>
      </Link>
    </div>
  );
}

function BurgerVector(props) {
  return (
    <svg
      width="20"
      height="11"
      viewBox="0 0 20 11"
      fill="none"
      className={props.isBurgerOpen ? style.burger_svg_active : undefined}
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
  );
}

const phoneIcon = (
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
);

const accordionArrow = (
  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
    <path
      d="M10.59 7.40997L6 2.82997L1.41 7.40997L1.23266e-07 5.99997L6 -2.72274e-05L12 5.99997L10.59 7.40997Z"
      fill="white"
    />
  </svg>
);
