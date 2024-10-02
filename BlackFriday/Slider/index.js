import Image from "next/image";
import style from "./style.module.scss";
import Slider from "react-slick";
import { nanoid } from "nanoid";

export default function IAAPANews(props) {
  const settings = {
    customPaging: function (i) {
      return (
        <button className="dot-out">
          <div className="dot"></div>
        </button>
      );
    },
    dots: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <button>{prevButton}</button>,
    nextArrow: <button>{nextButton}</button>,
    responsive: [
      {
        breakpoint: 1750,
        settings: {
          centerPadding: "300px",
        },
      },
    ],
  };
  return (
    <section className={style.news}>
      <div className={style.news__in}>
        <h2 className={style.title}>{props.title}</h2>
        <div className="iaapa_slider">
          <Slider {...settings}>
            {props.data.map((data) => (
              <Cell
                key={nanoid()}
                cell_title={data.title}
                cell_text={data.text}
                cell_image={data.image}
                data={data.iconsData}
                price={data.price}
                oldPrice={data.oldPrice}
                discount={data.discount}
              />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

function Cell(props) {
  return (
    <div className={style.cell}>
      <div className={style.cell_image}>
        <Image
          src={props.cell_image}
          layout="fill"
          objectFit="cover"
          objectPosition="50% 0"
          priority={true}
          alt="image"
        />
        <div className={style.discount}>{props.discount}</div>
      </div>
      <div className={style.content}>
        <div className={style.content_inner}>
          <p className={style.cell_title}>{props.cell_title}</p>
          <p className={style.cell_text}>{props.cell_text}</p>
          <div className={style.grid}>
            {props.data.map((item) => (
              <IconCell
                key={nanoid()}
                icon={item.icon}
                text={item.text}
                adding_text={item.count}
              />
            ))}
          </div>
        </div>
        {props.price ? (
          <div className={style.price_cell}>
            <div className={style.price}>{props.price}</div>
            <div className={style.old_price}>{props.oldPrice}</div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

function IconCell(props) {
  return (
    <div className={style.icon_cell}>
      <img src={props.icon} className={style.icon} alt="Icon" />
      <div className={style.text_outer}>
        <p className={style.icon_cell_text}>{props.text}</p>
        <p className={style.icon_cell_adding_text}>{props.adding_text}</p>
      </div>
    </div>
  );
}

const prevButton = (
  <svg width="51" height="51" viewBox="0 0 51 51" fill="none">
    <circle
      cx="25.2197"
      cy="25.4163"
      r="25"
      transform="rotate(-180 25.2197 25.4163)"
      fill="#C4C4C4"
    />
    <path
      d="M27.2199 31.4163L28.6299 30.0063L24.0499 25.4163L28.6299 20.8263L27.2199 19.4163L21.2199 25.4163L27.2199 31.4163Z"
      fill="white"
    />
  </svg>
);

const nextButton = (
  <svg width="50" height="51" viewBox="0 0 50 51" fill="none">
    <circle cx="25" cy="25.4163" r="25" fill="#C4C4C4" />
    <path
      d="M23.0001 19.4163L21.5901 20.8263L26.1701 25.4163L21.5901 30.0063L23.0001 31.4163L29.0001 25.4163L23.0001 19.4163Z"
      fill="white"
    />
  </svg>
);
