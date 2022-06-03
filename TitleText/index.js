import style from "./style.module.scss";
import ButtonDetails from "../../lt-modules/Buttons/ButtonDetails";

const themes = {
  Black: style.black,
  White: style.white,
};

const direction = {
  left: style.direction_left,
  right: style.direction_right
}

export function TitleText(props) {
  return (
    <div className={`${themes[props.theme]} ${direction[props.direction]}`
    }>
      <div className={style.inside}>
        <h2 className={style.title}>{props.title}</h2>
        {props.text
          ?
          (<p className={style.text}>{props.text}</p>)
          :
          <></>
        }
        <div className={style.margin}></div>
        <div className={style.buttons}>
          <ButtonDetails theme={props.theme} en={props.en} />
        </div>
      </div>
    </div >
  );
}

export function TextTitle(props) {
  return (
    <div className={`${themes[props.theme]} ${direction[props.direction]}`}>
      <div className={style.inside}>
        {props.text ? (<p className={style.text_reverse}>{props.text}</p>) : <></>}
        <h2 className={style.title_reverse}>{props.title}</h2>
        {props.description ?
          (<p className={style.text_description}>{props.description}</p>)
          :
          null
        }
        <div className={style.margin}></div>
        <div className={style.buttons_reverse}>
          <ButtonDetails theme={props.theme} en={props.en} />
        </div>
      </div>
    </ div>
  );
}
