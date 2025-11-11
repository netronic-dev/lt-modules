import style from "./style.module.scss"

export default function Slider(props) {
  return (
    <div
      className={`
      ${style.slider}
      ${props.className ? props.className : ""}
      `}
    >
      <div className={style.slider_left}>
        <p className={style.text}>
          {props.text}
        </p>
      </div>
      <div className={style.slider_right}>
        <p className={style.text}>
          {props.text}
        </p>
      </div>
    </div>
  )
}