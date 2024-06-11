import style from "./style.module.scss";
import Image from "next/image";
import joinImgOne from "/public/images/newLTO/join-img-one.webp";
import joinImgTwo from "/public/images/newLTO/join-img-two.webp";
import joinImgThree from "/public/images/newLTO/join-img-three.webp";
import joinImgFour from "/public/images/newLTO/join-img-four.webp";
import stepOneScreen from "/public/images/newLTO/stepOneScreen.webp";
import googlePlayBtn from "/public/images/newLTO/googlePlayBtn.webp";
import joinAlertImg from "/public/images/newLTO/joinAlertImg.webp";
import Link from "next/link";

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
}) => {
  return (
    <section className={style.joinOur}>
      <div className={style.joinOur__box}>
        <h1 className={style.joinOur__title}>
          {title}{" "}
          <span className={style.joinOur__title__span}>{titleSpan}</span>
        </h1>
        <p className={style.joinOur__textInfo}>{textInfo}</p>
        <p className={style.joinOur__text}>{text}</p>
        <div className={style.joinOur__stepsBox}>
          <div className={style.joinOur__stepOneBox}>
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
              <a href="/newLTO/joinUs" className={style.joinOur__stepOneLink}>
                {textLink}
              </a>
            </div>
            <Image
              src={stepOneScreen}
              style={{ zIndex: 2 }}
              alt="Screen of app"
            />
            <button className={style.googlePlayBtn}>
              <Image
                src={googlePlayBtn}
                style={{ zIndex: 2 }}
                alt="Google play button"
              />
            </button>
          </div>
          <div className={style.joinOur__stepTwoBox}>
            <div className={style.joinOur__joinImgTwo}>
              <Image
                width={201}
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
          <div className={style.joinOur__stepThreeBox}>
            <div className={style.joinOur__joinImgThree}>
            <Image
              width={181}
              height={261}
              src={joinImgThree}
              alt="Join-img-three"
            />
            </div>
            <p className={style.joinOur__stepsBox__number}>03</p>
            <Image
              src={joinAlertImg}
              className={style.joinAlertImg}
              alt="Join-alert-img"
              width={157}
              height={81}
            />
          </div>
          <div className={style.joinOur__stepFourBox}>
            <div className={style.joinOur__joinImgFour}>
              <Image
                width={201}
                height={261}
                src={joinImgFour}
                alt="Join-img-four"
              />
            </div>
            <p className={style.joinOur__stepsBox__number}>04</p>
          </div>
        </div>
        <p className={style.joinOur__textVerification}>{textVerification}</p>
      </div>
    </section>
  );
};

export default JoinOurSection;
