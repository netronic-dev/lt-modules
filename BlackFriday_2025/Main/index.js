import style from "./style.module.scss";
import Image from "next/image";
import WordSlider from "../WordSlider";
// import AnchorLink from "react-anchor-link-smooth-scroll";

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
        <div className={`${style.image_outer} ${style.desktop}`}>
          <Image
            src={props.image}
            layout="fill"
            objectFit="cover"
            objectPosition={props.objectPosition}
            priority={true}
            alt="image"
          />
        </div>
        <div className={`${style.image_outer} ${style.responsive}`}>
          <Image
            src={props.image_responsive}
            layout="fill"
            objectFit="cover"
            objectPosition={props.image_responsive_objectPosition}
            priority={true}
            alt="image"
          />
        </div>
      </div>
      <WordSlider className={style.words_slider} text={props.sliderWordsText} />
    </section>
  );
}
