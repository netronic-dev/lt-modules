import style from "./style.module.scss"
import Image from "next/image"
import WordSlider from "../WordSlider"
import Link from "next/link"

export default function SectionComponent(props) {
  return (
    <section className={style.section}>
      <div className={style.section_inner}>
        <div className={style.content}>
          <h1 className={style.title}>
            {props.title}
          </h1>
          <p className={style.text}>
            {props.text}
          </p>
          <Link href={props.buttonLink ? props.buttonLink : "/"}>
            <button className={style.button}>
              {props.buttonText}
            </button>
          </Link>
        </div>
        <div className={`${style.image_outer} ${style.desktop}`}>
          <Image
            src={props.image}
            layout="fill"
            objectFit="cover"
            objectPosition={props.objectPosition}
            priority={true}
          />
        </div>
        <div className={`${style.image_outer} ${style.responsive}`}>
          <Image
            src={props.image_responsive}
            layout="fill"
            objectFit="cover"
            objectPosition={props.image_responsive_objectPosition}
            priority={true}
          />
        </div>
      </div>
      <WordSlider
        className={style.words_slider}
        text={props.sliderWordsText}
      />
    </section>
  )
}