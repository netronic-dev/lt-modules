import AnchorLink from "react-anchor-link-smooth-scroll";
import style from "./style.module.scss";
import Image from "next/image";
import RunningText from "./RunningText";

const parentStyles = {
  position: "absolute",
  top: "80px",
  right: "-100px",
  transform: "rotate(25deg)",
};

const Main = (props) => {
  return (
    <section className={style.main}>
      <div className={style.main_inner}>
        <div className={style.content}>
          {props.lang === "de" ? (
            <>
              <h1 className={style.title}>{props.title}</h1>
              <p className={style.before_title_text}>
                {props.before_title_text}
              </p>
            </>
          ) : (
            <>
              <p className={style.before_title_text}>
                {props.before_title_text}
              </p>
              <h1 className={style.title}>{props.title}</h1>
            </>
          )}
          <p className={style.sub_title}>{props.sub_title}</p>
          <p className={style.text}>{props.text}</p>
          {props.event_text ? (
            <div className={style.event_block}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_45_87)">
                  <path
                    d="M7 11H9V13H7V11ZM21 6V20C21 21.1 20.1 22 19 22H5C3.89 22 3 21.1 3 20L3.01 6C3.01 4.9 3.89 4 5 4H6V2H8V4H16V2H18V4H19C20.1 4 21 4.9 21 6ZM5 8H19V6H5V8ZM19 20V10H5V20H19ZM15 13H17V11H15V13ZM11 13H13V11H11V13Z"
                    fill="#0090FF"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_45_87">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <span className={style.event_text}>{props.event_text}</span>
            </div>
          ) : null}
          <AnchorLink href="#set" offset="80">
            <button className={style.button}>{props.buttonText}</button>
          </AnchorLink>
        </div>
      </div>
      <div className={style.image_blur_top}>
        <Image
          src={props.image_blur_top}
          layout="fill"
          objectFit="contain"
          objectPosition="50% 50%"
          priority={true}
          quality={100}
          alt="image"
        />
      </div>
      <div className={style.bottom_blur}>
        <Image
          src={props.bottom_blur}
          layout="fill"
          objectFit="cover"
          objectPosition="50% 50%"
          priority={true}
          quality={100}
          alt="image"
        />
      </div>
      <div className={style.image_heroes_bg}>
        <Image
          src={props.image_heroes_bg}
          layout="fill"
          objectFit="contain"
          objectPosition="50% 50%"
          priority={true}
          quality={100}
          alt="image"
        />
      </div>
      <div className={style.image_heroes_bg_lap}>
        <Image
          src={props.image_heroes_bg_lap}
          layout="fill"
          objectFit="contain"
          objectPosition="50% 50%"
          priority={true}
          quality={100}
          alt="image"
        />
      </div>
      <div className={style.image_heroes_bg_mob}>
        <Image
          src={props.image_heroes_bg_mob}
          layout="fill"
          objectFit="contain"
          objectPosition="50% 50%"
          priority={true}
          quality={100}
          alt="image"
        />
      </div>
      <div className={style.image_right_flowers}>
        <Image
          src={props.right_flowers}
          layout="fill"
          objectFit="contain"
          objectPosition="50% 50%"
          priority={true}
          quality={100}
          alt="image"
        />
      </div>
      <div className={style.flowers_mob}>
        <Image
          src={props.flowers_mob}
          layout="fill"
          objectFit="contain"
          objectPosition="50% 50%"
          priority={true}
          quality={100}
          alt="image"
        />
      </div>
      <div className={style.image_left_flowers}>
        <Image
          src={props.left_flowers}
          layout="fill"
          objectFit="contain"
          objectPosition="50% 50%"
          priority={true}
          quality={100}
          alt="image"
        />
      </div>
      <RunningText styles={parentStyles} />
    </section>
  );
};

export default Main;
