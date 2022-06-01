import { FooterButtons } from "../FooterButtons/FooterButtons";
import style from "./style.module.scss";
import Image from "next/image"
export function SeoTitleText(props) {
  return (
    <div className={style.title_text}>
      <h2 className={style.title}>{props.title}</h2>
      <div className={style.text}>{props.text}</div>
    </div>
  );
}
export function SeoImg(props) {
  return (
    <div className={style.img}>
      <Image
        src={props.image}
        layout="responsive"
        width={1170}
        height={400}
        objectFit="contain"
      />
    </div>
  );
}
export function SeoTitleTable(props) {
  return (
    <div className={style.title_table}>
      <h2 className={style.title}>{props.title}</h2>
      <table className={style.table}>{props.table}</table>
    </div>
  );
}
export function SeoCTA(props) {
  return (
    <div className={style.cta}>
      <FooterButtons
        en={props.en}
        call={props.call}
        catalog={props.catalog}
        theme={props.theme}
        logoName={props.logoName}
        textTop={props.textTop}
        textBottom={props.textBottom}
        buttonText={props.buttonText}
      />
    </div>
  );
}
