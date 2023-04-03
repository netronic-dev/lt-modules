import Slider from "react-slick";
import React from "react";
import Image from "next/image"
import style from "./style.module.scss"

export default function SliderReviews(props) {
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
    centerPadding: "550px",
    autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: (
      prevButton
    ),
    nextArrow: (
      nextButton
    ),
    responsive: [
      {
        breakpoint: 1750,
        settings: {
          centerPadding: "300px",
        },
      },
      {
        breakpoint: 1500,
        settings: {
          centerPadding: "200px",
        },
      },
      {
        breakpoint: 1200,
        settings: {
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 750,
        settings: {
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 500,
        settings: {
          centerPadding: "20px",
        },
      },
    ]
  };
  return (
    <div className="slider_reviews">
      <Slider {...settings}>
        {props.data.map((data, index) => (
          <BlockAdder
            image={data.image}
            alt={data.name}
            text={data.text}
            title={data.title}
            name={data.name}
            key={index}
          />
        ))}
      </Slider>
    </div>
  );
}

function BlockAdder(props) {
  return (
    <div className={style.cell}>
      <div className={style.review}>
        <div className={style.quot_left}>{quotLeft}</div>
        <p className={style.text}>{props.text}</p>
        <div className={style.quot_right}>{quotRight}</div>
      </div>
      <div className={style.info}>
        <Image
          src={props.image}
          layout="fixed"
          width={45}
          height={45}
          quality={90}
          priority={true}
        />
        <div className={style.text_block}>
          <p className={style.name}>
            {props.name}
          </p>
          <p className={style.title}>
            {props.title}
          </p>
        </div>
      </div>
    </div>
  );
}
const prevButton = (
  <svg width="77" height="77" viewBox="0 0 77 77" fill="none">
    <g filter="url(#filter0_d)">
      <circle cx="38.5" cy="34.5" r="34.5" fill="white" />
    </g>
    <path d="M43 22L32.8284 32.1716C31.2663 33.7337 31.2663 36.2663 32.8284 37.8284L43 48" stroke="black" strokeWidth="2" />
    <defs>
      <filter id="filter0_d" x="0" y="0" width="77" height="77" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
)
const nextButton = (
  <svg width="77" height="77" viewBox="0 0 77 77" fill="none">
    <g filter="url(#filter0_d)">
      <circle cx="38.5" cy="34.5" r="34.5" fill="white" />
    </g>
    <path d="M34 22L44.1716 32.1716C45.7337 33.7337 45.7337 36.2663 44.1716 37.8284L34 48" stroke="black" strokeWidth="2" />
    <defs>
      <filter id="filter0_d" x="0" y="0" width="77" height="77" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
)
const quotLeft = (
  <svg width="19" height="14" viewBox="0 0 19 14" fill="none">
    <path d="M18.0923 2.264C17.4203 2.456 16.8123 2.76 16.2683 3.176C15.7243 3.592 15.2603 4.072 14.8763 4.616C14.4923 5.128 14.2043 5.688 14.0123 6.296C13.8203 6.904 13.7563 7.496 13.8203 8.072H16.6043C16.8603 8.424 17.0683 8.824 17.2283 9.272C17.3883 9.72 17.4683 10.12 17.4683 10.472C17.4683 11.016 17.3883 11.544 17.2283 12.056C17.0683 12.536 16.8603 12.968 16.6043 13.352H11.2283C10.7163 12.168 10.4283 11.032 10.3643 9.944C10.3643 8.12 10.7003 6.6 11.3723 5.384C12.0763 4.136 12.9243 3.144 13.9163 2.408C14.9403 1.64 16.0443 1.128 17.2283 0.871999L18.0923 2.264ZM8.20425 2.264C7.53225 2.456 6.92425 2.76 6.38025 3.176C5.83625 3.592 5.37225 4.072 4.98825 4.616C4.60425 5.128 4.31625 5.688 4.12425 6.296C3.93225 6.904 3.86825 7.496 3.93225 8.072H6.71625C6.97225 8.424 7.18025 8.824 7.34025 9.272C7.50025 9.72 7.58025 10.12 7.58025 10.472C7.58025 11.016 7.50025 11.544 7.34025 12.056C7.18025 12.536 6.97225 12.968 6.71625 13.352H1.34025C0.82825 12.168 0.54025 11.032 0.47625 9.944C0.47625 8.12 0.81225 6.6 1.48425 5.384C2.18825 4.136 3.03625 3.144 4.02825 2.408C5.05225 1.64 6.15625 1.128 7.34025 0.871999L8.20425 2.264Z" fill="#0C1122" />
  </svg>
)
const quotRight = (
  <svg width="19" height="14" viewBox="0 0 19 14" fill="none">
    <path d="M0.90775 11.736C1.57975 11.544 2.18775 11.24 2.73175 10.824C3.27575 10.408 3.73975 9.928 4.12375 9.384C4.50775 8.872 4.79575 8.312 4.98775 7.704C5.17975 7.096 5.24375 6.504 5.17975 5.928L2.39575 5.928C2.13975 5.576 1.93175 5.176 1.77175 4.728C1.61175 4.28 1.53175 3.88 1.53175 3.528C1.53175 2.984 1.61175 2.456 1.77175 1.944C1.93175 1.464 2.13975 1.032 2.39575 0.648003L7.77175 0.648003C8.28375 1.832 8.57175 2.968 8.63575 4.056C8.63575 5.88 8.29975 7.4 7.62775 8.616C6.92375 9.864 6.07575 10.856 5.08375 11.592C4.05975 12.36 2.95575 12.872 1.77175 13.128L0.90775 11.736ZM10.7957 11.736C11.4678 11.544 12.0758 11.24 12.6197 10.824C13.1637 10.408 13.6277 9.928 14.0117 9.384C14.3957 8.872 14.6837 8.312 14.8757 7.704C15.0677 7.096 15.1317 6.504 15.0678 5.928L12.2837 5.928C12.0277 5.576 11.8197 5.176 11.6597 4.728C11.4997 4.28 11.4197 3.88 11.4197 3.528C11.4197 2.984 11.4997 2.456 11.6597 1.944C11.8197 1.464 12.0277 1.032 12.2837 0.648003L17.6597 0.648002C18.1717 1.832 18.4597 2.968 18.5237 4.056C18.5237 5.88 18.1877 7.4 17.5157 8.616C16.8118 9.864 15.9638 10.856 14.9718 11.592C13.9478 12.36 12.8438 12.872 11.6598 13.128L10.7957 11.736Z" fill="#0C1122" />
  </svg>
)