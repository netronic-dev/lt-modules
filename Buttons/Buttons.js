import style from "./pricebutton.module.scss";
import { useState } from "react";
import { PopUpCall, PopUpEmail, PopUpEvent, PopUpNameEmail, PopUpOutdoor } from "../InputForms/PopUpForms/PopUpForms";
import { LPPopUpBp, LPPopUpCall, LPPopUpEmail } from "../InputForms/LpForms/LpForms";
import { VideoPopUp } from "../Video/Video";

const fillButtonStyles = {
  blueBlack: style.button_blue_black,
  blueBlackArrow: style.button_blue_black_arrow,
  blueWhiteArrow: style.button_blue_white_arrow,
  blueWhite: style.button_blue_white,
  white: style.button_white,
  whiteBlack: style.button_white_black,
  black: style.button_black,
  pulse: style.button_pulse,
  bigBlack: style.button_big_black,
  bigBlue: style.button_big_blue,
  whiteArrowBorder: style.white_arrow_border,
  blackArrowBorder: style.black_arrow_border,
};

const videoButtonTheme = {
  normal: {
    style: style.video_button,
    playButton: true
  },
  dark: {
    style: style.video_button_dark,
    playButton: true
  },
  blueBlack: {
    style: style.button_blue_black,
    playButton: false
  },
  borderCircleButtonWhite: {
    style: style.button_border_white,
    playButton: false
  },
  borderCircleButtonBlack: {
    style: style.button_border_black,
    playButton: false
  },
};

export function BUTTON(props) {

  const popUpType = {
    "call":
      (<PopUpCall
        text={props.text}
        closeClick={onInputFormOpen}
        en={props.en}
      />),
    "callLP":
      (<LPPopUpCall
        closeClick={onInputFormOpen}
      />),
    "catalogLP":
      (<LPPopUpEmail
        closeClick={onInputFormOpen}
      />),
    "business":
      (<LPPopUpBp closeClick={onInputFormOpen} />),
    "catalog":
      (<PopUpEmail
        en={props.en}
        id={props.id}
        closeClick={onInputFormOpen}
        title={props.formTitle}
        subtitle={props.formSubtitle}
        buttonText={props.buttonText}
        emailFormID={props.emailFormID}
        phoneFormID={props.phoneFormID}
      />),
    "outdoor":
      (<PopUpOutdoor
        en={props.en}
        closeClick={onInputFormOpen}
      />),
    "event":
      (<PopUpEvent
        en={props.en}
        text={props.text}
        eventNumber={props.eventNumber}
        closeClick={onInputFormOpen}
        subTitle={props.subTitle}
        buttonText={props.buttonText}
      />),
    "nameEmail":
      (<PopUpNameEmail
        en={props.en}
        closeClick={onInputFormOpen}
        title={props.title}
        subTitle={props.subTitle}
        emailFormID={props.emailFormID}
        nameFormID={props.nameFormID}
        buttonText={props.buttonText}
        id={props.id}
      />)
  }

  const [isInputFormOpen, setInputFormOpen] = useState(false);

  function onInputFormOpen() {
    setInputFormOpen(!isInputFormOpen);
    isInputFormOpen === true
      ? (document.body.className = "")
      : (document.body.className = "popUp");
  }

  return (
    <>
      {isInputFormOpen ? popUpType[props.type] : null}
      <button
        onClick={onInputFormOpen}
        className={`${fillButtonStyles[props.style ? props.style : "blueBlack"]} ${props.uniqueClass}`}
      >
        {props.text ? props.text : "Узнать цену"}
        {props.arrow ? <div className={style.arrow_out}>{arrow}</div> : null}
      </button>
    </>
  )
}

