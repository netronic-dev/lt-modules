import Slider from "react-slick";
import React, { Component } from "react";
import Image from "next/image";

export default class SliderTwoButtons extends Component {
  render() {
    let buttonTitles = this.props.listofTitles;
    const settings = {
      customPaging: function (i) {
        return (
          <div>
            <button>
              {buttonTitles[i++]}
            </button>
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
      <>
        {this.props.vest ? (
          <div className="sliderTwoButtonsDownBtnVest">
            <Slider {...settings}>
              {this.props.sliderData.map((data, index) => (
                <ImageAdder
                  src={data.image}
                  key={index}
                  height={data.imgHeight}
                  width={data.imgWidth}
                />
              ))}
            </Slider>
          </div>
        ) : (
          <div
            className={
              this.props.downButtons
                ? "sliderTwoButtonsDownBtn"
                : "sliderTwoButtons"
            }
          >
            <Slider {...settings}>
              {this.props.sliderData.map((data, index) => (
                <ImageAdder
                  src={data.image}
                  key={index}
                  height={data.imgHeight}
                  width={data.imgWidth}
                />
              ))}
            </Slider>
          </div>
        )}
      </>
    );
  }
}

function ImageAdder(props) {
  return (
    <div>
      <p>{props.text}</p>
      <Image
        src={props.src}
        layout="responsive"
        width={props.width || 1180}
        height={props.height || "485"}
        alt="slider"
      />
    </div>
  );
}
