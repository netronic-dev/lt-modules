import { useRef } from "react";
import Image from "next/image";
import style from "./style.module.scss";
import joinImgOne from "/public/images/newLTO/join-img-one.webp";
import joinImgTwo from "/public/images/newLTO/join-img-two.webp";
import joinImgThree from "/public/images/newLTO/join-img-three.webp";
import joinImgFour from "/public/images/newLTO/join-img-four.webp";
import stepOneScreen from "/public/images/newLTO/stepOneScreen.webp";
import googlePlayBtn from "/public/images/newLTO/googlePlayBtn.png";
import joinAlertImg from "/public/images/newLTO/joinAlertImg.png";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";
import ellipseRightBg from "/public/images/newLTO/join-ellipseRight.webp";
import ellipseLeftBg from "/public/images/newLTO/join-ellipseLeft.webp";

const JoinOurSection = ({
  title,
  titleSpan,
  textInfo,
  text,
  textVerification,
  textLink,
  textScrollStart,
  textScrollEnd,
  textScrollSpan,
  textClick,
  textClickSpan,
  textUpdate,
  textUpdateSpan,
}) => {
  const titleRef = useRef(null);
  const textInfoRef = useRef(null);
  const textRef = useRef(null);
  const stepOneBoxRef = useRef(null);
  const stepTwoBoxRef = useRef(null);
  const stepThreeBoxRef = useRef(null);
  const stepFourBoxRef = useRef(null);

  useIntersectionObserver(
    [titleRef, textInfoRef, textRef],
    { threshold: 0.1 },
    style.appear
  );

  useIntersectionObserver(
    [stepOneBoxRef, stepTwoBoxRef, stepThreeBoxRef, stepFourBoxRef],
    { threshold: 0.1 },
    style.appear,
    3000
  );

  return (
    <section className={style.joinOurContainer}>
      <div className={style.joinOurContainer__ellRightBg}>
        <Image
          src={ellipseRightBg}
          alt="joinEllRight"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={style.joinOurContainer__ellLeftBg}>
        <Image
          src={ellipseLeftBg}
          alt="joinEllLeft"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={style.joinOur__insideBox}>
        <h1 ref={titleRef} className={style.joinOur__title}>
          {title}{" "}
          <span className={style.joinOur__title__span}>{titleSpan}</span>
        </h1>
        <p ref={textInfoRef} className={style.joinOur__textInfo}>
          {textInfo}
        </p>
        <p ref={textRef} className={style.joinOur__text}>
          {text}
        </p>
        <div className={style.joinOur__stepsBox}>
          <div ref={stepOneBoxRef} className={style.joinOur__stepOneBox}>
            <div className={style.joinOur__joinImgOne}>
              <Image
                src={joinImgOne}
                alt="Join-img-one"
                width={191}
                height={261}
              />
            </div>
            <div className={style.joinOur__stepOneOverlay}>
              <p className={style.joinOur__stepsBox__number}>01</p>
              <a
                href="https://play.google.com/store/apps/details?id=net.lasertag.operator&hl=ru&gl=US&pli=1"
                target="_blank"
                rel="noopener noreferrer"
                className={style.joinOur__stepOneLink}
              >
                {textLink}
              </a>
            </div>
            <Image
              src={stepOneScreen}
              style={{ zIndex: 2 }}
              alt="Screen of app"
            />
            <a
              href="https://play.google.com/apps/testing/com.lasertag.tvout"
              target="_blank"
              rel="noopener noreferrer"
              className={style.googlePlayBtn}
            >
              <Image
                src={googlePlayBtn}
                alt="Google play button"
                layout="fill"
                objectFit="contain"
              />
            </a>
          </div>
          <div ref={stepTwoBoxRef} className={style.joinOur__stepTwoBox}>
            <div className={style.joinOur__joinImgTwo}>
              <Image
                width={160}
                height={261}
                src={joinImgTwo}
                alt="Join-img-two"
              />
              <div className={style.joinOur__stepTwo__textOverlay}></div>
            </div>
            <p className={style.joinOur__stepsBox__number}>02</p>
            <p className={style.joinOur__stepTwo__scrollText}>
              {textScrollStart}
              <span className={style.joinOur__stepTwo__scrollTextSpan}>
                {" "}
                {textScrollSpan}
              </span>
              <br />
              {textScrollEnd}
            </p>
          </div>
          <div ref={stepThreeBoxRef} className={style.joinOur__stepThreeBox}>
            <div className={style.joinOur__joinImgThree}>
              <Image
                width={181}
                height={271}
                src={joinImgThree}
                alt="Join-img-three"
              />
            </div>
            <div className={style.joinOur__joinClickBox}>
              <p className={style.joinOur__stepsBox__number}>03</p>
              <p className={style.joinOur__stepThree__scrollText}>
                {textClick}
                <span className={style.joinOur__stepTwo__scrollTextSpan}>
                  {" "}
                  <br />
                  {textClickSpan}
                </span>
              </p>
            </div>
            <Image
              src={joinAlertImg}
              className={style.joinAlertImg}
              alt="Join-alert-img"
              width={157}
              height={81}
            />
          </div>
          <div ref={stepFourBoxRef} className={style.joinOur__stepFourBox}>
            <div className={style.joinOur__joinImgFour}>
              <Image
                width={205}
                height={261}
                src={joinImgFour}
                alt="Join-img-four"
              />
            </div>
            <p className={style.joinOur__stepsBox__number}>04</p>
            <p className={style.joinOur__stepTwo__updateText}>
              {textUpdate}
              <span className={style.joinOur__stepTwo__updateTextSpan}>
                {" "}
                {textUpdateSpan}
              </span>
            </p>
          </div>
        </div>
        <p className={style.joinOur__textVerification}>{textVerification}</p>
      </div>
    </section>
  );
};

export default JoinOurSection;
