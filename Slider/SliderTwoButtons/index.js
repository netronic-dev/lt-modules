import Slider from "react-slick";
import React, { Component } from "react";
import Image from "next/image"
export default class SliderTwoButtons extends Component {
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
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div className="sliderTwoButtons">
        <Slider {...settings}>
          {this.props.sliderData.map((data, index) => (
            <ImageAdder
              src={data.image}
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
    <div>
      <p>{props.text}</p>
      <Image src={props.src} layout="responsive" width={1180} height={485} />
    </div>
  );
}
