import Image from "next/image";
import style from "./style.module.scss";

const Cards = (props) => {
  return (
    <section className={style.section} id={props.name}>
      <div className={style.wrapper}>
        <h2 className={style.title}>{props.title}</h2>
        <div className={style.cards_wrapper}>
          {props.data?.map((item, index) => (
            <CardCell
              key={index}
              image={item.image}
              title={item.title}
              text={item.text}
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
        <div className={style.discount} style={{ background: props.color }}>
          <div className={style.discount__title}>{props.discount.title}</div>
          <div className={style.discount__text}>{props.discount.text}</div>
        </div>
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
          <p className={style.cell__text}>{props.text}</p>
        </div>
        <div className={style.cell_bottom}>
          <div className={style.cell_price}>
            <div
              className={style.cell_price__old}
              style={{ color: props.color }}
            >
              {props.price.old}
            </div>
            <div
              className={style.cell_price__new}
              style={{ color: props.color }}
            >
              {props.price.new}
            </div>
          </div>
          <button
            style={{ background: props.color }}
            className={style.cell__button}
            onClick={props.onClick}
          >
            {props.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};
