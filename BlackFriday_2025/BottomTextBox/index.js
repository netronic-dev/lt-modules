import style from "./style.module.scss";
import WordSlider from "../WordSlider";

export default function SectionComponent(props) {
  return (
    <section className={style.section} id="bottom_text_box">
      <div className={style.section_inner}>
        <div className={style.content}>
          <h2 className={style.subtitle}>{props.subtitle}</h2>
          <p className={style.text}>{props.text}</p>
        </div>
      </div>
      <WordSlider className={style.words_slider} text={props.sliderWordsText} />
    </section>
  );
}
