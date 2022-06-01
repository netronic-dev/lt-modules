import Countdown, { zeroPad } from 'react-countdown';
import style from "./style.module.scss"

export default function CountDown(props) {

  const afterDaysText = props.afterDaysText
  const afterHoursText = props.afterHoursText
  const afterMinutesText = props.afterMinutesText
  const afterSecondsText = props.afterSecondsText

  const renderer = (props) => {
    return (
      <div className={style.timer}>
        <div className={style.number}>
          {zeroPad(props.days)}
        </div>
        <div className={style.text}>
          {afterDaysText}
        </div>
        <div className={style.number}>
          {zeroPad(props.hours)}
        </div>
        <div className={style.text}>
          {afterHoursText}
        </div>
        <div className={style.number}>
          {zeroPad(props.minutes)}
        </div>
        <div className={style.text}>
          {afterMinutesText}
        </div>
        <div className={`${style.number} ${style.seconds}`}>
          {zeroPad(props.seconds)}
        </div>
        <div className={style.text}>
          {afterSecondsText}
        </div>
      </div>
    );
  };

  return (
    <Countdown date={props.date} renderer={renderer} />
  )
}

