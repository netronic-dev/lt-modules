import Image from "next/image";
import style from "./style.module.scss";

const Cards = (props) => {
  return (
    <section className={style.section} id={props.name}>
      <div className={style.wrapper}>
        {props.title && <h2 className={style.title}>{props.title}</h2>}
        <div className={style.cards_wrapper}>
          {props.data?.map((item, index) => (
            <CardCell
              key={index}
              image={item.image}
              title={item.title}
              subtitle={item.subtitle}
              text1={item.text1}
              text2={item.text2}
              list={item.list}
              subsubtitle1={item.subsubtitle1}
              subsubtitle2={item.subsubtitle2}
              subsubtitle3={item.subsubtitle3}
              buttonText={item.buttonText}
              price={item.price}
              discount={item.discount}
              color={item.color}
              onClick={() => props.onClick(item)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cards;

const CardCell = (props) => {
  return (
    <div className={style.cell}>
      <div className={style.image_outer}>
        {props.image.src && (
          <Image
            src={props.image.src}
            layout="fill"
            objectFit="cover"
            objectPosition={props.image.objectPosition || "0 0"}
            alt="image"
          />
        )}
      </div>
      <div className={style.cell_text_outer}>
        <div className={style.cell_top}>
          <h3 className={style.cell__title}>{props.title}</h3>
          <h4 className={style.cell__subtitle}>{props.subtitle}</h4>
          <p className={style.cell__text}>{props.text1}</p>
          {props.subsubtitle1 && (
            <p className={style.cell__subsubtitle}>{props.subsubtitle1}</p>
          )}
          <p className={style.cell__text}>{props.text2}</p>
          <p className={style.cell__subsubtitle}>{props.subsubtitle2}</p>
          {props.list && (
            <ul className={style.cell__list}>
              {props.list.map((item, index) => (
                <li key={index}>{item.text}</li>
              ))}
            </ul>
          )}
          <p className={style.cell__subsubtitle}>{props.subsubtitle3}</p>
        </div>
      </div>
    </div>
  );
};
