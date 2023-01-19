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
      <div className={style.how_find}>
        <div className={style.text_block}>
          <h2 className={style.how_find__title}>
            {props.title2}
          </h2>
          <div className={style.when}>
            <div className={style.when__title}>
              {calendarIcon}
              {props.dateName}
            </div>
            <p className={style.when__text}>
              {props.date}
            </p>
          </div>
          <div className={style.where}>
            <div className={style.where__title}>
              {placeIcon}
              {props.placeName}
            </div>
            <p className={style.where__text}>
              {props.placeText}
            </p>
          </div>
          <div className={style.calendar}>
            <p className={style.calendar__text}>
              {props.calendarText}
            </p>
            <Link href={props.calendarLink}>
              <a className={style.calendar__button_link} target="_blank">
                <button className={style.calendar__button}>
                  {calendar_icon_button}
                  {props.calendarButtonText}
                </button>
              </a>
            </Link>
          </div>
        </div>
        {props.mapImage ?
          <div className={style.map}>
            <img src={props.mapImage} />
          </div>
          : ""}
      </div>
    </section>
  )
}
const calendarIcon = (
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" className={style.calendar_icon}>
    <path d="M7 11.8906H9V13.8906H7V11.8906ZM21 6.89062V20.8906C21 21.9906 20.1 22.8906 19 22.8906H5C3.89 22.8906 3 21.9906 3 20.8906L3.01 6.89062C3.01 5.79063 3.89 4.89062 5 4.89062H6V2.89062H8V4.89062H16V2.89062H18V4.89062H19C20.1 4.89062 21 5.79063 21 6.89062ZM5 8.89062H19V6.89062H5V8.89062ZM19 20.8906V10.8906H5V20.8906H19ZM15 13.8906H17V11.8906H15V13.8906ZM11 13.8906H13V11.8906H11V13.8906Z" fill="#8E8E8E" />
  </svg>
)
const placeIcon = (
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" className={style.place_icon}>
    <path d="M12 2.89062C8.13 2.89062 5 6.02063 5 9.89062C5 15.1406 12 22.8906 12 22.8906C12 22.8906 19 15.1406 19 9.89062C19 6.02063 15.87 2.89062 12 2.89062ZM7 9.89062C7 7.13062 9.24 4.89062 12 4.89062C14.76 4.89062 17 7.13062 17 9.89062C17 12.7706 14.12 17.0806 12 19.7706C9.92 17.1006 7 12.7406 7 9.89062Z" fill="#8E8E8E" />
    <path d="M12 12.3906C13.3807 12.3906 14.5 11.2713 14.5 9.89062C14.5 8.50991 13.3807 7.39062 12 7.39062C10.6193 7.39062 9.5 8.50991 9.5 9.89062C9.5 11.2713 10.6193 12.3906 12 12.3906Z" fill="#8E8E8E" />
  </svg>

)
const calendar_icon_button = (
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" className={style.calendar_icon_button}>
    <path d="M19 4.89062H18V2.89062H16V4.89062H8V2.89062H6V4.89062H5C3.89 4.89062 3.01 5.79063 3.01 6.89062L3 20.8906C3 21.9906 3.89 22.8906 5 22.8906H19C20.1 22.8906 21 21.9906 21 20.8906V6.89062C21 5.79063 20.1 4.89062 19 4.89062ZM19 20.8906H5V10.8906H19V20.8906ZM19 8.89062H5V6.89062H19V8.89062ZM12 13.8906H17V18.8906H12V13.8906Z" fill="white" />
  </svg>

)