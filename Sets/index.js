import Image from "next/image";
import { Button } from "../Buttons";
import { FalconTable, FalconTableEn } from "../../lt-lands-modules/FalconTable";
import style from "./style.module.scss";

export function SetsButtons(props) {
  return (
    <div className={style.sets_buttons_out}>
      <div
        className={style.sets_buttons}
        style={{ gridTemplateColumns: `repeat(${props.columns}, 1fr)` }}
      >
        {props.data.map((data, index) => (
          <SetButton
            active={props.active === index ? true : false}
            onClick={data.onClick}
            key={index}
            title={data.title}
            text={data.text}
          />
        ))}
      </div>
    </div>
  );
}

function SetButton(props) {
  return (
    <div
      className={`${style.button} ${
        props.active === true ? style.active : null
      }`}
      onClick={props.onClick}
    >
      <p className={style.title}>{props.title}</p>
      <p className={style.text}>{props.text}</p>
    </div>
  );
}

export function SetsHeader(props) {
  return (
    <div className={style.sets_header}>
      <div className={style.sets_header_content}>
        <h2 className={style.title}>{props.title}</h2>
        <p className={style.text}>{props.text}</p>
      </div>
      <div className={style.sets_header_button}>
        <Button style="blueBlack" text={props.buttonText} />
      </div>
    </div>
  );
}

export function SetsGrid(props) {
  return (
    <div
      className={`${style.sets_grid} ${
        props.columns === "2"
          ? style.two_columns
          : props.columns === "3"
          ? style.three_columns
          : props.columns === "4"
          ? style.four_columns
          : null
      }`}
    >
      {props.in}
    </div>
  );
}

export function SetsProductCard(props) {
  if ((props.count !== 0, props.count !== undefined)) {
    return (
      <>
        <div className={style.sets_pc}>
          <div className={style.sets_pc_image}>
            <Image
              src={props.src}
              layout="fill"
              objectFit="contain"
              alt="image"
            />
          </div>
          <div className={style.sets_pc_content}>
            <p className={style.text}>{props.name}</p>
            <p className={style.text_count}>
              {props.count + " " + (props.en ? "pc" : "шт")}
            </p>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}

export function SetsCardTitle(props) {
  return (
    <div className={style.sets_pc_title}>
      <h3>{props.text}</h3>
    </div>
  );
}

export function SetsTable(props) {
  if (props.indoor === true) {
    return (
      <div className={style.sets_table}>
        <h2 className={style.table_header_title}>
          {props.en ? "Galaxy Modifications" : "Модификации Galaxy"}
        </h2>
        <div className={style.table}>
          <div className={style.grid}>
            <p className={style.title}>Galaxy Eclipse</p>
          </div>
          <div className={style.grid}>
            <p className={style.text}>
              {props.en ? "Rubberized body" : "Прорезиненый корпус"}
            </p>
            <p className={`${style.text} ${style.standart}`}>
              {props.en ? "Protective protective tip" : "Защитный бампер"}
            </p>
          </div>
          <div className={style.grid}>
            <p className={style.text}>{props.en ? "+" : "Есть"}</p>
            <p className={`${style.text} ${style.standart}`}>
              {props.en ? "Defeat sensor" : "Датчик поражения"}
            </p>
          </div>
          <div className={style.grid}>
            <p className={style.text}>{props.en ? "+" : "Есть"}</p>
            <p className={`${style.text} ${style.standart}`}>
              {props.en ? "Second hand sensor" : "Датчик второй руки"}
            </p>
          </div>
          <div className={style.grid}>
            <p className={style.text}>IPS 240х240 px</p>
            <p className={`${style.text} ${style.standart}`}>
              {props.en ? "Display" : "Дисплей"}
            </p>
          </div>
          <div className={style.grid}>
            <p className={style.text}>
              {props.en
                ? "Recoil imitation module in the butt"
                : "Модуль вибрации в прикладе"}
            </p>
            <p className={`${style.text} ${style.standart}`}>
              {props.en ? "Recoil imitation" : "Имитация отдачи"}
            </p>
          </div>
          <div className={style.grid}>
            <p className={style.text}>
              {props.en ? "Reinforced" : "Усиленная"}
            </p>
            <p className={`${style.text} ${style.standart}`}>
              {props.en ? "Vibration indication" : "Виброиндикация"}
            </p>
          </div>
        </div>
        <div className={style.button_form}>
          <Button type="catalog" style="blueBlack" text={props.buttonText} />
        </div>
      </div>
    );
  } else {
    return (
      <div className={style.table_outdoor_out}>
        <div className={style.table_outdoor}>
          <div className={style.table_outdoor_header}>
            <h2 className={style.table_header_title}>
              {props.en
                ? "Falcon Modifications F1 | F2"
                : "Модификации Falcon F1 | F2"}
            </h2>
          </div>
          {props.en ? (
            <FalconTableEn sets={true} />
          ) : (
            <FalconTable sets={true} />
          )}
          <div className={style.button_form}>
            <Button text={props.buttonText} type="catalog" style="blueBlack" />
          </div>
        </div>
      </div>
    );
  }
}
