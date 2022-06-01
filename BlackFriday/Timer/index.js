import style from "./style.module.scss"
import CountDownModule from './CountDownModule';
import Link from "next/link"

export default function SectionComponent(props) {

  return (
    <section className={style.section}>
      <div className={style.section_inner}>
        <h2 className={style.title}>
          {props.title}
        </h2>
        <div className={style.timer_outer}>
          <CountDownModule
            date={props.date}
            afterDaysText={props.afterDaysText}
            afterHoursText={props.afterHoursText}
            afterMinutesText={props.afterMinutesText}
            afterSecondsText={props.afterSecondsText}
          />
        </div>
        <Link href={props.buttonLink ? props.buttonLink : "/"}>
          <button className={style.button}>
            {props.buttonText}
          </button>
        </Link>
      </div>
    </section>
  )
}