export function PriceButton(props) {
  const [isInputFormOpen, setInputFormOpen] = useState(false);
  function onInputFormOpen() {
    setInputFormOpen(!isInputFormOpen);
    isInputFormOpen === true
      ? (document.body.className = "")
      : (document.body.className = "popUp");
  }
  return (
    <>
      {isInputFormOpen === true ?
        props.call ?
          (<PopUpCall
            text={props.text}
            closeClick={onInputFormOpen}
            en={props.en}
          />)
          : props.callLP ?
            (<LPPopUpCall
              closeClick={onInputFormOpen}
            />)
            : props.catalogLP ?
              (<LPPopUpEmail
                closeClick={onInputFormOpen}
              />)
              : props.business ?
                (<LPPopUpBp closeClick={onInputFormOpen} />)
                : props.catalog ?
                  (<PopUpEmail
                    en={props.en}
                    closeClick={onInputFormOpen}
                  />)
                  : props.outdoor ?
                    (<PopUpOutdoor
                      en={props.en}
                      closeClick={onInputFormOpen}
                    />)
                    : props.event ?
                      (<PopUpEvent
                        en={props.en}
                        text={props.text}
                        eventNumber={props.eventNumber}
                        closeClick={onInputFormOpen}
                        subTitle={props.subTitle}
                        buttonText={props.buttonText}
                      />)
                      : (<PopUpCall
                        en={props.en}
                        text={props.text}
                        closeClick={onInputFormOpen}
                      />) : null}
      < button
        onClick={onInputFormOpen}
        className={`${fillButtonStyles[props.style ? props.style : "blueBlack"]} ${props.uniqueClass}`}
      >
        {props.text ? props.text : "Узнать цену"}
      </button>
    </>
  );
}

export function FillButton(props) {
  return <button
    className={`${fillButtonStyles[props.style ? props.style : "blueBlack"]}
    ${props.className}
    `}
    id={props.id ? props.id : ""}
    type={props.submit ? "submit" : "button"}
    onClick={props.onClick}
    style={props.uppercase ? { textTransform: 'uppercase' } : null}
  >
    {props.text ? props.text : "Скачать"}
    {props.arrow ? <div className={style.arrow_out}>{arrow}</div> : null}
  </button>;
}

export function VideoButton(props) {
  const [showVideo, changeVideoState] = useState(false)
  function changeVideoVisibility() {
    changeVideoState(!showVideo)
    showVideo === true
      ? (document.body.className = "")
      : (document.body.className = "popUp");
  }
  return (
    <>
      <button
        className={
          videoButtonTheme[props.style ? props.style : "normal"].style
        }
        style={props.uppercase ? { textTransform: 'uppercase' } : null}
        onClick={changeVideoVisibility}
      >
        {videoButtonTheme[props.style ? props.style : "normal"].playButton ? playIcon : ""}
        <div className={style.text}>{props.text ? props.text : "Смотреть видео"}</div>
        {props.circle_fill_icon ? playIconCircleFill : ""}
      </button>
      {
        showVideo ?
          (<VideoPopUp
            withoutPreview={props.withoutPreview}
            theme={props.theme}
            new={props.new}
            onClick={changeVideoVisibility}
            link={props.link}
          />) : ""
      }
    </>
  );
}

export function DefaultButton(props) {
  return (
    <button className={style.default_button}>
      <span>{props.text}</span>
      {arrow}
    </button>
  );
}

const arrow = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={style.arrow_vector}>
    <path
      className={style.arrow}
      d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z"
      fill="#0090FF"
    />
  </svg>
);

const playIcon = (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle
      className={style.stroke}
      cx="18"
      cy="18"
      r="17"
      stroke="white"
      strokeWidth="2"
    />
    <path
      className={style.fill}
      d="M23.5 17.134C24.1667 17.5189 24.1667 18.4811 23.5 18.866L14.5 24.0622C13.8333 24.4471 13 23.966 13 23.1962L13 12.8038C13 12.034 13.8333 11.5529 14.5 11.9378L23.5 17.134Z"
      fill="white"
    />
  </svg>
)
const playIconCircleFill = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={style.play_icon_circle_fill}>
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 16.5V7.5L16 12L10 16.5Z" fill="#0090FF" />
  </svg>

)