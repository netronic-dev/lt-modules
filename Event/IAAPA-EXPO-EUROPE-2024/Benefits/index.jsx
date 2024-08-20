import Image from "next/image";
import classNames from "classnames";
import style from "./style.module.scss";
import useIsTablet from "../../../../hooks/useIsTablet";

const Benefits = (props) => {
  const isTablet = useIsTablet({ width: 744 });
  return (
    <section className={style.benefits}>
      <div className={style.container}>
          <div className={style.bg_logo}>
            <Image
              src={props.bg_logo}
              alt="background logo"
              layout="fill"
              objectFit="cover"
            />
          </div>
        <p className={style.subtitle}>{props.subtitle}</p>
        <ul className={style.benefits_list}>
          {props.dataTwo.map((item, index) => (
            <li key={index} className={style.benefits_item}>
              <Image
                src={item.bg}
                alt="Benefit bg"
                layout="fill"
                objectFit="contain"
              />
              <h2 className={style.benefits_title}>{item.title}</h2>
            </li>
          ))}
        </ul>
        <div className={style.benefits_grid}>
          <ul className={style.upper_row}>
            {props.data.map((item, index) => {
              const sizeClassName = style[`sizeImage_${item.id}`];
              return (
                <li className={style.grid_cell} key={index}>
                  <div className={classNames(sizeClassName, style.icon_image)}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>

                  <div className={style.divider}></div>
                  <p className={style.text}>{item.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
