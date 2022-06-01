import React from "react";
import style from "./style.module.scss";
import ProductCardSlider from "../../Slider/ProductCardSlider/ProductCardSlider";

function ProductCard(props) {
  return (
    <div className={style.block}>
      <div className={style.inside}>
        <div className={style.title_block}>
          <h2 className={style.title}>{props.title}</h2>
          <p className={style.description}>{props.description}</p>
        </div>
        <div className={style.slider}>
          <ProductCardSlider sliderData={props.sliderData} />
        </div>
        <div>
          <button className={style.price_button}>Узнать цену</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
