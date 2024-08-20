import Image from "next/image";
import style from "./style.module.scss";
import EventSlider from "../Slider";
import infoDecorationLineTablet from "../../../../public/blog/iaapa-expo-europe-2024/infoDecorationLineTablet.webp";
import infoDecorationLineDesktop from "../../../../public/blog/iaapa-expo-europe-2024/infoDecorationLineDesktop.webp";
import useIsTablet from "../../../../hooks/useIsTablet";
import useIsDesktop from "../../../../hooks/useIsDesktop";
import light_blue_figure from "../../../../public/blog/iaapa-expo-europe-2024/light_blue_figure.webp";

const Page = (props) => {
  const isTablet = useIsTablet({ width: 744 });
  const isDesktop = useIsDesktop({ width: 1024 });
  const isMaxDesktop = useIsDesktop({ width: 1927 });

  return (
    <section className={style.main}>
      {isDesktop && (
        <div className={style.light_blue_figure_left}>
          <Image
            src={light_blue_figure}
            layout="fill"
            objectFit="contain"
            alt="light_blue_figure"
          />
        </div>
      )}
      {isDesktop && (
        <div className={style.light_blue_figure_right}>
          <Image
            src={light_blue_figure}
            layout="fill"
            objectFit="contain"
            alt="light_blue_figure"
          />
        </div>
      )}
      {isTablet && (
        <div className={style.infoDecorationLineTablet}>
          <Image
            src={infoDecorationLineTablet}
            layout="fill"
            alt="infoDecorationLineTablet"
          />
        </div>
      )}
      {isDesktop && (
        <div className={style.infoDecorationLineDesktop}>
          <Image
            src={infoDecorationLineDesktop}
            layout="fill"
            alt="infoDecorationLineDesktop"
          />
        </div>
      )}
      <h2 className={style.title}>
        {props.title} <span className={style.titleSpan}>{props.titleSpan}</span>
      </h2>
      <ul className={style.event_info}>
        {props.data.map((item, index) => (
          <li className={style.info_row} key={index}>
            <div className={style.icon_cell}>
              {item.icon && (
                <div className={style.icon_block}>
                  <Image src={item.icon} alt="icon" width={24} height={24} />
                </div>
              )}
              <h2 className={style.icon_text}>{item.iconText}</h2>
            </div>
            <h3 className={style.cell_title}>
              {item.subtitle} {!isTablet && !isDesktop && <br />}
              <span
                className={`${
                  index !== 1 ? style.cell_text : style.cell_text_large
                }`}
              >
                {item.text}
              </span>
            </h3>
            {item.subtitleBottom && (
              <h3 className={style.cell_title}>
                {item.subtitleBottom} {!isTablet && !isDesktop && <br />}
                <span
                  className={`${
                    index !== 1 ? style.cell_text : style.cell_text_large
                  }`}
                >
                  {item.textBottom}
                </span>
              </h3>
            )}
          </li>
        ))}
      </ul>
      <EventSlider imagesData={props.imagesData} />
    </section>
  );
};

export default Page;
