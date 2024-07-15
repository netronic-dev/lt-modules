import { useRef } from "react";
import style from "./style.module.scss";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";

const JoinOurSection = ({ textSpan, text }) => {
  const divRef = useRef(null);

  useIntersectionObserver([divRef], { threshold: 0.1 }, style.appear);

  return (
    <section className={style.joinOurContainer}>
      <div ref={divRef} className={style.joinOur__insideBox}>
        <p className={style.joinOur__text}>
          <span className={style.joinOur__textSpan}>{textSpan}</span> {text}
        </p>
      </div>
    </section>
  );
};

export default JoinOurSection;
