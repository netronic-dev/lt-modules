import Image from "next/image";
import { useRef } from "react";
import style from "./style.module.scss";
import heroLogo from "/public/images/newLTO/lto-logo.webp";
import tvOutLogo from "/public/images/newLTO/tv-out-logo.webp";
import mobileImg from "/public/images/newLTO/tv-out-mobileImg.png";
import tvOutImg from "/public/images/newLTO/tv-outImg.webp";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";
import tvOutEll from "/public/images/newLTO/tv-outEllipse.webp";

const FutureSection = ({ title, titleSpan, text }) => {
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const boxLogos = useRef(null);
  const boxImages = useRef(null);

  useIntersectionObserver(
    [titleRef, textRef, boxLogos, boxImages],
    { threshold: 0.1 },
    style.appear
  );

  return (
    <section className={style.futureContainer}>
      <h2 ref={titleRef} className={style.futureContainer__title}>
        {title}{" "}
        <span className={style.futureContainer__title__span}>{titleSpan}</span>
      </h2>
      <p ref={textRef} className={style.futureContainer__text}>
        {text}
      </p>
      <div ref={boxLogos} className={style.futureContainer__iconsBox}>
        <a
          className={style.futureContainer__iconsBox__iconRight}
          href="https://play.google.com/store/apps/details?id=net.lasertag.operator"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={heroLogo}
            alt="hero-logo-icon"
            layout="fill"
            objectFit="contain"
          />
        </a>
        <a
          className={style.futureContainer__iconsBox__iconLeft}
          href="https://play.google.com/apps/testing/com.lasertag.tvout"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={tvOutLogo}
            alt="Tv-out-icon"
            layout="fill"
            objectFit="contain"
          />
        </a>
      </div>
      <div ref={boxImages} className={style.futureContainer__imagesBox}>
        <div className={style.futureContainer__imagesBox__imageRight}>
          <Image
            src={tvOutImg}
            alt="Tv-out-img"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className={style.futureContainer__imagesBox__imageLeft}>
          <Image
            src={mobileImg}
            alt="Mobile-img"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </section>
  );
};

export default FutureSection;
