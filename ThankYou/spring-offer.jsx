import Link from "next/link";
import style from "./spring-offer.module.scss";
import Image from "next/image";
import { useEffect } from "react";
import FooterSocial from "../Footer/Social";

export function ThankYou(props) {
    useEffect(() => {
        window.scroll({ top: 0 });
    }, []);
    return (
        <section className={style.section}>
            <div className={style.thank_you}>
                <h2 className={style.title}>{props.title}</h2>
                <p className={style.sub_title}>{props.subTitle}</p>
                <p className={style.text}>{props.text}</p>
                <div className={style.button_outer}>
                    <Link href="/">
                        <a>
                            <button className={style.button}>
                                {props.buttonText}
                            </button>
                        </a>
                    </Link>
                </div>
            </div>
            <div className={style.bg_image}>
                <Image
                    src={props.bg_image}
                    alt=""
                    layout="fill"
                    quality={100}
                    objectFit="cover"
                />
            </div>
        </section>
    );
}

function EventBanner(props) {
    return (
        <Link href={props.link}>
            <a>
                <div className={style.event_banner}>
                    <div className={style.image}>
                        <Image
                            quality={90}
                            src={props.image}
                            layout="fill"
                            objectFit={props.objectFit}
                            objectPosition={props.objectPosition}
                        />
                    </div>
                    {props.imageResponsive && (
                        <div className={style.image_responsive}>
                            <Image
                                quality={90}
                                src={props.imageResponsive}
                                layout="fill"
                                objectFit={props.objectFitResponsive}
                                objectPosition={props.objectPositionResponsive}
                            />
                        </div>
                    )}
                </div>
            </a>
        </Link>
    );
}
