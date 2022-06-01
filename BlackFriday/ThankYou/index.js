import Link from "next/link"
import style from "./style.module.scss"

export default function IAAPAThankYou(props) {
  return (
    <section className={style.thank_you}>
      <div className={style.main}>
        <div className={style.main_in}>
          <h1 className={style.title}>
            {props.title}
          </h1>
          <p className={style.subtitle}>
            {props.subtitle}
          </p>
        </div>
      </div>
    </section>
  )
}