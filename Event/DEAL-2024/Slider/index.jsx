import Image from "next/image";
import Slider from "react-slick";

import style from "./style.module.scss";
import { useEffect, useState } from "react";

const EventSlider = (props) => {
  const [isDesktop, setIsDesktop] = useState(null);
  const [activeSlide, setActiveSlide] = useState(1);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
  }, []);

  const PrevArrow = ({ onClick }) => {
    return (
      <div className={style.prev_arrow} onClick={onClick}>
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="25" cy="25" r="25" fill="#0090FF" />
          <g clipPath="url(#clip0_63_128)">
            <path
              d="M27 31L28.41 29.59L23.83 25L28.41 20.41L27 19L21 25L27 31Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_63_128">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="translate(37 37) rotate(-180)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    );
  };

  const NextArrow = ({ onClick }) => {
    return (
      <div className={style.next_arrow} onClick={onClick}>
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="25" cy="25" r="25" fill="#0090FF" />
          <g clipPath="url(#clip0_63_134)">
            <path
              d="M23 19L21.59 20.41L26.17 25L21.59 29.59L23 31L29 25L23 19Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_63_134">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="translate(13 13)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    );
  };

  const settings = {
    centerMode: isDesktop ? true : false,
    infinite: true,
    centerPadding: isDesktop ? "10%" : "0",
    slidesToShow: 1,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (prev, next) => {
      setActiveSlide(next + 1);
    },
  };

  return (
    <div className="event__slider_deal">
      <Slider {...settings}>
        {props.imagesData.map((item, index) => (
          <div className={style.slide} key={index}>
            <Image
              src={item}
              alt={`slide${index + 1}`}
              layout="fill"
              objectFit="cover"
              objectPosition="50% 50%"
              quality={100}
              priority
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default EventSlider;
