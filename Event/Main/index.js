import Image from "next/image"
import style from "./style.module.scss"
import CountDownModule from "../CountDownModule"

export default function IAAPAMain(props) {
  return (
    <section className={style.main}>
      <div className={style.main__in}>
        <h1 className={style.title}>
          {props.title}
        </h1>
        <div className={style.event_info_top}>
          <div className={style.event_info_top__logo}>
            <Image
              src={props.logo}
              layout="fill"
              objectFit="contain"
              objectPosition="0 0"
            />
          </div>
          {props.text ?
            <div className={style.event_info_top__text}>
              {props.text}
            </div> : ""}
          <div className={style.counter_outer}>
            <h2 className={style.counter_title}>
              {props.counterTitle}
            </h2>
            <CountDownModule
              date={props.counterDate}
              afterDaysText={props.afterDaysText}
              afterHoursText={props.afterHoursText}
              afterMinutesText={props.afterMinutesText}
              afterSecondsText={props.afterSecondsText}
            />
          </div>
        </div>
        <div className={style.event_info}>
          <div className={style.when}>
            <div className={style.date}>
              {calendarIcon}
              {props.dateName}
            </div>
            <p className={style.date_text}>
              {props.date}
            </p>
          </div>
          <div className={style.where}>
            <div className={style.place}>
              {placeIcon}
              {props.placeName}
            </div>
            <p className={style.place_text}>
              {props.place_text}
            </p>
          </div>
        </div>
        <div
          className={`
            ${style.image}
            ${props.imageResponsive ? style.image_with_resp_ver : ""}
        `}
        >
          {props.image ?
            <div className={style.image_desktop}>
              <Image
                src={props.image}
                layout="fill"
                objectFit="cover"
                objectPosition={props.objectPosition}
              />
            </div> : ""}
          {props.imageResponsive ?
            <div className={style.image_responsive}>
              <Image
                src={props.imageResponsive}
                layout="fill"
                objectFit="cover"
                objectPosition={props.objectPosition}
              />
            </div> : ""}
        </div>
      </div>
    </section>
  )
}

const calendarIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M7 11H9V13H7V11ZM21 6V20C21 21.1 20.1 22 19 22H5C3.89 22 3 21.1 3 20L3.01 6C3.01 4.9 3.89 4 5 4H6V2H8V4H16V2H18V4H19C20.1 4 21 4.9 21 6ZM5 8H19V6H5V8ZM19 20V10H5V20H19ZM15 13H17V11H15V13ZM11 13H13V11H11V13Z" fill="#8E8E8E" />
  </svg>
)

const placeIcon = (
  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" >
    <path d="M12.2378 2.5C8.36779 2.5 5.23779 5.63 5.23779 9.5C5.23779 14.75 12.2378 22.5 12.2378 22.5C12.2378 22.5 19.2378 14.75 19.2378 9.5C19.2378 5.63 16.1078 2.5 12.2378 2.5ZM7.23779 9.5C7.23779 6.74 9.47779 4.5 12.2378 4.5C14.9978 4.5 17.2378 6.74 17.2378 9.5C17.2378 12.38 14.3578 16.69 12.2378 19.38C10.1578 16.71 7.23779 12.35 7.23779 9.5Z" fill="#8E8E8E" />
    <path d="M12.2378 12C13.6185 12 14.7378 10.8807 14.7378 9.5C14.7378 8.11929 13.6185 7 12.2378 7C10.8571 7 9.73779 8.11929 9.73779 9.5C9.73779 10.8807 10.8571 12 12.2378 12Z" fill="#8E8E8E" />
  </svg>
)
