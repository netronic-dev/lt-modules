import { nanoid } from "nanoid"
import style from "./style.module.scss"

export default function Card(props) {
  return (
    <div className={style.cell}>
      <div className={style.top}>
        <p className={style.subtitle}>
          {props.subtitle}
        </p>
        <h4 className={style.title}>
          {props.title}
        </h4>
      </div>
      <div>
        {props.data.map((item) => (
          <Field
            key={nanoid()}
            title={item.name}
            text={item.text}
          />
        ))}
      </div>
    </div>
  )
}

const Field = (props) => {
  return (
    <div className={style.field}>
      <p className={style.field_title}>{props.title}:</p>
      <p className={style.field_text}>{props.text}</p>
    </div>
  )
}