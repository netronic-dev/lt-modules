import Image from "next/image";
import classNames from "classnames";
import style from "./style.module.scss";
import Link from "next/link";
import gatewayImgOne from "../../../../public/blog/iaapa-2024-orlando/GatewayImgOne.webp";
import gatewayImgTwo from "../../../../public/blog/iaapa-2024-orlando/GatewayImgTwo.webp";
import gatewayImgThree from "../../../../public/blog/iaapa-2024-orlando/GatewayImgThree.webp";

const Page = (props) => {
  return (
    <section className={style.main}>
      <h2 className={style.title}>
        {props.title} <span className={style.titleSpan}>{props.titleSpan}</span>
      </h2>
      <p className={style.text}>
        {props.upperText}{" "}
        <span className={style.upperTextSpan}>{props.upperTextSpan}</span>
      </p>
      <div className={style.event_logo}>
        <Image
          src={props.eventLogo}
          layout="fill"
          objectFit="contain"
          alt="laser tag convetion"
        />
      </div>
      <div className={style.gatewayImgOne}>
        <Image
          src={gatewayImgOne}
          layout="fill"
          objectFit="contain"
          alt="gatewayImgOne"
        />
      </div>
      <p className={classNames(style.second_text, style.second_text_center)}>
        <span className={style.second_text_span}>{props.second_text_span}</span>{" "}
        {props.second_text}
      </p>
      <div className={style.gatewayImgTwo}>
        <Image
          src={gatewayImgTwo}
          layout="fill"
          objectFit="contain"
          alt="gatewayImgTwo"
        />
      </div>
      <div className={style.third_text_box}>
        <p className={style.second_text}>
          <span className={style.second_text_span}>
            {props.third_text_span}
          </span>
          {props.third_text}
        </p>
      </div>
      <div className={style.gatewayImgThree}>
        <Image
          src={gatewayImgThree}
          layout="fill"
          objectFit="contain"
          alt="gatewayImgThree"
        />
      </div>

      <div className={style.register_block}>
        <div className={style.offer_box}>
          <h3 className={style.offer_title}>{props.offer_title}</h3>
          <p className={style.offer_text}>{props.offer_text}</p>
        </div>
        <Link
          href={props.link || "/iaapa-expo-europe-2024/#register"}
          scroll={false}
        >
          <a className={style.register_button}>{props.btn_text}</a>
        </Link>
        {props.event_info_img && (
          <div className={style.event_info_img}>
            <Image
              src={props.event_info_img}
              layout="fill"
              objectFit="cover"
              alt="event_info_img"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
