import Slider from "react-slick";
import Image from "next/image";

export default function SliderSmallPics(props) {
  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1,
    swipe: false,
    pauseOnHover: false,
    speed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <div className="slider_small_pics">
      <Slider {...settings}>
        {props.data.map((data, index) => (
          <BlockAdder src={data.image} key={index} />
        ))}
      </Slider>
    </div>
  );
}

function BlockAdder(props) {
  return (
    <div className="slider_small_pics__cell">
      <Image src={props.src} layout="fill" objectFit="contain" alt="image" />
    </div>
  );
}
