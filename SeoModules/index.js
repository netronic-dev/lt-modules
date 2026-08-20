import Image from "next/image";
import { InView } from "react-intersection-observer";
import { useGAEvents } from "../../context/GAEventsProvider";
import { FooterButtons } from "../FooterButtons";
import { Button } from "../../lt-modules/Buttons";
import style from "./style.module.scss";

export function SeoTitleText(props) {
  const GAEvents = useGAEvents();
  function sectionWasInView(sectionName) {
    GAEvents.sectionWasInView(sectionName);
  }
  return (
    <InView
      as="div"
      onChange={(inView, entry) =>
        inView && sectionWasInView(`Seo Module ${props.title || ""}`)
      }
    >
      <div className={style.title_text}>
        <div className={style.title_btn_box}>
          {props.title && <h2 className={style.title}>{props.title}</h2>}
          {props.buttonText && (
            <Button
              type={props.buttonType ? props.buttonType : "catalog"}
              style="blueWhite"
              text={props.buttonText ? props.buttonText : "Get full catalog"}
            />
          )}
        </div>
        <div
          className={`${style.text} ${!props.title ? style.rightColumn : ""}`}
          // className={style.text}
        >
          {props.text}
          {props.list}
        </div>
      </div>
    </InView>
  );
}

export function SeoImg(props) {
  const GAEvents = useGAEvents();
  function sectionWasInView(sectionName) {
    GAEvents.sectionWasInView(sectionName);
  }
  return (
    <InView
      as="div"
      onChange={(inView, entry) =>
        inView && sectionWasInView(`Seo Module Image ${props.image || ""}`)
      }
    >
      <div className={style.img}>
        <Image
          src={props.image}
          layout="responsive"
          width={1170}
          height={400}
          objectFit="contain"
          alt="image"
        />
      </div>
    </InView>
  );
}

export function SeoTitleTable(props) {
  const GAEvents = useGAEvents();
  function sectionWasInView(sectionName) {
    GAEvents.sectionWasInView(sectionName);
  }
  return (
    <InView
      as="div"
      onChange={(inView, entry) =>
        inView &&
        sectionWasInView(`Seo Module Title Table ${props.title || ""}`)
      }
    >
      <div className={style.title_table}>
        {props.title && <h2 className={style.title}>{props.title}</h2>}
        <table className={style.table}>{props.table}</table>
      </div>
    </InView>
  );
}

export function SeoCTA(props) {
  const GAEvents = useGAEvents();
  function sectionWasInView(sectionName) {
    GAEvents.sectionWasInView(sectionName);
  }
  return (
    <InView
      as="div"
      onChange={(inView, entry) =>
        inView && sectionWasInView(`Seo Module CTA ${props.buttonText || ""}`)
      }
    >
      <div className={style.cta} id="consultation">
        <FooterButtons
          theme={props.theme}
          logoName={props.logoName}
          textTop={props.textTop}
          textBottom={props.textBottom}
          buttonText={props.buttonText}
          type="catalog"
        />
      </div>
    </InView>
  );
}
