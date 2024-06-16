import Image from "next/image";
import { useRef } from "react";
import style from "./style.module.scss";
import feedbackImg from "/public/images/newLTO/feedbackImg.webp";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";

const FeedbackSection = ({
  feedbackTitle,
  feedbackTitleSpan,
  feedbackTextTop,
  feedbackTextBottom,
  feedbackTextLink,
}) => {
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useIntersectionObserver(
    [titleRef, textRef, imageRef],
    { threshold: 0.1 },
    style.appear
  );

  return (
    <section className={style.feedbackContainer}>
      <div className={style.feedbackContainer__insideBox}>
        <div className={style.feedbackContainer__leftBox}>
          <h2
            ref={titleRef}
            className={style.feedbackContainer__leftBox__title}
          >
            {feedbackTitle}{" "}
            <span className={style.feedbackContainer__leftBox__titleSpan}>
              {feedbackTitleSpan}
            </span>
          </h2>
          <div ref={textRef} className={style.feedbackContainer__textBox}>
            <p className={style.feedbackContainer__text}>{feedbackTextTop}</p>
            <p className={style.feedbackContainer__text}>
              {feedbackTextBottom}
            </p>
          </div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/forms/d/e/1FAIpQLSfHUyQGOzf5MH48T6n66xMU87ybeKh3CcKq7CssFPRucQpI0A/viewform?pli=1"
            className={style.feedbackContainer__consultationLink}
          >
            {feedbackTextLink}
          </a>
        </div>
        <div ref={imageRef} className={style.feedbackContainer__imageBox}>
          <Image
            src={feedbackImg}
            alt="Feedback-img"
            width={500}
            height={400}
          />
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
