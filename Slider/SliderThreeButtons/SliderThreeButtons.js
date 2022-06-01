import Slider from "react-slick";
import React, { Component } from "react";

export default class SliderThreeButtons extends Component {
  render() {
    let buttonTitles = this.props.listofTitles;
    const settings = {
      customPaging: function (i) {
        return (
          <div>
            <button>{buttonTitles[i++]}</button>
          </div>
        );
      },
      dots: true,
      infinite: true,
      arrows: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div className="sliderThreeButtons">
        <Slider {...settings}>
          {this.props.sliderData.map((data, index) => (
            <ImageAdder
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

function ImageAdder(props) {
  return (
    <div className="slider__item">
      <img src={props.src} alt={props.alt} />
      <section className="slider__section">
        <h3 className="slider__title">{props.title}</h3>
        <p className="slider__text">{props.text}</p>
      </section>
    </div>
  );
}
