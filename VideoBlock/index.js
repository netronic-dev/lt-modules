import { Component } from "react";
import style from "./style.module.scss";

const theme = {
  short: style.video_short,
  full: style.video_full,
};
export default class VideoBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFrameOpen: false,
    };
    this.onFrameChange = this.onFrameChange.bind(this);
  }
  onFrameChange() {
    this.setState({
      isFrameOpen: !this.state.isFrameOpen,
    });
  }
  render() {
    return (
      <div
        className={theme[this.props.theme ? this.props.theme : "short"]}
        onClick={this.onFrameChange}
      >
        {this.state.isFrameOpen === false ? (
          <>
            <a
              href="#"
              className={style.video__link}
              aria-label="Maxresdefault"
            >
              <picture>
                <source
                  srcSet={
                    "https://i.ytimg.com/vi_webp/" +
                    this.props.videoLink +
                    "/maxresdefault.webp"
                  }
                  type="image/webp"
                />
                <img
                  className={style.video__media}
                  src={
                    "https://i.ytimg.com/vi/" +
                    this.props.videoLink +
                    "/maxresdefault.jpg"
                  }
                  alt="maxresdefault"
                />
              </picture>
            </a>
            <button
              className={style.video__button}
              aria-label="Запустить видео"
            >
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                <circle
                  className={style.video__button_shape}
                  cx="25"
                  cy="25"
                  r="25"
                  fill="#C4C4C4"
                  fillOpacity="0.8"
                />
                <path
                  className={style.video__button_icon}
                  d="M21 18V32L32 25L21 18Z"
                  fill="white"
                />
              </svg>
            </button>
          </>
        ) : (
          <iframe
            className={style.video__frame}
            src={
              "https://www.youtube.com/embed/" +
              this.props.videoLink +
              "?autoplay=1"
            }
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    );
  }
}
