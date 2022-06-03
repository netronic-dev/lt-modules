import Image from "next/image";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useInView } from "react-hook-inview";
import { useSwipeable } from "react-swipeable"
import style from "./style.module.scss"

export default function SliderImageCell(props) {

  const data = props.data
  const [activeCell, changeActiveCell] = useState(0)

  function Next() {
    if (activeCell + 1 < data.length) {
      changeActiveCell(activeCell + 1)
    } else {
      changeActiveCell(0)
    }
  }

  function Prev() {
    if (activeCell - 1 >= 0) {
      changeActiveCell(activeCell - 1)
    } else {
      changeActiveCell(data.length - 1)
    }
  }

  const swipeHandlers = useSwipeable({
    onSwipedRight: () => Prev(),
    onSwipedLeft: () => Next(),
    trackMouse: true
  });

  const [ref, isVisible] = useInView({
    unobserveOnEnter: true,
  })

  return (
    <div className={style.slider} {...swipeHandlers} ref={ref} key={isVisible ? 1 : 0}>
      <div className={style.slider__cell}>
        <Fade>
          <Image
            key={activeCell}
            className={style.image}
            src={data[activeCell].image}
            layout="responsive"
            width={1110}
            height={590}
            priority={true}
            quality={90}
          />
        </Fade>
      </div>
      <div className={`${style.slider__cell} ${style.cell_info}`}>
        <div className={style.top}>
          <img key={activeCell} className={`${style.logo} zoom-animation`} src={data[activeCell].logo} />
          <p className={style.page_number}>
            <span key={activeCell} className="fade-up-animation">
              {activeCell + 1}
            </span>
            /{data.length}
          </p>
        </div>
        <div className={style.text_block} key={activeCell}>
          <Fade direction="up" triggerOnce>
            <h3 className={style.title}>
              {data[activeCell].title}
            </h3>
            <p className={style.text}>
              {data[activeCell].text}
            </p>
          </Fade>
        </div>
        <div className={style.buttons} >
          <button className={`${style.button_prev} zoom-animation`} onClick={Prev}>{arrow}</button>
          <button className={`${style.button_next} zoom-animation animated-second`} onClick={Next}>
            <span>Next</span>
            {arrow}
          </button>
        </div>
      </div>
    </div>
  );
}

const arrow = (
  <svg width="31" height="22" viewBox="0 0 31 22" fill="none" className={style.arrow}>
    <path d="M10.85 22L13.0355 19.7843L5.9365 12.5714L31 12.5714L31 9.42857L5.9365 9.42857L13.051 2.21571L10.85 -1.76157e-06L9.61651e-07 11L10.85 22Z" fill="white" />
  </svg>
)