import style from "./style.module.scss";

export default function SectionComponent(props) {
  return (
    <section className={style.section} id="main">
      <div className={style.section_inner}>
        <div className={style.content}>
          <h1 className={style.title}>{props.title}</h1>
          <h2 className={style.subtitle}>{props.subtitle}</h2>
          <p className={style.text}>{props.text}</p>

          <div className={style.formula_boxes}>
            <div className={style.formula_box}>
              <span>You buy 10</span>
            </div>
            <div className={style.formula_box}>
              <span>+ 2 sets free</span>
            </div>
            <div className={style.formula_box}>
              <span>= 12 sets in your arena</span>
            </div>
          </div>
          <button className={style.button} onClick={props.onClick}>
            {props.buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}
