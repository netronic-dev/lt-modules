import NewVideo from "../NewVideo";
import style from "./style.module.scss"

export function VideoPopUp(props) {
  return (
    <div
      className={`
      ${style.video_popup_out}
      ${theme[props.theme ? props.theme : "default"].style}
      `}
    >
      <div className={style.close_block} onClick={props.onClick}>
      </div>
      <div className={style.video_popup}>
        <div className={style.button_out} onClick={props.onClick}>
          <button className={style.video_button_close}>
            {theme[props.theme ? props.theme : "default"].icon}
          </button>
        </div>
        <div className={style.video_block}>
          <NewVideo
            autoplay={props.autoplay}
            additional_scripts={props.additional_scripts}
            withoutPreview={props.withoutPreview}
            videoIconLP={props.theme === "lp" ? true : false}
            link={props.link}
          />
        </div>
      </div>
    </div>
  )
}

const cross = (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle className={style.cross_bg} cx="14" cy="14" r="14" fill="#212121" />
    <path
      className={style.cross}
      d="M21 8.41L19.59 7L14 12.59L8.41 7L7 8.41L12.59 14L7 19.59L8.41 21L14 15.41L19.59 21L21 19.59L15.41 14L21 8.41Z"
      fill="white"
    />
  </svg >
)

const crossLP = (
  <svg width="80" height="35" viewBox="0 0 80 35" fill="none" className={style.cross_lp}>
    <rect x="0.5" y="0.5" width="79" height="34" rx="17" stroke="white" />
    <path d="M47 12.41L45.59 11L40 16.59L34.41 11L33 12.41L38.59 18L33 23.59L34.41 25L40 19.41L45.59 25L47 23.59L41.41 18L47 12.41Z" fill="#8E8E8E" />
  </svg>
)

const theme = {
  "lp": {
    style: style.lp,
    icon: crossLP
  },
  "default": {
    icon: cross
  }
}