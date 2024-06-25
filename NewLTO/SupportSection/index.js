import { useRef } from "react";
import style from "./style.module.scss";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";

const SupportSection = ({ title, subtitle, linkText, text }) => {
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useIntersectionObserver(
    [titleRef, textRef],
    { threshold: 0.1 },
    style.appear
  );

  return (
    <section className={style.supportContainer}>
      <div className={style.supportContainer__insideBox}>
        <h2 ref={titleRef} className={style.supportContainer__title}>
          {title}
        </h2>
        <p ref={textRef} className={style.supportContainer__subtitle}>
          {subtitle}{" "}
          <a
            className={style.supportContainer__link}
            target="_blank"
            rel="noreferrer"
            href="https://lasertag.net/download/How%20to%20join%20open%20beta%20test%20of%20new%20LTO_ENG.pdf"
          >
            {linkText}
          </a>
          <span>
            {" "}
            <br /> {text}
          </span>
        </p>
      </div>
    </section>
  );
};
export default SupportSection;
