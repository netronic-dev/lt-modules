import React from "react";
import style from "./style.module.scss";
import Toggle from "../../Toggle/Toggle";

function TableToggle(props) {
  return (
    <div className={style.block}>
      <div className={style.inside}>
        <div className={style.table_toggle_buttons}>
          <Toggle cellOne="Характеристики" cellTwo="Описание" />
        </div>
        <table className={style.table_toggle}>
          <thead>
          </thead>
          <tbody>
            {props.tableData.map((tr) => (
              <TR key={tr.id} text={tr.text} value={tr.value} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableToggle;

function TR(props) {
  return (
    <tr>
      <td className={style.table_head}>{props.text}</td> <td>{props.value}</td>
    </tr>
  );
}
