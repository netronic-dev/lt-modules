import { useRef } from "react";
import Image from "next/image";
import style from "./style.module.scss";
import heroLogo from "/public/images/newLTO/lto-logo.webp";
import heroBgImage from "/public/images/newLTO/heroImg.webp";
import heroNightBg from "/public/images/newLTO/galaxy-night.webp";
import ChangeLanguage from "../ChangeLanguage/index";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";

const HeroSection = ({ title, titleSpan, subtitle, text, textSpan }) => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const textRef = useRef(null);

  useIntersectionObserver(
    [titleRef, subtitleRef, textRef],
    { threshold: 0.1 },
    style.appear
  );

  return (
    <section className={style.hero} style={{ backgroundImage: `url(${heroNightBg.src})` }}>
      <div className={style.hero__insideBox}>
        <div className={style.hero__changeLanguageBox}>
          <ChangeLanguage />
        </div>
        <div className={style.hero__bgImage}>
          <Image
            layout="fill"
            objectFit="cover"
            src={heroBgImage}
            alt="Hero-bg"
          />
        </div>

        <div className={style.hero__imageBox}>
          <Image src={heroLogo} alt="Hero-logo" width={113} height={113} />
        </div>
        <h1 ref={titleRef} className={style.hero__title}>
          {title} <br />{" "}
          <span className={style.hero__title__span}>{titleSpan}</span>
        </h1>
        <h2 ref={subtitleRef} className={style.hero__subtitle}>
          {subtitle}
        </h2>
        <p ref={textRef} className={style.hero__text}>
          {text} <span className={style.hero__text__span}>{textSpan}</span>
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
