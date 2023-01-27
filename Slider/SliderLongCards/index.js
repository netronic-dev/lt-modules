import Slider from 'react-slick';
import React, { useState } from 'react';
import style from './style.module.scss';
import { useInView } from 'react-hook-inview';

export function SliderLongCards(props) {
    const [isIndoor, doorChange] = useState(true);
    const [buttonsRef, buttonsIsVisible] = useInView({
        unobserveOnEnter: true,
    });
    const [sliderRef, sliderIsVisible] = useInView({
        unobserveOnEnter: true,
    });
    function onDoorChange() {
        doorChange(!isIndoor);
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 400,
        slidesToShow: 6,
        swipe: false,
        slidesToScroll: 3,
        prevArrow: prevArrow,
        nextArrow: nextArrow,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToScroll: 2,
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 3,
                    swipe: true,
                },
            },
            {
                breakpoint: 675,
                settings: {
                    slidesToScroll: 2,
                    slidesToShow: 2,
                    swipe: true,
                },
            },
        ],
    };
    return (
        <>
            <div
                className={`${style.buttons__outside} fade-up-animation`}
                ref={buttonsRef}
                key={
                    buttonsIsVisible
                        ? 'long-slider-buttons-inview'
                        : 'long-slider-buttons'
                }
            >
                <div className={style.slider__buttons} onClick={onDoorChange}>
                    <button
                        className={
                            isIndoor
                                ? style.active_button
                                : style.inactive_button
                        }
                    >
                        {props.indoorText}
                    </button>
                    <button
                        className={
                            isIndoor
                                ? style.inactive_button
                                : style.active_button
                        }
                    >
                        {props.outdoorText}
                    </button>
                </div>
            </div>
            <div
                className={`${style.sliderLongCards} sliderLongCards`}
                ref={sliderRef}
                key={sliderIsVisible ? 'slider-long-inview' : 'slider-long'}
            >
                <Slider {...settings}>
                    {isIndoor
                        ? props.dataIndoor.map((data, index) => (
                              <ImageAdder
                                  src={data.image}
                                  alt={data.text}
                                  itemText={data.text}
                                  description={data.description}
                                  key={index}
                                  delay={(index + 1) * 100}
                              />
                          ))
                        : props.dataOutdoor.map((data, index) => (
                              <ImageAdder
                                  src={data.image}
                                  alt={data.sliderImgAlt}
                                  itemText={data.text}
                                  description={data.description}
                                  key={index}
                                  delay={(index + 1) * 100}
                              />
                          ))}
                </Slider>
            </div>
        </>
    );
}

function ImageAdder(props) {
    return (
        <div
            style={{
                animationDelay: props.delay + 'ms',
            }}
            className={`${style.sliderLongCards_item} sliderLongCards_item zoom-animation`}
        >
            <div className={style.sliderLongCards_grid}>
                <div className={style.sliderLongCards_text}>
                    <p>{props.description}</p>
                </div>
                <div className={style.sliderLongCards_section}>
                    <div className={style.sliderLongCards_image}>
                        <img src={props.src} alt={props.alt} />
                    </div>
                    <p
                        className={`${style.sliderLongCards_title}
              sliderLongCards_text`}
                    >
                        {props.itemText}
                    </p>
                </div>
                <div className={style.sliderLongCards_circle}>
                    <svg
                        width='30'
                        height='30'
                        viewBox='0 0 30 30'
                        fill='none'
                        className={style.circle__svg}
                    >
                        <path
                            className={style.svg__circle}
                            d='M15 2.5C8.1 2.5 2.5 8.1 2.5 15C2.5 21.9 8.1 27.5 15 27.5C21.9 27.5 27.5 21.9 27.5 15C27.5 8.1 21.9 2.5 15 2.5ZM15 25C9.4875 25 5 20.5125 5 15C5 9.4875 9.4875 5 15 5C20.5125 5 25 9.4875 25 15C25 20.5125 20.5125 25 15 25Z'
                            fill='#8E8E8E'
                        />
                        <path
                            className={style.svg__cross}
                            d='M13.75 8.75H16.25V13.75H21.25V16.25H16.25V21.25H13.75V16.25H8.75V13.75H13.75V8.75Z'
                            fill='#8E8E8E'
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
const prevArrow = (
    <svg width='50' height='50' viewBox='0 0 50 50' fill='none'>
        <circle
            cx='25'
            cy='25'
            r='25'
            transform='rotate(-180 25 25)'
            fill='#C4C4C4'
            fillOpacity='0.1'
        />
        <path
            className='arrow'
            d='M27.0002 31L28.4102 29.59L23.8302 25L28.4102 20.41L27.0002 19L21.0002 25L27.0002 31Z'
            fill='white'
        />
    </svg>
);
const nextArrow = (
    <svg width='50' height='50' viewBox='0 0 50 50' fill='none'>
        <circle cx='25' cy='25' r='25' fill='#C4C4C4' fillOpacity='0.1' />
        <path
            className='arrow'
            d='M22.9998 19L21.5898 20.41L26.1698 25L21.5898 29.59L22.9998 31L28.9998 25L22.9998 19Z'
            fill='white'
        />
    </svg>
);
