import React from 'react'
import style from './style.module.scss'

function TableTrue() {
  return (
    <div className={style.block}>
      <div className={style.inside}>

        <table className={style.table_true}>
          <thead>
            <tr className={style.table_header}>
              <td></td>
              <td>Base</td>
              <td>Standart</td>
              <td>Premium</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={style.table_text}>Ударопрочный корпус</td>
              <td className={style.true}>+</td>
              <td className={style.true}>+</td>
              <td className={style.true}>+</td>
            </tr>
            <tr>
              <td className={style.table_text}>Защитный бампер</td>
              <td className={style.true}>+</td>
              <td className={style.true}>+</td>
              <td className={style.true}>+</td>
            </tr>
            <tr>
              <td className={style.table_text}>Датчик второй руки</td>
              <td> </td>
              <td className={style.true}>+</td>
              <td className={style.true}>+</td>
            </tr>
            <tr>
              <td className={style.table_text}>Цветной OLED-экран</td>
              <td> </td>
              <td className={style.true}>+</td>
              <td className={style.true}>+</td>
            </tr>
            <tr>
              <td className={style.table_text}>Встроенные датчики поражения</td>
              <td> </td>
              <td className={style.true}>+</td>
              <td className={style.true}>+</td>
            </tr>
            <tr>
              <td className={style.table_text}>Импульсная отдача</td>
              <td> </td>
              <td> </td>
              <td className={style.true}>+</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default TableTrue