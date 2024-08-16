import Link from "next/link";
import style from "./style.module.scss";

const JoinUs = (props) => {
  return (
    <div
      className={`${style.join_us} ${
        props.margin ? style.join_us_with_margin_top : ""
      }`}
    >
      <div className={style.wrapper}>
        <div className={style.join_us_content}>
          <p className={style.join_us__text}>
            <span className={style.join_us__text_span}>
              {props.joinUsTextSpan}
            </span>{" "}
            {props.joinUsText}
          </p>
          <Link href={props.link} scroll={false}>
            <a className={style.register__button}>{props.button_text}</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
