import Slider from 'react-slick';
import React, { Component } from 'react';

export class SliderClients extends Component {
    render() {
        const settings = {
            dots: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 3500,
            speed: 1000,
            slidesToShow: 3,
            slidesToScroll: 3,
            responsive: [
                {
                    breakpoint: 780,
                    settings: {
                        slidesToScroll: 2,
                        slidesToShow: 2,
                    },
                },
                {
                    breakpoint: 580,
                    settings: {
                        slidesToScroll: 1,
                        slidesToShow: 1,
                    },
                },
            ],
            prevArrow: prevArrow,
            nextArrow: nextArrow,
        };
        return (
            <div className='slider_clients'>
                <Slider {...settings}>
                    {this.props.data.map((data, index) => (
                        <BlockAdder
                            src={data.image}
                            alt={data.title}
                            title={data.title}
                            text={data.text}
                            key={index}
                        />
                    ))}
                </Slider>
            </div>
        );
    }
}

function BlockAdder(props) {
    return (
        <div className='slider_clients_item'>
            <div className='slider_clients_picture'>
                <picture>
                    <img src={props.src} alt={props.alt} />
                </picture>
            </div>
            <p className='slider_clients_title'>{props.title}</p>
            <p className='slider_clients_text'>{props.text}</p>
        </div>
    );
}
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
