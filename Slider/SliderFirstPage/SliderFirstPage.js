import React, { Component } from "react";
import Slider from "react-slick";
import { TitleText } from "../../LandModules/TitleText/TitleText";
import style from "./style.module.scss";

const bgStyles = {
  bgOne: style.One,
  bgTwo: style.Two,
  bgThree: style.Three,

  bgFour: style.Four,
  bgFive: style.Five,
  bgSix: style.Six,
};
export default class SliderFirstPage extends Component {
  render() {
    let buttonTitles = this.props.listofTitles;
    const settings = {
      customPaging: function (i) {
        return (
          <div>
            <button className="slider_borderButtons">
              {buttonTitles[i++]}
            </button>
          </div>
        );
      },
      dots: true,
      infinite: true,
      arrows: false,
      autoplay: true,
      speed: 1000,
      autoplaySpeed: 4000,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div className="image_button_slider">
        <Slider {...settings}>
          <div className={bgStyles[this.props.slideStyleOne]}>
            <div className={style.bg}>
              <TitleText
                title={this.props.titleOne}
                text={this.props.textOne}
                theme={this.props.styleOne}
              />
            </div>
          </div>
          <div className={bgStyles[this.props.slideStyleTwo]}>
            <div className={style.bg}>
              <TitleText
                title={this.props.titleTwo}
                text={this.props.textTwo}
                theme={this.props.styleTwo}
              />
            </div>
          </div>
          <div className={bgStyles[this.props.slideStyleThree]}>
            <div className={style.bg}>
              <TitleText
                title={this.props.titleThree}
                text={this.props.textThree}
                theme={this.props.styleThree}
              />
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}
