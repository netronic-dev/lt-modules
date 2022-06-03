import Slider from "react-slick";
import React, { useEffect, useRef } from "react";
import style from "./style.module.scss";
import { useInView } from 'react-hook-inview'

export function SliderRoadmap(props, inViewport) {
  const customSlider = useRef();

  const [ref, isVisible] = useInView({
    onEnter: () => setTimeout(sliderGoToStart, 1000),
    onLeave: () => setTimeout(sliderGoToEnd, 1000),
  })

  useEffect(sliderGoToEnd, [])
  const settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 5,
    swipe: true,
    slidesToScroll: 10,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    pauseonFocus: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: true,
        },
      },
    ]
  };
  function sliderGoToEnd() {
    customSlider.current.slickGoTo(10)
  }
  function sliderGoToStart() {
    customSlider.current.slickGoTo(0)
  }

  return (
    <>
      <div className={style.slider_out} ref={ref} onClick={sliderGoToStart}>
        <div className={`${style.slider} slider-roadmap`}>
          <Slider
            {...settings}
            ref={slider => (customSlider.current = slider)}
          >
            {props.data.map((data, index) => (
              <CellAdder
                title={data.year}
                text={data.text}
                image={data.image}
                big={data.big}
                key={index}
              />
            ))
            }
          </Slider>
        </div>
      </div>
    </>
  );
}

function CellAdder(props) {
  return (
    <div className={style.cell}>
      <div className={style.image_block_out}>
        <div className={`${style.line_out} line_out`}>
          <div className={`${style.line} line`}></div>
        </div>
        <div className={`${style.image_block} `}>
          <div className={`${style.image_out} ${props.big ? style.big : null}`}>
            {props.image ?
              (<img src={props.image} alt={props.text} />) :
              null}
          </div>
        </div>
      </div>
      <div className={style.text_block}>
        <p className={style.title}>{props.title}</p>
        <p className={style.text}>{props.text}</p>
      </div>
    </div>
  );
}
