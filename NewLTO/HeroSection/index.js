import style from "./style.module.scss";
import Image from "next/image";
import heroLogo from "/public/images/newLTO/lto-logo.webp";
import heroBgImage from "/public/images/newLTO/heroImg.webp";

const HeroSection = ({ title, titleSpan, subtitle, text, textSpan }) => {
  return (
    <section className={style.hero}>
      <div className={style.hero__bgImage}>
        <Image
          layout="fill"
          objectFit="cover"
          src={heroBgImage}
          alt="Hero-bg"
        />
      </div>
      <Image
        src={heroLogo}
        className={style.hero__image}
        alt="Hero-logo"
        width={113}
        height={113}
      />
      <h1 className={style.hero__title}>
        {title} <br />{" "}
        <span className={style.hero__title__span}>{titleSpan}</span>
      </h1>
      <h2 className={style.hero__subtitle}>{subtitle}</h2>
      <p className={style.hero__text}>
        {text} <span className={style.hero__text__span}>{textSpan}</span>
      </p>
    </section>
  );
};

export default HeroSection;
