import Slider from "react-slick";
import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import Image from "next/image"

export function SliderLeaders(props) {
  const [nav1, changeNav1] = useState(null);
  const [nav2, changeNav2] = useState(null);

  useEffect(() => {
    changeNav1(slider1)
    changeNav2(slider2)
  })

  let slider1 = null
  let slider2 = null
  const leadersImagesResponsive = [
    {
      breakpoint: 750,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ]
  const leadersTextResponsive = [
    {
      breakpoint: 750,
      settings: {
        arrows: true,
        prevArrow: (
          prevButton
        ),
        nextArrow: (
          nextButton
        ),
        centerMode: true,
        centerPadding: "50px",
      },
    },
    {
      breakpoint: 500,
      settings: {
        arrows: true,
        prevArrow: (
          prevButton
        ),
        nextArrow: (
          nextButton
        ),
        centerMode: true,
        centerPadding: "30px",
      },
    },
    {
      breakpoint: 400,
      settings: {
        arrows: true,
        prevArrow: (
          prevButton
        ),
        nextArrow: (
          nextButton
        ),
        centerMode: true,
        centerPadding: "0px",
      },
    },
  ]
  return (
    <div className={style.leaders}>
      <div className={`${style.leaders_text} leaders-slider_text`}>
        <Slider
          asNavFor={nav2}
          ref={slider => (slider1 = slider)}
          dots={false}
          infinite={true}
          speed={500}
          slidesToShow={1}
          swipe={true}
          slidesToScroll={1}
          arrows={false}
          responsive={leadersTextResponsive}
        >
          {props.data.map((data, index) => (
            <CellAdder
              title={data.title}
              name={data.name}
              surname={data.surname}
              text={data.text}
              image={data.image}
              key={index}
              arrows={false}
            />
          ))
          }
        </Slider>
      </div>
      <div className={`${props.slidesToShow === 3 ? style.leaders_images : style.leaders_images_grid} leaders-slider_images`}>
        <Slider
          asNavFor={nav1}
          ref={slider => (slider2 = slider)}
          dots={false}
          infinite={true}
          speed={500}
          slidesToShow={props.slidesToShow}
          swipe={false}
          arrows={false}
          slidesToScroll={0}
          focusOnSelect={true}
          responsive={leadersImagesResponsive}
        >
          {props.data.map((data, index) => (
            <ImageAdder
              image={data.image}
              key={index}
            />
          ))
          }
        </Slider>
      </div>
    </div >
  );
}

function CellAdder(props) {
  return (
    <div className={style.cell}>
      <div className={style.cell_image}>
        <Image src={props.image}
          layout="responsive"
          width={230}
          height={308}
          quality={90}
        />
      </div>
      <div className={style.main}>
        <p className={`${style.name} zoom-animation`}>
          <span className={style.blue}>{props.name}</span>
          <br />
          <span>{props.surname}</span>
        </p>
        <p className={`${style.title} zoom-animation animated-second`}>
          {props.title}
        </p>
      </div>
      <div className={style.text_block}>
        <div className={style.quote_left}>
          {quoteLeft}
        </div>
        <p className={`${style.text} zoom-animation animated-third`}>
          {props.text}
        </p>
        <div className={style.quote_right}>
          {quoteRight}
        </div>
      </div>
    </div>
  );
}

function ImageAdder(props) {
  return (
    <div className={`${style.image_block} active-image zoom-animation animated-third`}>
      <Image src={props.image} layout="fill" objectFit="contain" objectPosition="0 100%" />
    </div>
  )
}
const quoteRight = (
  <svg
    width="37"
    height="26"
    viewBox="0 0 37 26"
    fill="none"
  >
    <path d="M0.815501 22.472C2.1595 22.088 3.3755 21.48 4.4635 20.648C5.5515 19.816 6.4795 18.856 7.2475 17.768C8.0155 16.744 8.5915 15.624 8.9755 14.408C9.3595 13.192 9.4875 12.008 9.3595 10.856L3.7915 10.856C3.2795 10.152 2.8635 9.352 2.5435 8.456C2.2235 7.56001 2.0635 6.76001 2.0635 6.05601C2.0635 4.96801 2.2235 3.91201 2.5435 2.88801C2.8635 1.92801 3.2795 1.064 3.7915 0.296007L14.5435 0.296006C15.5675 2.66401 16.1435 4.93601 16.2715 7.112C16.2715 10.76 15.5995 13.8 14.2555 16.232C12.8475 18.728 11.1515 20.712 9.1675 22.184C7.1195 23.72 4.9115 24.744 2.5435 25.256L0.815501 22.472ZM20.5915 22.472C21.9355 22.088 23.1515 21.48 24.2395 20.648C25.3275 19.816 26.2555 18.856 27.0235 17.768C27.7915 16.744 28.3675 15.624 28.7515 14.408C29.1355 13.192 29.2635 12.008 29.1355 10.856L23.5675 10.856C23.0555 10.152 22.6395 9.352 22.3195 8.456C21.9995 7.56 21.8395 6.76 21.8395 6.05601C21.8395 4.968 21.9995 3.912 22.3195 2.88801C22.6395 1.928 23.0555 1.064 23.5675 0.296005L34.3195 0.296004C35.3435 2.664 35.9195 4.936 36.0475 7.112C36.0475 10.76 35.3755 13.8 34.0315 16.232C32.6235 18.728 30.9275 20.712 28.9435 22.184C26.8955 23.72 24.6875 24.744 22.3195 25.256L20.5915 22.472Z" fill="#0C1122" />
  </svg>
)
const quoteLeft = (
  <svg
    width="37"
    height="26"
    viewBox="0 0 37 26"
    fill="none"
  >
    <path d="M36.1845 3.528C34.8405 3.91199 33.6245 4.51999 32.5365 5.352C31.4485 6.184 30.5205 7.144 29.7525 8.232C28.9845 9.256 28.4085 10.376 28.0245 11.592C27.6405 12.808 27.5125 13.992 27.6405 15.144H33.2085C33.7205 15.848 34.1365 16.648 34.4565 17.544C34.7765 18.44 34.9365 19.24 34.9365 19.944C34.9365 21.032 34.7765 22.088 34.4565 23.112C34.1365 24.072 33.7205 24.936 33.2085 25.704H22.4565C21.4325 23.336 20.8565 21.064 20.7285 18.888C20.7285 15.24 21.4005 12.2 22.7445 9.768C24.1525 7.272 25.8485 5.288 27.8325 3.816C29.8805 2.27999 32.0885 1.25599 34.4565 0.743998L36.1845 3.528ZM16.4085 3.528C15.0645 3.91199 13.8485 4.51999 12.7605 5.352C11.6725 6.184 10.7445 7.144 9.9765 8.232C9.2085 9.256 8.6325 10.376 8.2485 11.592C7.8645 12.808 7.7365 13.992 7.8645 15.144H13.4325C13.9445 15.848 14.3605 16.648 14.6805 17.544C15.0005 18.44 15.1605 19.24 15.1605 19.944C15.1605 21.032 15.0005 22.088 14.6805 23.112C14.3605 24.072 13.9445 24.936 13.4325 25.704H2.6805C1.6565 23.336 1.0805 21.064 0.9525 18.888C0.9525 15.24 1.6245 12.2 2.9685 9.768C4.3765 7.272 6.0725 5.288 8.0565 3.816C10.1045 2.27999 12.3125 1.25599 14.6805 0.743998L16.4085 3.528Z" fill="#0C1122" />
  </svg>

)
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