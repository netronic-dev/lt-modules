import style from "./style.module.scss";
import CountDownModule from "./CountDownModule";
import AnchorLink from "react-anchor-link-smooth-scroll";

export default function SectionComponent(props) {
  return (
    <section className={style.section}>
      <div className={style.section_inner}>
        <h2 className={style.title}>{props.title}</h2>
        <div className={style.timer_outer}>
          <CountDownModule
            date={props.date}
            afterDaysText={props.afterDaysText}
            afterHoursText={props.afterHoursText}
            afterMinutesText={props.afterMinutesText}
            afterSecondsText={props.afterSecondsText}
          />
        </div>
        <button className={style.button} onClick={props.onClick}>
          {props.buttonText}
        </button>
      </div>
    </section>
  );
}
