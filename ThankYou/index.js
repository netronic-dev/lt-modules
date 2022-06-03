import Link from "next/link";
import style from "./style.module.scss";
import Image from "next/image"
import { useEffect } from "react";
import FooterSocial from "../Footer/FooterSocial/FooterSocial";

export function ThankYou(props) {
  useEffect(() => {
    window.scroll({ top: 0 });
  }, [])
  return (
    <div className={style.page}>
      <div className={style.thank_you_out}>
        <div className={style.thank_you}>
          <h2 className={style.title}>
            {props.title ? props.title : (<> Спасибо,
              <br /> ваша заявка принята!</>)}
          </h2>
          <p className={style.text}>{props.text}</p>
        </div>
        {props.image ?
          <EventBanner
            link={props.link}
            image={props.image}
            objectFit={props.objectFit}
            objectPosition={props.objectPosition}
            imageResponsive={props.imageResponsive}
            objectFitResponsive={props.objectFitResponsive}
            objectPositionResponsive={props.objectPositionResponsive}
          />
          : ""}
        <Link href="/">
          <a>
            <button className={style.button}>{props.buttonText ? props.buttonText : "Вернуться на главную"}</button>
          </a>
        </Link>
      </div>
    </div>
  );
}

export function ThankYouLP(props) {

  useEffect(() => {
    window.scroll({ top: 0 });
    window.jivo_destroy ? window.jivo_destroy() : null
  }, [])

  return (
    <div className={style.page}>
      <div className={style.thank_you_out}>
        <div className={style.thank_you}>
          <h2 className={style.title}>
            Спасибо, ваш запрос принят!
          </h2>
          <p className={style.text}>{props.text}</p>
        </div>
        {props.image ?
          <EventBanner
            link={props.link}
            image={props.image}
            objectFit={props.objectFit}
            objectPosition={props.objectPosition}
            imageResponsive={props.imageResponsive}
            objectFitResponsive={props.objectFitResponsive}
            objectPositionResponsive={props.objectPositionResponsive}
          />
          : ""}
        <Link href="/">
          <a>
            <button className={style.button}>
              Перейти на полный сайт FORPOST
            </button>
          </a>
        </Link>
      </div>
      <FooterSocial lp={true} />
    </div>
  );
}

function EventBanner(props) {
  return (
    <div
      className={`
      ${style.event_banner}
      ${props.imageResponsive ? style.responsive_images : ""}
      `}
    >
      <Link href={props.link}>
        <a>
          <div className={style.image}>
            <Image
              quality={90}
              src={props.image}
              layout="fill"
              objectFit={props.objectFit}
              objectPosition={props.objectPosition}
            />
          </div>
          {props.imageResponsive ?
            <div className={style.image_responsive}>
              <Image
                quality={90}
                src={props.imageResponsive}
                layout="fill"
                objectFit={props.objectFitResponsive}
                objectPosition={props.objectPositionResponsive}
              />
            </div>
            : ""}
        </a>
      </Link>
    </div>
  )
}