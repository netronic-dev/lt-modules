import Slider from "react-slick"
import React from "react"
import Image from "next/image"
import style from "./style.module.scss"
import { useModals } from "../../../context/ModalsProvider"

const theme = {
  "default": style.theme_default,
  "reverse": style.theme_reverse
}

export default function SliderReviewsLP(props) {

  const modals = useModals()

  const settings = {
    customPaging: function (i) {
      return (
        <div className="square">
          <button></button>
        </div>
      );
    },
    dots: false,
    infinite: true,
    autoplay: true,
    centerMode: true,
    swipe: true,
    swipeToSlide: true,
    pauseOnHover: true,
    centerPadding: props.left ? "0 0 100px" : "100px 0 0",
    autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    rtl: props.rtl ? props.rtl : false,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          centerPadding: props.left ? "0 0 50px" : "50px 0 0",
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: props.left ? 2 : 1,
          centerPadding: props.left ? "0 0 50px" : "100px 0 0",
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          centerPadding: props.left ? "0 0 10px" : "50px 0 0",
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          centerPadding: props.left ? "0 0 10px" : "20px 0 0",
        },
      },
    ]
  };
  return (
    <div
      className={`
        ${style.slider}
        ${theme[props.theme ? props.theme : "default"]}
        ${props.className}
        slider_reviews_lp
      `}
    >
      <Slider {...settings}>
        {props.data.map((data, index) => (
          <BlockAdder
            videoImg={data.videoImg}
            picture={data.picture}
            index={index}
            onVideoOpen={() => modals.VideoModalOpen(data.videoLink)}
            image={data.image}
            videoLink={data.videoLink}
            alt={data.name}
            text={data.text}
            name={data.name}
            location={data.location}
            key={index}
          />
        ))}
      </Slider>
    </div>
  );
}

function BlockAdder(props) {
  return (
    <div className={`${style.cell} fade-animation`}
    >
      <div className={style.cell_in}>
        <div className={style.review}>
          {props.text &&
            <p className={style.text}>{props.text}</p>
          }
          {props.videoLink &&
            <div
              className={style.video_preview}
              onClick={() => { props.onVideoOpen(props.videoLink) }}
            >
              <Image
                src={props.videoImg || `https://i.ytimg.com/vi/${props.videoLink}/maxresdefault.jpg`}
                className={style.video_preview__image}
                layout="fill"
                objectFit="cover"
                quality={75}
              />
              <div className={style.videoButton}>{videoIcon}</div>
            </div>}
          {props.picture &&
            <div
              className={style.video_preview}
            >
              <Image
                src={props.picture}
                className={style.video_preview__image}
                layout="fill"
                objectFit="cover"
              />
            </div>}
        </div>
        <div className={style.info}>
          {props.image &&
            <Image
              src={props.image}
              layout="fixed"
              width={55}
              height={54}
              quality={75}
            />}
          <div className={style.text_block}>
            <p className={style.name}>
              {props.name}
            </p>
            <p className={style.title}>
              {props.location}
            </p>
          </div>
        </div>
      </div>
      <div className={style.footer}>
      </div>
    </div >
  );
}
const videoIcon = (
  <svg width="81" height="81" viewBox="0 0 81 81" fill="none">
    <circle cx="40.4219" cy="40.415" r="39.1611" stroke="white" />
    <path d="M48.8604 40.4151L36.2025 47.7231L36.2025 33.1071L48.8604 40.4151Z" fill="white" />
  </svg>

)