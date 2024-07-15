import Image from "next/image";
import { useEffect, useRef } from "react";
import style from "./style.module.scss";
import heroLogo from "/public/images/newLTO/lto-logo.webp";
import Icon from "../../../components/Icon/Icon";
import tvOutEll from "/public/images/newLTO/tv-outEllipse.webp";
import googlePlayBtn from "/public/images/newLTO/googlePlayBtn.png";

const FeaturesSection = ({
  featuresTitle,
  subtitle,
  subtext,
  longList,
  shortList,
  googlePlayBtnText,
}) => {
  const titleRef = useRef(null);
  const textBoxRef = useRef(null);
  const listItemsRefs = useRef([]);
  const googleBtnBox = useRef(null);
  const googleBtnBoxSecond = useRef(null);

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

    if (titleRef.current) observer.observe(titleRef.current);
    if (googleBtnBox.current) observer.observe(googleBtnBox.current);
    if (googleBtnBoxSecond.current)
      observer.observe(googleBtnBoxSecond.current);
    if (textBoxRef.current) observer.observe(textBoxRef.current);
    listItemsRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className={style.featuresContainer}>
      <div className={style.featuresContainer__ellBg}>
        <Image src={tvOutEll} alt="tvOutEll" layout="fill" objectFit="cover" />
      </div>
      <h2 ref={titleRef} className={style.featuresContainer__title}>
        {featuresTitle}
      </h2>
      <div className={style.featuresContainer__listsBox}>
        <div>
          <div ref={textBoxRef} className={style.featuresContainer__topBox}>
            <a
              className={style.hero__image}
              href="https://play.google.com/store/apps/details?id=net.lasertag.operator"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={heroLogo} alt="Hero-logo" width={113} height={113} />
            </a>
            <div className={style.featuresContainer__topBox__insideBox}>
              <h3 className={style.featuresContainer__topBox__insideBox__title}>
                {subtitle}
              </h3>
              <p className={style.featuresContainer__topBox__insideBox__text}>
                {subtext}
              </p>
            </div>
          </div>
          <ul className={style.featuresContainer__list}>
            {longList.map((item) => (
              <li
                data-index={item.id}
                ref={(el) => (listItemsRefs.current[item.id] = el)}
                key={item.id}
                className={style.featuresContainer__list__item}
              >
                <div className={style.featuresContainer__list__iconBox}>
                  <Icon name={item.icon} width={24} height={24} />
                </div>
                <div className={style.featuresContainer__list__textBox}>
                  <h4 className={style.featuresContainer__list__title}>
                    {item.title}
                  </h4>
                  <p className={style.featuresContainer__list__text}>
                    {item.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div
            className={style.featuresContainer__googlePlayBtnBox}
            ref={googleBtnBox}
          >
            <p className={style.featuresContainer__googlePlayBtnBox__text}>
              {googlePlayBtnText}
            </p>

            <a
              href="https://play.google.com/store/apps/details?id=net.lasertag.operator"
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
          <ul className={style.featuresContainer__activeList}>
            {shortList.map((item) => (
              <li
                data-index={item.id}
                ref={(el) => (listItemsRefs.current[item.id] = el)}
                key={item.id}
                className={style.featuresContainer__activeList__item}
              >
                <div className={style.featuresContainer__list__iconBox}>
                  <Icon name={item.icon} width={24} height={24} />
                </div>
                <div className={style.featuresContainer__list__textBox}>
                  <h4 className={style.featuresContainer__list__title}>
                    {item.title}
                  </h4>
                  <p className={style.featuresContainer__list__text}>
                    {item.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div
            className={style.featuresContainer__googlePlayBtnBoxSecond}
            ref={googleBtnBoxSecond}
          >
            <p className={style.featuresContainer__googlePlayBtnBox__text}>
              {googlePlayBtnText}
            </p>
            <a
              href="https://play.google.com/store/apps/details?id=net.lasertag.operator"
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
      </div>
    </section>
  );
};

export default FeaturesSection;
