import style from "./header.module.scss";
import Link from "next/link";
import { useState } from "react";
import { PopUpCall } from "../InputForms/PopUpForms/PopUpForms"

export default function Header(props) {

  const [isInputFormOpen, setInputFormOpen] = useState(false);

  function onInputFormOpen() {
    setInputFormOpen(!isInputFormOpen);
    isInputFormOpen === true
      ? (document.body.className = "")
      : (document.body.className = "popUp");
  }
  return (
    <>
      {isInputFormOpen === true ? (
        <PopUpCall call={true} closeClick={onInputFormOpen} en={props.en} />
      ) : (
        <></>
      )}
      <div
        className={`${style.header}  `}
      >
        <div className={`${isInputFormOpen ? style.active : style.inactive} active`}>
        </div>
        <nav className={style.header_inside}>
          <ul className={style.menu}>
            <li className={`${props.ltNet ? style.header__logo_net : style.header__logo}`}>
              <Link href="/">
                <a>
                  <img src={props.ltNet ? "/ltnet-logo.svg" : "/forpost-logo.svg"} alt="logo Forpost" />
                </a>
              </Link>
            </li>
            {props.data.map((item, index) => (
              item.items ? (<HeaderHoverItem
                key={index}
                text={item.name}
                link={item.link}
                data={item.items}
              />) : <HeaderSingleItemMain key={index} text={item.name} link={item.link} />
            ))}
            <li
              className={`${style.phone_icon} ${style.nav__item}`}
              onClick={onInputFormOpen}
            >
              {phoneIcon}
            </li>
          </ul>
        </nav>
      </div>
    </>
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
)

function HeaderSingleItem(props) {
  return (
    <li className={style.nav__item}>
      {props.link ?
        (
          <Link href={props.link}>
            <a className={style.nav__item_a}>
              {props.text}
            </a>
          </Link>
        ) : (
          <a className={style.nav__item_a} target="_blank" href={props.linkA}>
            {props.text}
            {props.developing === true ?
              (< span className={style.developing}>
                В разработке
              </span>) : (
                null
              )
            }
          </a>
        )
      }
    </li >
  )
}

function HeaderHoverItem(props) {
  return (
    <li className={`${style.drop} ${style.nav__item_main}`}>
      {props.link ?
        (<Link href={props.link}>
          <a className={style.nav__item_main_a}>
            {props.text}
          </a>
        </Link>) : (<> {props.text}</>)}
      <ul className={style.dropmenu}>
        {props.data.map((item, index) => (
          <HeaderSingleItem
            key={index}
            text={item.name}
            link={item.link}
            linkA={item.linkA}
            developing={item.developing}
          />
        ))}
      </ul>
    </li >
  )
}

function HeaderSingleItemMain(props) {
  return (
    <li className={style.nav__item_main}>
      {props.link ?
        (
          <Link href={props.link}>
            <a className={style.nav__item_main_a}>
              {props.text}
            </a>
          </Link>
        ) : (
          <a target="_blank" href={props.linkA}>
            {props.text}
            {props.developing === true ?
              (< span className={style.developing}>
                В разработке
              </span>) : (
                null
              )
            }
          </a>
        )
      }
    </li >
  )
}