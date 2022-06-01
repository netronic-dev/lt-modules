import Image from "next/image";
import { PriceButton } from "../Buttons/Buttons";
import { FalconTable, FalconTableEn } from "../LandModules/FalconTable/FalconTable";
import style from "./style.module.scss";

export function SetsButtons(props) {
  return (
    <div className={style.sets_buttons_out}>
      <div
        className={style.sets_buttons}
        style={{ gridTemplateColumns: `repeat(${props.columns}, 1fr)` }}
      >
        {props.data.map((data, index) => (
          <Button
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

function Button(props) {
  return (
    <div
      className={`${style.button} ${props.active === true ? style.active : null
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
        <PriceButton
          style="blueBlack"
          en={props.en}
          text={props.buttonText}
        />
      </div>
    </div>
  );
}

export function SetsGrid(props) {
  return (
    <div
      className={`${style.sets_grid} ${props.columns === "2"
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
            <Image src={props.src} layout="fill" objectFit="contain" />
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
            <p className={style.title}>Galaxy</p>
            <p className={style.title}>Galaxy Pulse</p>
            <p className={style.title}>Galaxy Eclipse</p>
          </div>
          <div className={style.grid}>
            <p className={style.text}>
              {props.en ? "Rubber protective tip" : "Резиновый бампер"}
            </p>
            <p className={style.text}>
              {props.en ? "Rubber protective tip" : "Резиновый бампер"}
            </p>
            <p className={style.text}>
              {props.en ? "Rubberized body" : "Прорезиненый корпус"}
            </p>
            <p className={`${style.text} ${style.standart}`}>
              {props.en ? "Protective protective tip" : "Защитный бампер"}
            </p>
          </div>
          <div className={style.grid}>
            <p className={style.text}>
              {props.en ? "+" : "Есть"}
            </p>
            <p className={style.text}>
              {props.en ? "+" : "Есть"}
            </p>
            <p className={style.text}>
              {props.en ? "+" : "Есть"}
            </p>
            <p className={`${style.text} ${style.standart}`}>
              {props.en ? "Defeat sensor" : "Датчик поражения"}
            </p>
          </div>
          <div className={style.grid}>
            <p className={style.text}>
              {props.en ? "+" : "Есть"}
            </p>
            <p className={style.text}>
              {props.en ? "+" : "Есть"}
            </p>
            <p className={style.text}>
              {props.en ? "+" : "Есть"}
            </p>
            <p className={`${style.text} ${style.standart}`}>
              {props.en ? "Second hand sensor" : "Датчик второй руки"}
            </p>
          </div>
          <div className={style.grid}>
            <p className={style.text}>IPS 128х128 px</p>
            <p className={style.text}>IPS 128х128 px</p>
            <p className={style.text}>IPS 240х240 px</p>
            <p className={`${style.text} ${style.standart}`}>
              {props.en ? "Display" : "Дисплей"}
            </p>
          </div>
          <div className={style.grid}>
            <p className={style.text}>
              {props.en ? "-" : "Нет"}
            </p>
            <p className={style.text}>
              {props.en ? "Impulse recoil module" : "Модуль импульсной отдачи"}
            </p>
            <p className={style.text}>
              {props.en ? "Recoil imitation module in the butt" : "Модуль вибрации в прикладе"}
            </p>
            <p className={`${style.text} ${style.standart}`}>
              {props.en ? "Recoil imitation" : "Имитация отдачи"}
            </p>
          </div>
          <div className={style.grid}>
            <p className={style.text}>
              {props.en ? "Standard" : "Стандартная"}
            </p>
            <p className={style.text}>
              {props.en ? "Standard" : "Стандартная"}
            </p>
            <p className={style.text}>
              {props.en ? "Reinforced" : "Усиленная"}
            </p>
            <p className={`${style.text} ${style.standart}`}>
              {props.en ? "Vibration indication" : "Виброиндикация"}
            </p>
          </div>
        </div>
        <div className={style.button_form}>
          <PriceButton
            catalog={true}
            style="blueBlack"
            en={props.en}
            text={props.buttonText}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className={style.table_outdoor_out}>
        <div className={style.table_outdoor}>
          <div className={style.table_outdoor_header}>
            <h2 className={style.table_header_title}>
              {props.en ? "Falcon Modifications F1 | F2" : "Модификации Falcon F1 | F2"}
            </h2>
          </div>
          {props.en ?
            (<FalconTableEn sets={true} />) :
            (<FalconTable sets={true} />)}
          <div className={style.button_form}>
            <PriceButton
              en={props.en}
              text={props.buttonText}
              catalog={true}
              style="blueBlack"
            />
          </div>
        </div>
      </div>
    );
  }
}
