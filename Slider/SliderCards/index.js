import Slider from "react-slick";
import style from "./style.module.scss";
import Image from "next/image";
import { useInView } from "react-hook-inview";

export default function SimpleSlider(props) {
  const [ref, isVisible] = useInView({
    unobserveOnEnter: true,
  });
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    pauseonFocus: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: prevArrow,
    nextArrow: nextArrow,
  };
  return (
    <div
      className="sliderCards"
      ref={ref}
      key={isVisible ? "slider-inview" : "slider"}
    >
      <Slider {...settings}>
        {props.sliderData.map((data, index) => (
          <ImageAdder
            imageOne={data.imageOne}
            imageTwo={data.imageTwo}
            imageThree={data.imageThree}
            key={index}
          />
        ))}
      </Slider>
    </div>
  );
}

function ImageAdder(props) {
  return (
    <div className={style.grid_item}>
      <div className={style.grid_firstColumn}>
        <Image
          src={props.imageOne}
          layout="responsive"
          width={675}
          height={655}
          priority={true}
          className="zoom-animation animated-second"
          alt="slider"
        />
      </div>
      <div className={style.grid_secondColumn}>
        <Image
          src={props.imageTwo}
          layout="responsive"
          width={475}
          height={315}
          priority={true}
          className="zoom-animation animated-third"
          alt="slider"
        />
        <Image
          src={props.imageThree}
          layout="responsive"
          width={475}
          height={315}
          priority={true}
          className="zoom-animation animated-fourth"
          alt="Slider card image"
        />
      </div>
    </div>
  );
}
const prevArrow = (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
    <circle
      className="circle"
      cx="25"
      cy="25"
      r="25"
      transform="rotate(-180 25 25)"
      fill="#C4C4C4"
      fillOpacity="0.1"
    />
    <path
      className="arrow"
      d="M27.0002 31L28.4102 29.59L23.8302 25L28.4102 20.41L27.0002 19L21.0002 25L27.0002 31Z"
      fill="white"
    />
  </svg>
);
const nextArrow = (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
    <circle
      className="circle"
      cx="25"
      cy="25"
      r="25"
      fill="#C4C4C4"
      fillOpacity="0.1"
    />
    <path
      className="arrow"
      d="M22.9998 19L21.5898 20.41L26.1698 25L21.5898 29.59L22.9998 31L28.9998 25L22.9998 19Z"
      fill="white"
    />
  </svg>
);
