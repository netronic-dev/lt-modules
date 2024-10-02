import { FooterButtons } from "../FooterButtons";
import style from "./style.module.scss";
import Image from "next/image";
import { InView } from "react-intersection-observer";
import { useGAEvents } from "../../context/GAEventsProvider";

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
        <h2 className={style.title}>{props.title}</h2>
        <div className={style.text}>
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
        <h2 className={style.title}>{props.title}</h2>
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
        />
      </div>
    </InView>
  );
}
