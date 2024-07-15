import { useRef } from "react";
import style from "./style.module.scss";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";

const SupportSection = ({ title }) => {
  const titleRef = useRef(null);

  useIntersectionObserver(
    [titleRef],
    { threshold: 0.1 },
    style.appear
  );

  return (
    <section className={style.supportContainer}>
      <div className={style.supportContainer__insideBox}>
        <h2 ref={titleRef} className={style.supportContainer__title}>
          {title}
        </h2>
      </div>
    </section>
  );
};
export default SupportSection;
