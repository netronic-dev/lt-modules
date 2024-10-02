import Image from "next/image";
import { useRouter } from "next/router";
import style from "./styleNew.module.scss";

const Banner = (props) => {
  const router = useRouter();

  return (
    <div className={`${style.banner} fade-down-animation`}>
      <div className={style.container}>
        <div className={style.event_logo}>
          <Image
            src={props.eventLogo}
            layout="fill"
            objectFit="contain"
            alt="laser tag convetion"
          />
        </div>
        <p className={style.title}>{props.title}</p>
        <div className={style.block_text}>
          <p className={style.text}>{props.text}</p>
          <ul className={style.cell_list}>
            {props.eventData.map((item, index) => (
              <li key={index} className={style.cell_item}>
                <div className={style.icon_cell}>
                  <div className={style.icon_block}>
                    <Image src={item.icon} alt="icon" width={24} height={24} />
                  </div>
                  <h2 className={style.icon_text}>{item.iconText}</h2>
                </div>
                <h3 className={style.cell_subtitle}>{item.subtitle}</h3>
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              router.push(props.buttonLink);
            }}
            className={style.button_text}
          >
            {props.buttonText}
          </button>
        </div>
        <button
          className={style.button_close}
          onClick={() => props.toggleActivity()}
          aria-label="close button"
        >
          {closeBtn}
        </button>
      </div>
    </div>
  );
};

export default Banner;

const closeBtn = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
  >
    <circle cx="20" cy="20" r="20" fill="#0090FF" />
    <path
      d="M26 14L15 25"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 14L26 25"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
