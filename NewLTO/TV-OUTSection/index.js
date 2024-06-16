import Image from "next/image";
import { useEffect, useRef } from "react";
import style from "./style.module.scss";
import tvOutLogo from "/public/images/newLTO/tv-out-logo.webp";
import googlePlayBtn from "/public/images/newLTO/googlePlayBtn.webp";
import Icon from "../../../components/Icon/Icon";
import tvOutImg from "/public/images/newLTO/tv-outImg.webp";
import tvOutEll from "/public/images/newLTO/tv-outEllipse.webp";

const TV_OUTSection = ({ subtitle, subtext, googlePlayBtnText, longList }) => {
  const logoBoxRef = useRef(null);
  const listItemsRefs = useRef([]);

  useEffect(() => {
    const options = {
      threshold: 0.1,
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetIndex = parseInt(entry.target.dataset.index, 10);
          const delay = targetIndex * 100;

          setTimeout(() => {
            entry.target.classList.add(style.appear);
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (logoBoxRef.current) observer.observe(logoBoxRef.current);
    listItemsRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className={style.TV_OUTContainer}>
      <div className={style.TV_OUTContainer__ellBg}>
        <Image src={tvOutEll} alt="tvOutEll" layout="fill" objectFit="cover" />
      </div>
      <div className={style.TV_OUTContainer__insideBox}>
        <div ref={logoBoxRef} className={style.TV_OUTContainer__topBox}>
          <div className={style.hero__image}>
            <Image src={tvOutLogo} alt="Tv-out-logo" width={201} height={113} />
          </div>
          <div className={style.TV_OUTContainer__topBox__insideBox}>
            <h3 className={style.TV_OUTContainer__topBox__insideBox__title}>
              {subtitle}
            </h3>
            <p className={style.TV_OUTContainer__topBox__insideBox__text}>
              {subtext}
            </p>
          </div>
          <div className={style.TV_OUTContainer__googlePlayBtnBox}>
            <p className={style.TV_OUTContainer__googlePlayBtnBox__text}>
              {googlePlayBtnText}
            </p>

            <a
              href="https://play.google.com/apps/testing/com.lasertag.tvout"
              target="_blank"
              rel="noopener noreferrer"
              className={style.googlePlayBtn}
            >
              <Image
                src={googlePlayBtn}
                alt="Google play button"
                width={228}
                height={67}
              />
            </a>
          </div>
        </div>
        <div className={style.TV_OUTContainer__topBox__image}>
          <Image
            src={tvOutImg}
            alt="tvOutImg"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <ul className={style.TV_OUTContainer__list}>
          {longList.map((item) => (
            <li
              data-index={item.id}
              ref={(el) => (listItemsRefs.current[item.id] = el)}
              key={item.id}
              className={style.TV_OUTContainer__list__item}
            >
              <div className={style.TV_OUTContainer__list__iconBox}>
                <Icon name={item.icon} width={24} height={24} />
              </div>
              <div className={style.TV_OUTContainer__list__textBox}>
                <h4 className={style.TV_OUTContainer__list__title}>
                  {item.title}
                </h4>
                <p className={style.TV_OUTContainer__list__text}>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className={style.TV_OUTContainer__googlePlayBtnBoxSecond}>
          <p className={style.TV_OUTContainer__googlePlayBtnBox__text}>
            {googlePlayBtnText}
          </p>
          <a
            href="https://play.google.com/apps/testing/com.lasertag.tvout"
            target="_blank"
            rel="noopener noreferrer"
            className={style.googlePlayBtn}
          >
            <Image
              src={googlePlayBtn}
              alt="Google play button"
              width={228}
              height={67}
            />
          </a>
        </div>
        <div className={style.TV_OUTContainer__topBox__imageDesktop}>
          <Image
            src={tvOutImg}
            alt="tvOutImg"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </section>
  );
};

export default TV_OUTSection;
