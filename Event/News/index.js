import Image from "next/image";
import style from "./style.module.scss";
import Slider from "react-slick";
import CTA from "../CTA";

export default function IAAPANews(props) {
  const settings = {
    customPaging: function (i) {
      return (
        <button className="dot-out">
          <div className="dot"></div>
        </button>
      );
    },
    dots: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <button>{prevButton}</button>,
    nextArrow: <button>{nextButton}</button>,
    responsive: [
      {
        breakpoint: 1750,
        settings: {
          centerPadding: "300px",
        },
      },
    ],
  };
  return (
    <section className={style.news}>
      <div className={style.news__in}>
        <h2 className={style.title}>{props.title}</h2>
        <div className={`${style.slider} iaapa_slider`}>
          <Slider {...settings}>
            {props.data.map((data, index) => (
              <Cell
                key={index}
                title={data.title}
                text={data.text}
                image={data.image}
                imageResponsive={data.imageResponsive}
              />
            ))}
          </Slider>
        </div>
      </div>
      <CTA
        text={props.cta_text}
        buttonText={props.cta_buttonText}
        onClick={props.cta_button_onClick}
      />
    </section>
  );
}

function Cell(props) {
  return (
    <div
      className={`
        ${style.cell}
        ${props.imageResponsive ? style.cell_with_resp_img : ""}
      `}
    >
      <div className={`${style.cell_image} ${style.desktop}`}>
        <Image
          src={props.image}
          layout="fill"
          objectFit="cover"
          objectPosition="50% 0"
          alt="laser tag convetion"
        />
      </div>
      {props.imageResponsive ? (
        <div className={`${style.cell_image} ${style.responsive}`}>
          <Image
            src={props.imageResponsive}
            layout="fill"
            objectFit="cover"
            objectPosition="50% 0"
            alt="laser tag convetion"
          />
        </div>
      ) : (
        ""
      )}
      <div className={style.content}>
        <h3 className={style.cell_title}>{props.title}</h3>
        <p className={style.cell_text}>{props.text}</p>
      </div>
    </div>
  );
}
const prevButton = (
  <svg width="51" height="51" viewBox="0 0 51 51" fill="none">
    <circle
      cx="25.2197"
      cy="25.4163"
      r="25"
      transform="rotate(-180 25.2197 25.4163)"
      fill="#C4C4C4"
    />
    <path
      d="M27.2199 31.4163L28.6299 30.0063L24.0499 25.4163L28.6299 20.8263L27.2199 19.4163L21.2199 25.4163L27.2199 31.4163Z"
      fill="white"
    />
  </svg>
);
const nextButton = (
  <svg width="50" height="51" viewBox="0 0 50 51" fill="none">
    <circle cx="25" cy="25.4163" r="25" fill="#C4C4C4" />
    <path
      d="M23.0001 19.4163L21.5901 20.8263L26.1701 25.4163L21.5901 30.0063L23.0001 31.4163L29.0001 25.4163L23.0001 19.4163Z"
      fill="white"
    />
  </svg>
);
