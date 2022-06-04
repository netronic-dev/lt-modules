import style from "./style.module.scss";
import { TitleText } from "../TitleText";
import Link from "next/link";
import { Component } from "react";
import Image from "next/image"

const theme = {
  "White": "white_tile",
  "Black": "black_tile",
};

export function TileGridWidth(props) {
  return (
    <>
      <div
        className={`${style.tile} ${theme[props.style]}`}
        style={{ height: props.height }}>
        <Link href={props.link}>
          <a>
            {props.bg ? (<div className={style.tile_bg}
              style={{ backgroundColor: props.bgColor }}
            >
              <Image
                alt={props.title}
                src={props.bg}
                priority={true}
                layout="fill"
                objectPosition={props.objectPosition ? props.objectPosition : "50% 50%"}
                objectFit={props.contain ? "contain" : "cover"}
              />
            </div>) :
              (<div className="tile_bg_responsive">
                <div className="tile_bg_desktop"
                  style={{ backgroundColor: props.bgColor }}
                >
                  <Image
                    alt={props.title}
                    src={props.bgDesktop}
                    layout="fill"
                    priority={true}
                    objectPosition={props.objectPosition ? props.objectPosition : "50% 50%"}
                    objectFit={props.contain ? "contain" : "cover"}
                  />
                </div>
                <div
                  className="tile_bg_mobile"
                  style={{ backgroundColor: props.bgColor }}
                >
                  <Image
                    alt={props.title}
                    src={props.bgResponsive}
                    layout="fill"
                    objectPosition={props.objectPosition ? props.objectPosition : "50% 50%"}
                    priority={true}
                    objectFit={props.contain ? "contain" : "cover"}
                  />
                </div>
              </div>)}
            <div className={style.text}>
              <TitleText
                title={props.title}
                text={props.text}
                theme={props.style}
                en={props.en}
              />
            </div>
          </a>
        </Link>
      </div>
    </>
  );
}

export function TileGridWidthLeft(props) {
  return (
    <div
      className={`${theme[props.style]} ${style.tile_left}`}
      style={{ background: props.color, height: props.height }}
    >
      <Link href={props.link}>
        <a>
          <div className={style.tile_left_side}>
            <div style={{ background: props.color }} className={style.left}>
              <TitleText
                title={props.title}
                text={props.text}
                theme={props.style}
                en={props.en}
              />
            </div>
            <div className={style.right}>
              <Image
                priority={true}
                alt={props.title}
                src={props.bg}
                layout="fill"
                objectFit="cover"
                objectPosition="100% 100%"
                quality={90}
              />
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}

export function TileGridWidthLeftFull(props) {
  return (
    <div
      className={`${theme[props.style]} ${style.tile_left_full}`}
      style={{ height: props.height }}
    >
      <Link href={props.link}>
        <a>
          <div className={style.tile_left_side}>
            <div className={style.tile_bg}>
              <Image
                priority={true}
                alt={props.title}
                src={props.bg}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className={style.left}>
              <TitleText
                title={props.title}
                text={props.text}
                theme={props.style}
                en={props.en}
              />
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
export class TileGridWidthButtons extends Component {
  firstImage = this.props.firstImage;
  secondImage = this.props.secondImage;
  constructor(props) {
    super(props);
    this.state = {
      image: this.firstImage,
      buttonOne: style.buttonActive,
      buttonTwo: style.buttonInactive,
    };
    this.onSwapImage = this.onSwapImage.bind(this);
  }
  onSwapImage() {
    if (this.state.image == this.firstImage) {
      this.setState({
        image: this.secondImage,
        buttonOne: style.buttonInactive,
        buttonTwo: style.buttonActive,
      });
    } else {
      this.setState({
        image: this.firstImage,
        buttonOne: style.buttonActive,
        buttonTwo: style.buttonInactive,
      });
    }
  }
  render() {
    return (
      <div
        className={`${style.tile} ${theme[this.props.style]}`}
        style={{
          height: this.props.height,
        }}
      >
        <Link href={this.props.link}>
          <a>
            <div className={style.tile_bg} style={{ backgroundColor: this.props.bgColor }}>
              <Image
                alt={this.props.title}
                src={this.state.image}
                layout="fill"
                objectFit="contain"
                objectPosition="50% 50%"
                priority={true}
              />
            </div>
            <div className={style.text}>
              <TitleText
                title={this.props.title}
                text={this.props.text}
                theme={this.props.style}
                en={this.props.en}
              />
            </div>
          </a>
        </Link>
        <div className={style.buttons_out}>
          <div className={style.buttons} onClick={this.onSwapImage}>
            <div className={this.state.buttonOne}>
              {this.props.textFirstButton}
            </div>
            <div className={this.state.buttonTwo}>
              {this.props.textSecondButton}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
