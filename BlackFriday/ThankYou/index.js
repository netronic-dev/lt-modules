import Image from "next/image";
import style from "./style.module.scss";

export default function IAAPAThankYou(props) {
  return (
    <section className={style.section}>
      <div className={style.main}>
        {props.logo && (
          <div className={style.logo}>
            <Image
              src={props.logo}
              layout="responsive"
              width={1170}
              height={500}
              alt="Black Friday"
            />
          </div>
        )}
        <div className={style.main_in}>
          <h1 className={style.title}>{props.title}</h1>
          <p className={style.subtitle}>{props.subtitle}</p>
          {props.text && <p className={style.text}>{props.text}</p>}
        </div>
        {props.image && (
          <div className={style.image}>
            <Image
              src={props.image}
              layout="responsive"
              width={1170}
              height={500}
              alt="Black Friday"
            />
          </div>
        )}
      </div>
    </section>
  );
}
