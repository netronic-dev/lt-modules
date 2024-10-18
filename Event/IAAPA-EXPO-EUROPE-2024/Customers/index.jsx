import Image from "next/image";
import Slider from "react-slick";
import style from "./style.module.scss";
import { useModals } from "../../../../context/ModalsProvider";
import useIsTablet from "../../../../hooks/useIsTablet";
import { useRef, useState } from "react";
import useIsDesktop from "../../../../hooks/useIsDesktop";

const PrevArrow = ({ onClick }) => {
  return (
    <div className={style.prev_arrow} onClick={onClick}>
      <svg
        width="30"
        height="30"
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
        width="30"
        height="30"
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

const Customers = (props) => {
  const modals = useModals();
  const isDesktop = useIsDesktop({ width: 1024 });
  const [activeSlide, setActiveSlide] = useState(1);

  const getLInk = (index) => {
    switch (index) {
      case 0:
        return "SCeoOnjKmMY";
      case 1:
        return "Fd9_F5lmOYg";
      case 2:
        return "VGkBFgFQ8aw";
      default:
        break;
    }
  };

  const settings = {
    centerMode: false,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 1,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (prev, next) => {
      setActiveSlide(next + 1);
    },
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className={style.customers}>
      <div className={style.container}>
        <h2 className={style.title}>{props.title}</h2>
        <p className={style.text}>{props.text}</p>
        {isDesktop ? (
          <div className={style.grid}>
            {props.data.map((item, index) => (
              <div className={style.cell} key={index}>
                <button
                  className={style.cell_image}
                  onClick={() => modals.VideoModalOpen(getLInk(index))}
                  target="_blank"
                >
                  <Image
                    src={item.src}
                    alt={item.text}
                    layout="fill"
                    objectFit="contain"
                  />

                  <div className={style.bg_hover}>
                    <Image
                      src={props.youtube}
                      alt="Youtube logo"
                      width={55}
                      height={40}
                    />
                  </div>
                </button>
                <div className={style.divider}></div>
                <button
                  onClick={() => modals.VideoModalOpen(getLInk(index))}
                  target="_blank"
                  className={style.cell_text}
                >
                  {item.text}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="event__slider_iaapa_2024">
            <Slider {...settings}>
              {props.data.map((item, index) => (
                <div className={style.slide} key={index}>
                  <div className={style.cell}>
                    <a
                      className={style.cell_image}
                      onClick={() => modals.VideoModalOpen(getLInk(index))}
                      target="_blank"
                    >
                      <Image
                        src={item.src}
                        alt={`slide${index + 1}`}
                        layout="fill"
                        objectFit="contain"
                        objectPosition="50% 50%"
                        quality={100}
                      />
                    </a>
                    <div className={style.divider}></div>
                    <a
                      onClick={() => modals.VideoModalOpen(getLInk(index))}
                      target="_blank"
                      className={style.cell_text}
                    >
                      {item.text}
                    </a>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
};

export default Customers;
