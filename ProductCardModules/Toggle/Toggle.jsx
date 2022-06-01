import React from "react";
import style from "./style.module.scss";

function Toggle(props) {
  //стейт по нажатию кнопки смена на тру или фолс
  // при смене стейта смена текста на странице
  return (
    <div className={style.buttons_block}>
      <span className={style.button_active}>{props.cellOne}</span>
      <span className={style.button}>{props.cellTwo}</span>
    </div>
  );
}

export default Toggle;
