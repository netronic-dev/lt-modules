import Image from "next/image"
import style from "./style.module.scss"
import Link from "next/link"

export default function Section(props) {
  return (
    <section className={style.video_block}>
      <div className={style.video_block__in}>
        {props.video ?
          <div
            className={`
              ${style.video}
              ${props.imageResponsive ? style.video_responsive_img : ""}
              `}
            onClick={props.onClick}
          >
            <h2 className={style.title}>
              {props.title}
            </h2>
            <div className={style.play_icon}>
              {playIcon}
            </div>
            {props.image ?
              <div className={style.image}>
                <Image
                  src={props.image}
                  layout="fill"
                  objectFit="cover"
                  objectPosition={props.objectPosition}
                />
              </div> : ""}
            {props.imageResponsive ?
              <div className={style.image_responsive}>
                <Image
                  src={props.imageResponsive}
                  layout="fill"
                  objectFit="cover"
                  objectPosition={props.objectPositionResponsive}
                />
              </div>
              : ""}
          </div> : ""}
        <div className={style.info}>
          {props.logo ?
            <div className={style.logo}>
              <Image
                src={props.logo}
                layout="fill"
                objectFit="contain"
              />
            </div>
            : ""}
          <p className={style.text}>
            {props.text}
          </p>
          <Link href={`#form`}>
            <a>
              <button className={style.button}>
                {props.buttonText}
              </button>
            </a>
          </Link>
        </div>
      </div>
    </section>
  )
}

const playIcon = (
  <svg width="220" height="219" viewBox="0 0 220 219" fill="none" >
    <circle cx="110" cy="109.557" r="108.502" stroke="white" />
    <path d="M133.192 109.557L98.404 129.642L98.404 89.4722L133.192 109.557Z" fill="white" />
  </svg>

)