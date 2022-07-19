import Slider from "react-slick";
import Image from "next/image"
import style from "./style.module.scss"
import { useRef } from "react";
import { useInView } from "react-hook-inview";

export default function SliderMobile(props) {

  const [ref, isVisible] = useInView({
    unobserveOnEnter: true
  })
  const [buttonsRef, isButtonsVisible] = useInView({
    unobserveOnEnter: true
  })
  const sliderRef = useRef();

  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    arrows: false,
    autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "200px 0 0 0",
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          centerPadding: "100px 0 0 0",
        },
      },
      {
        breakpoint: 1200,
        settings: {
          centerPadding: "50px 0 0 0",
        },
      },
      {
        breakpoint: 992,
        settings: {
          centerMode: false,
          centerPadding: "0 0 0 0",
        },
      },
    ]
  };

  function Next() {
    sliderRef.current.slickNext()
  }

  function Prev() {
    sliderRef.current.slickPrev()
  }

  return (
    <div className="slider_mobile" ref={ref} key={isVisible ? "slider_mobile_visible" : null}>
      <Slider {...settings} ref={sliderRef}>
        {props.data.map((data, index) => (
          <BlockAdder
            image={data.image}
            alt={data.title}
            text={data.text}
            title={data.title}
            width={props.width}
            height={props.height}
            key={index}
            next={Next}
            prev={Prev}
          />
        ))}
      </Slider>
      <div className={style.buttons} ref={buttonsRef} key={isButtonsVisible ? "buttons_vis" : "buttons"}>
        <button
          className={`${style.button} zoom-animation`}
          onClick={Prev}
        >
          {prevButton}
        </button>
        <button
          className={`${style.button} zoom-animation animated-second`}
          onClick={Next}
        >
          {nextButton}
        </button>
      </div>
    </div>
  );
}

function BlockAdder(props) {
  return (
    <div className={style.cell}>
      <div className={style.cell__image}>
        <Image
          alt={props.alt}
          src={props.image}
          className="fade-animation"
          layout="responsive"
          width={props.width}
          height={props.height}
          priority
        />
      </div>
      <div className={`${style.content} slider_mobile__content`} onClick={props.next}>
        <h3 className={`${style.cell__title} fade-up-animation`}>
          {props.title}
        </h3>
        <p className={`${style.cell__text} fade-up-animation`}>
          {props.text}
        </p>
      </div>
    </div>
  );
}

const prevButton = (
  <svg width="68" height="68" viewBox="0 0 68 68" fill="none" className={style.button_prev}>
    <rect x="67.4375" y="67.438" width="67.438" height="67.438" rx="10" transform="rotate(-180 67.4375 67.438)" fill="white" className={style.square} />
    <path d="M22.0792 32.6581C21.4934 33.2439 21.4934 34.1936 22.0792 34.7794L31.6252 44.3254C32.2109 44.9111 33.1607 44.9111 33.7465 44.3254C34.3323 43.7396 34.3323 42.7898 33.7465 42.204L25.2612 33.7187L33.7465 25.2335C34.3323 24.6477 34.3323 23.6979 33.7465 23.1121C33.1607 22.5264 32.2109 22.5264 31.6252 23.1121L22.0792 32.6581ZM43.6357 32.2188L23.1399 32.2187L23.1399 35.2187L43.6357 35.2188L43.6357 32.2188Z" fill="#0090FF" />
  </svg>
)

const nextButton = (
  <svg width="68" height="68" viewBox="0 0 68 68" fill="none" className={style.button_next}>
    <rect x="0.5625" width="67.438" height="67.438" rx="10" fill="white" className={style.square} />
    <path d="M45.9208 34.7799C46.5066 34.1941 46.5066 33.2444 45.9208 32.6586L36.3748 23.1126C35.7891 22.5268 34.8393 22.5268 34.2535 23.1126C33.6677 23.6984 33.6677 24.6482 34.2535 25.234L42.7388 33.7192L34.2535 42.2045C33.6677 42.7903 33.6677 43.7401 34.2535 44.3258C34.8393 44.9116 35.7891 44.9116 36.3748 44.3258L45.9208 34.7799ZM24.3643 35.2192H44.8601V32.2192H24.3643V35.2192Z" fill="#0090FF" />
  </svg>
)
