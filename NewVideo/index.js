import Image from "next/image";
import { useState } from "react";
import { useGAEvents } from "../../context/GAEventsProvider";
import style from "./style.module.scss";

export default function NewVideo(props) {
  const [isFrameOpen, changeFrameView] = useState(
    props.withoutPreview ? true : false
  );

  const GAEvents = useGAEvents();

  let additional_scripts = props.additional_scripts || "";

  let autoplayScript;

  if (props.autoplay) {
    if (props.additional_scripts) {
      autoplayScript = "&autoplay=1";
    }
    autoplayScript = "?autoplay=1";
  } else if (props.autoplay === undefined) {
    autoplayScript = "?autoplay=1";
  } else if (!autoplayScript) {
    autoplayScript = "";
  }

  let linkSource =
    "https://www.youtube.com/embed/" +
    props.link +
    additional_scripts +
    autoplayScript;

  function onFrameViewChange() {
    changeFrameView(!isFrameOpen);
    GAEvents.buttonClick(`video ${linkSource} open`);
  }

  return (
    <div className={style.video}>
      {isFrameOpen ? (
        <iframe
          className={style.video__frame}
          src={linkSource}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className={style.video__preview}>
          <Image
            className={style.video__image}
            src={
              props.image || props.defaultPreview
                ? "/video-previews/5.jpg"
                : `https://i.ytimg.com/vi/${props.link}/maxresdefault.jpg`
            }
            width={1920}
            height={1080}
            layout="responsive"
            alt="video preview"
          />
          <div
            onClick={onFrameViewChange}
            className={style.video__button}
            aria-label="Start video"
          >
            {props.videoIconLP ? videoIconLP : videoIcon}
          </div>
        </div>
      )}
    </div>
  );
}

const videoIcon = (
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
);
const videoIconLP = (
  <svg width="118" height="118" viewBox="0 0 118 118" fill="none">
    <circle
      cx="59.1229"
      cy="59.3888"
      r="58.0548"
      stroke="white"
      className={style.video_icon_lp__circle}
    />
    <path
      d="M71.5814 59.3889L52.8937 70.1782L52.8937 48.5995L71.5814 59.3889Z"
      fill="white"
      className={style.video_icon_lp__triangle}
    />
  </svg>
);
