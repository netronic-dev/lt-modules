import style from "./pricebutton.module.scss";
import { useModals } from "../../context/ModalsProvider";

const fillButtonStyles = {
  "blueBlack": style.button_blue_black,
  "blueBlackArrow": style.button_blue_black_arrow,
  "blueWhiteArrow": style.button_blue_white_arrow,
  "blueWhite": style.button_blue_white,
  "white": style.button_white,
  "whiteBlack": style.button_white_black,
  "black": style.button_black,
  "pulse": style.button_pulse,
  "bigBlack": style.button_big_black,
  "bigBlue": style.button_big_blue,
  "whiteArrowBorder": style.white_arrow_border,
  "blackArrowBorder": style.black_arrow_border,
  "blueBlackMainBannerWithGirl": style.button_blue_black_main_banner_with_girl,
  "transparentGranade": style.button_transparentGranade,
  "partnershipMainBtn": style.partnershipMainBtn
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

export function BUTTON (props) {

  const modals = useModals();

  const modalType = {
    "call": modals.NamePhoneModalChangeVisibility,
    "catalog": modals.EmailPhoneModalChangeVisibility,
    "event": modals.EventModalChangeVisibility,
    "nameEmail": modals.NameEmailModalChangeVisibility
  };

  return (
    <>
      <button
        onClick={modalType[props.type || "call"]}
        className={`${fillButtonStyles[props.style || "blueBlack"]} ${props.uniqueClass}`}
      >
        {props.text}
        {props.arrow ?
          <div className={style.arrow_out}>{arrow}</div>
          : ""}
      </button>
    </>
  );
}

export function Button (props) {
  const modals = useModals();

  const modalType = {
    "call": modals.NamePhoneModalChangeVisibility,
    "catalog": modals.EmailPhoneModalChangeVisibility,
    "event": modals.EventModalChangeVisibility,
    "nameEmail": modals.NameEmailModalChangeVisibility
  };

  return (
    <button
      onClick={modalType[props.type || "call"]}
      className={`${fillButtonStyles[props.style || "blueBlack"]} ${props.uniqueClass}`}
    >
      {props.text || "Get catalog"}
    </button>
  );
}

export function FillButton (props) {
  return (
    <button
      className={`${fillButtonStyles[props.style || "blueBlack"]}
        ${props.className}
    `}
      id={props.id ? props.id : ""}
      type={props.submit ? "submit" : "button"}
      onClick={props.onClick}
      style={props.uppercase ? { textTransform: 'uppercase' } : null}
    >
      {props.text || "Download"}
      {props.arrow ? <div className={style.arrow_out}>{arrow}</div> : ""}
    </button>
  );
}

export function VideoButton (props) {

  const modals = useModals();

  return (
    <>
      <button
        className={
          videoButtonTheme[props.style || "normal"].style
        }
        style={props.uppercase ? { textTransform: 'uppercase' } : null}
        onClick={() => modals.VideoModalOpen(props.link)}
      >
        {videoButtonTheme[props.style || "normal"].playButton ? playIcon : ""}
        <div className={style.text}>
          {props.text || "Watch video"}
        </div>
        {props.circle_fill_icon ? playIconCircleFill : ""}
      </button>
    </>
  );
}

export function DefaultButton (props) {
  return (
    <button className={style.default_button}>
      <span>{props.text}</span>
      {arrow}
    </button>
  );
}

const arrow = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={style.arrow_vector}
  >
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
);
const playIconCircleFill = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={style.play_icon_circle_fill}>
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 16.5V7.5L16 12L10 16.5Z" fill="#0090FF" />
  </svg>

);