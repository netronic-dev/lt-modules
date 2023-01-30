import Slider from 'react-slick';
import React, { Component } from 'react';
import Image from 'next/image';

export default function SliderLand(props) {
    const settings = {
        customPaging: function (i) {
            return (
                <div className='square'>
                    <button></button>
                </div>
            );
        },
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3500,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: prevArrow,
        nextArrow: nextArrow,
    };
    return (
        <div className={props.eclipse ? 'slider_land_eclipse' : 'slider_land'}>
            <Slider {...settings}>
                {props.sliderData.map((data, index) => (
                    <BlockAdder
                        src={data.image}
                        alt={data.itemText}
                        itemText={data.itemText}
                        key={index}
                        width={props.width}
                        height={props.height}
                        itemTitle={data.itemTitle}
                        eclipse
                    />
                ))}
            </Slider>
        </div>
    );
}

function BlockAdder(props) {
    return (
        <div className={props.eclipse ? 'slider_land_eclipse' : 'slider_land'}>
            <div className='slider_land_upper_part_dark'>
                <div className='slider_land_upper_part'></div>
            </div>
            <div
                className={
                    props.eclipse
                        ? 'slider_land_picture_eclipse'
                        : 'slider_land_picture'
                }
            >
                <Image
                    src={props.src}
                    alt={props.alt}
                    width={props.width}
                    height={props.height}
                />
            </div>
            <div className='slider_land_content'>
                <h3
                    className={
                        props.eclipse
                            ? 'slider_land_title_eclipse'
                            : 'slider_land_title'
                    }
                >
                    {props.itemTitle}
                </h3>
                <p
                    className={
                        props.eclipse
                            ? 'slider_land_text_eclipse'
                            : 'slider_land_text'
                    }
                >
                    {props.itemText}
                </p>
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
