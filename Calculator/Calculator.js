import style from "./style.module.scss"
import { useState } from "react"
import { PopUpCall } from "../InputForms/PopUpForms/PopUpForms"

export function Calculator(props) {
  let sortedNumbersData

  if (props.lt) {
    if (props.en) {
      sortedNumbersData = numbersData.ltWorld
    } else {
      sortedNumbersData = numbersData.ltRu
    }
  } else {
    if (props.en) {
      sortedNumbersData = numbersData.marsWorld
    } else {
      sortedNumbersData = numbersData.marsRu
    }
  }

  const [activeCell, changeActiveCell] = useState(1)

  const [isPopUpActive, changePopUpView] = useState(false)

  // Количество рабочих дней арены в месяце
  const [input1, changeInput1] = useState(sortedNumbersData.workingDays)
  // Количество рабочих часов арены в день
  const [input2, changeInput2] = useState(sortedNumbersData.workingHours)
  // Количество игр в час 
  const [input3, changeInput3] = useState(sortedNumbersData.gamesPerHour)
  // Стоимость игры для одного игрока
  const [input4, changeInput4] = useState(sortedNumbersData.costPerPlayer)
  // Количество комплектов лазертаг оборудования
  const [input5, changeInput5] = useState(sortedNumbersData.numberOfSets)
  // Общая стоимость лазертаг оборудования
  const [input6, changeInput6] = useState(sortedNumbersData.costOfEquipment)
  // Cумма инвестиций на открытие арены
  const [input7, changeInput7] = useState(sortedNumbersData.investPrice)
  // Операционные ежемесячные расходы
  const [input8, changeInput8] = useState(sortedNumbersData.monthlyExpenses)
  // Процент загрузка арены
  const [input9, changeInput9] = useState(sortedNumbersData.clubLoad)

  let range = input9 / 100
  // Количество рабочих дней в месяце
  function onInput1Change(e) {
    changeInput1(Number(e.target.value.replace(/\W/gi, '')))
  }
  // Количество рабочих часов в день
  function onInput2Change(e) {
    changeInput2(Number(e.target.value.replace(/\W/gi, '')))
  }
  // Количество игр в час
  function onInput3Change(e) {
    changeInput3(Number(e.target.value.replace(/\W/gi, '')))
  }
  // Стоимость игры для одного игрока
  function onInput4Change(e) {
    changeInput4(Number(e.target.value.replace(/\W/gi, '')))
  }
  // Количество комплектов лазертаг оборудования
  function onInput5Change(e) {
    changeInput5(Number(e.target.value.replace(/\W/gi, '')))
  }
  // Общая стоимость лазертаг оборудования
  function onInput6Change(e) {
    changeInput6(Number(e.target.value.replace(/\W/gi, '')))
  }
  // Сумма инвестиций на открытие арены
  function onInput7Change(e) {
    changeInput7(Number(e.target.value.replace(/\W/gi, '')))
  }
  // Операционные ежемесячные расходы
  function onInput8Change(e) {
    changeInput8(Number(e.target.value.replace(/\W/gi, '')))
  }
  // Процент загрузка арены
  function onInput9Change(e) {
    changeInput9(Number(e.target.value.replace(/\W/gi, '')))
  }
  // количество игр в день
  let num1 = ((input2) * (input3)) * range
  // количество игр в месяц
  let num2 = (num1) * (input1)
  // количество игроков в день,  чел.
  let num3 = (num1) * (input5)
  // количество игроков в месяц,  чел.
  let num4 = (num3) * (input1)
  // Сумма выручки в день
  let num5 = (input4) * (num3)
  // Выручка в месяц (валовый доход)
  let num6 = (num5) * (input1)
  // Размер инвестиций на открытие арены (оборудовани + постройка)
  let num7 = (input6) + (input7)
  // Операционные расходы в месяц
  let num8 = (input8)
  // EBIT (операционная прибыль в месяц)
  let num9 = (num6) - (num8)
  // Срок окупаемости (месяцев)
  let num10 = (num7) / (num9)
  // Рентабельность бизнеса
  let num11 = (num9 * 100) / (num6)
  // ROI ПРОЕКТА, %
  let num12 = (num9) / (num7) * 100

  function onPrevClick() {
    if (activeCell > 1) {
      changeActiveCell(activeCell - 1)
    }
  }
  function onNextClick() {
    if (activeCell < 3) {
      changeActiveCell(activeCell + 1)
    }
  }
  function onFirstPageChange() {
    changeActiveCell(1)
  }
  function onSecondPageChange() {
    changeActiveCell(2)
  }
  function onThirdPageChange() {
    changeActiveCell(3)
  }
  function onInputFormOpen() {
    changePopUpView(!isPopUpActive)
  }

  return (
    <>
      {isPopUpActive ? <PopUpCall
        closeClick={onInputFormOpen}
        en={props.en}
      /> : null}
      <div className={style.desktop}>
        <PageButtons
          activeCell={activeCell}
          onFirstPageChange={onFirstPageChange}
          onSecondPageChange={onSecondPageChange}
          onThirdPageChange={onThirdPageChange}
        />
      </div>
      <div className={style.calculator}>
        <div className={`${style.inputs_cell} ${activeCell === 3 ? style.paddings : null}`}>
          <div className={style.triangle_out}>
            <img className={style.triangle} src="/calculator/triangle.svg" />
          </div>
          <div className={style.responsive}>
            <PageButtons
              activeCell={activeCell}
              onFirstPageChange={onFirstPageChange}
              onSecondPageChange={onSecondPageChange}
              onThirdPageChange={onThirdPageChange}
            />
          </div>
          {activeCell === 1 ?
            (<div>
              <InputItem
                title={props.en ? "Number of working days in a month" : "Количество рабочих дней в месяце"}
                min={sortedNumbersData.workingDaysFrom}
                max={sortedNumbersData.workingDaysTo}
                onChange={onInput1Change}
                value={input1}
              />
              <InputItem
                title={props.en ? "Number of working hours per day" : "Количество рабочих часов в день"}
                min={sortedNumbersData.workingHoursFrom}
                max={sortedNumbersData.workingHoursTo}
                onChange={onInput2Change}
                value={input2}
              />
              <InputItem
                title={props.en ? "Number of games per hour" : "Максимальное количество игр в час"}
                min={sortedNumbersData.gamesPerHourFrom}
                max={sortedNumbersData.gamesPerHourTo}
                onChange={onInput3Change}
                value={input3}
              />
              <div className={style.responsive}>
                <InputItem
                  title={props.en ? "Cost of the game for one player $" : "Стоимость игры для одного игрока ₽"}
                  min={sortedNumbersData.costPerPlayerFrom}
                  step={10}
                  max={sortedNumbersData.costPerPlayerTo}
                  onChange={onInput4Change}
                  value={input4}
                />
                <InputItem
                  title={props.en ? "Number of sets" : "Количество комплектов оборудования"}
                  min={sortedNumbersData.numberOfSetsFrom}
                  max={sortedNumbersData.numberOfSetsTo}
                  onChange={onInput5Change}
                  value={input5}
                />
              </div>
            </div>) : null
          }
          {activeCell === 2 ?
            <div>
              <div className={style.desktop}>
                <InputItem
                  title={props.en ? "Cost of the game for one player $" : "Стоимость игры для одного игрока ₽"}
                  min={sortedNumbersData.costPerPlayerFrom}
                  step={10}
                  max={sortedNumbersData.costPerPlayerTo}
                  onChange={onInput4Change}
                  value={input4}
                />
                <InputItem
                  title={props.en ? "Number of sets" : "Количество комплектов оборудования"}
                  min={sortedNumbersData.numberOfSetsFrom}
                  max={sortedNumbersData.numberOfSetsTo}
                  onChange={onInput5Change}
                  value={input5}
                />
              </div>
              <InputItem
                title={props.en ? "Total cost of equipment $" : "Общая стоимость оборудования ₽"}
                min={sortedNumbersData.costOfEquipmentFrom}
                max={sortedNumbersData.costOfEquipmentTo}
                step={10000}
                onChange={onInput6Change}
                value={input6}
              />
              <div className={style.responsive}>
                <InputItem
                  title={props.en ? "Total investment for the arena opening $" : "Cумма инвестиций на открытие арены ₽"}
                  onChange={onInput7Change}
                  value={input7}
                />
                <InputItem
                  title={props.en ? "Operating expenses per month $" : "Операционные ежемесячные расходы ₽"}
                  onChange={onInput8Change}
                  value={input8}
                />
                <InputItem
                  title={props.en ? "Arena load (percentage)" : "Процент загрузки клуба %"}
                  min={sortedNumbersData.clubLoadFrom}
                  step={5}
                  max={sortedNumbersData.clubLoadTo}
                  onChange={onInput9Change}
                  value={input9}
                />
              </div>
            </div>
            : null}
          {activeCell === 3 ?
            (<>
              <div className={style.desktop}>
                <InputItem
                  title={props.en ? "Total investment for the arena opening $" : "Cумма инвестиций на открытие клуба ₽"}
                  onChange={onInput7Change}
                  value={input7}
                />
                <InputItem
                  title={props.en ? "Operating expenses per month $" : "Операционные ежемесячные расходы ₽"}
                  onChange={onInput8Change}
                  value={input8}
                />
                <InputItem
                  title={props.en ? "Arena load (percentage)" : "Процент загрузки клуба %"}
                  min={sortedNumbersData.clubLoadFrom}
                  step={5}
                  max={sortedNumbersData.clubLoadTo}
                  onChange={onInput9Change}
                  value={input9}
                />
              </div>
              <div className={style.responsive}>
                <OutCome
                  en={props.en}
                  num1={num5}
                  num2={num9 < 0 ? 0 : num9}
                  num3={num10}
                />
              </div>
            </>)
            : null}
          <div className={style.buttons}>
            <button
              className={`${activeCell === 1 ? style.button_border_inactive : style.button_border}`}
              onClick={activeCell === 1 ? null : onPrevClick}
            >
              {props.en ? "Back" : "Назад"}
            </button>
            <button
              className={style.button_fill}
              onClick={activeCell === 3 ? onInputFormOpen : onNextClick}
            >
              {activeCell === 3 ? props.en ? "Contact us" : "Связаться" : props.en ? "Next" : "Далее"}
            </button>
          </div>
        </div>
        <div className={style.desktop}>
          <OutCome
            en={props.en}
            num1={num5}
            num2={num9 < 0 ? 0 : num9}
            num3={num10}
          />
        </div>
      </div >
    </>
  )
}
function OutCome(props) {
  const num1 = Number(props.num1).toFixed(0)
  const num2 = Number(props.num2).toFixed(0)
  const num3 = Number(props.num3).toFixed(1)
  return (
    <div className={style.outcome}>
      <h2 className={style.outcome__title}>
        {props.en ? "Your result" : "Ваш результат"}
      </h2>
      <div className={style.outcome__cell}>
        <div className={style.outcome_type}>
          <img className={style.outcome_type__icon} src="/calculator/pepe.svg" />
          <h3 className={style.outcome_type__text}>
            {props.en ? "Revenue per day" : "Сумма выручки в день"}
          </h3>
        </div>
        <p className={style.outcome__value}>
          {numberWithSpace(num1)} {props.en ? "$" : "₽"}
        </p>
      </div>
      <div className={style.outcome__cell}>
        <div className={style.outcome_type}>
          <img className={style.outcome_type__icon} src="/calculator/calendar.svg" />
          <h3 className={style.outcome_type__text}>
            {props.en ? "Operating profit per month" : "Операционная прибыль в месяц"}
          </h3>
        </div>
        <p className={style.outcome__value}>
          {numberWithSpace(num2)} {props.en ? "$" : "₽"}
        </p>
      </div>
      <div className={style.outcome__cell}>
        <div className={style.outcome_type}>
          <img className={style.outcome_type__icon} src="/calculator/time.svg" />
          <h3 className={style.outcome_type__text}>
            {props.en ? "Payback time (months)" : "Срок окупаемости (месяцев)"}
          </h3>
        </div>
        <p className={style.outcome__value}>
          {num3}
        </p>
      </div>
    </div>
  )
}
function InputItem(props) {

  return (
    <div className={style.input_item}>
      <h3 className={style.input_item__title}>
        {props.title}
      </h3>
      <input
        className={style.input_item__number_input}
        type="text"
        onChange={props.onChange}
        value={numberWithSpace(props.value)}
        min={props.min}
        max={props.max}
      />
      <div className={style.input_item__range_input_out}>
        {props.max ?
          <input
            className={style.input_item__range_input}
            type="range"
            name={props.title}
            min={props.min}
            max={props.max}
            step={props.step ? props.step : 1}
            onChange={props.onChange}
            value={props.value}
          /> : null}
        <div className={style.from_to}>
          <p className={style.text}>
            {props.min ? numberWithSpace(props.min) : null}
          </p>
          <p className={style.text}>
            {props.max ? numberWithSpace(props.max) : null}
          </p>
        </div>
      </div>
    </div>
  )
}
function PageButtons(props) {
  return (
    <div className={style.top_buttons_out}>
      <div className={style.top_buttons}>
        <button
          onClick={props.onFirstPageChange}
          className={`${style.top_buttons__button} 
            ${props.activeCell === 1 ? style.active : null}`}>
          1
        </button>
        <button
          onClick={props.onSecondPageChange}
          className={`${style.top_buttons__button} 
            ${props.activeCell === 2 ? style.active : null}`}>
          2
        </button>
        <button
          onClick={props.onThirdPageChange}
          className={`${style.top_buttons__button} 
            ${props.activeCell === 3 ? style.active : null}`}>
          3
        </button>
      </div>
    </div>
  )
}
function numberWithSpace(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
const numbersData = {
  marsRu: {
    workingDays: 28,
    workingDaysFrom: 20,
    workingDaysTo: 31,
    workingHours: 10,
    workingHoursFrom: 6,
    workingHoursTo: 24,
    gamesPerHour: 2,
    gamesPerHourFrom: 1,
    gamesPerHourTo: 3,
    costPerPlayer: 550,
    costPerPlayerFrom: 1,
    costPerPlayerTo: 1500,
    numberOfSets: 8,
    numberOfSetsFrom: 6,
    numberOfSetsTo: 10,
    costOfEquipment: 2000000,
    costOfEquipmentFrom: 1500000,
    costOfEquipmentTo: 2400000,
    investPrice: 1500000,
    monthlyExpenses: 60000,
    clubLoad: 20,
    clubLoadFrom: 10,
    clubLoadTo: 100
  },
  marsWorld: {
    workingDays: 28,
    workingDaysFrom: 20,
    workingDaysTo: 31,
    workingHours: 10,
    workingHoursFrom: 6,
    workingHoursTo: 24,
    gamesPerHour: 1,
    gamesPerHourFrom: 1,
    gamesPerHourTo: 3,
    costPerPlayer: 25,
    costPerPlayerFrom: 10,
    costPerPlayerTo: 50,
    numberOfSets: 8,
    numberOfSetsFrom: 6,
    numberOfSetsTo: 10,
    costOfEquipment: 35000,
    costOfEquipmentFrom: 30000,
    costOfEquipmentTo: 50000,
    investPrice: 30000,
    monthlyExpenses: 5000,
    clubLoad: 20,
    clubLoadFrom: 10,
    clubLoadTo: 100
  },
  ltRu: {
    workingDays: 28,
    workingDaysFrom: 20,
    workingDaysTo: 31,
    workingHours: 10,
    workingHoursFrom: 6,
    workingHoursTo: 24,
    gamesPerHour: 1,
    gamesPerHourFrom: 1,
    gamesPerHourTo: 3,
    costPerPlayer: 550,
    costPerPlayerFrom: 1,
    costPerPlayerTo: 1500,
    numberOfSets: 14,
    numberOfSetsFrom: 6,
    numberOfSetsTo: 30,
    costOfEquipment: 400000,
    costOfEquipmentFrom: 300000,
    costOfEquipmentTo: 1000000,
    investPrice: 1500000,
    monthlyExpenses: 60000,
    clubLoad: 15,
    clubLoadFrom: 10,
    clubLoadTo: 100
  },
  ltWorld: {
    workingDays: 28,
    workingDaysFrom: 20,
    workingDaysTo: 31,
    workingHours: 10,
    workingHoursFrom: 6,
    workingHoursTo: 24,
    gamesPerHour: 1,
    gamesPerHourFrom: 1,
    gamesPerHourTo: 3,
    costPerPlayer: 15,
    costPerPlayerFrom: 5,
    costPerPlayerTo: 25,
    numberOfSets: 14,
    numberOfSetsFrom: 6,
    numberOfSetsTo: 30,
    costOfEquipment: 13000,
    costOfEquipmentFrom: 10000,
    costOfEquipmentTo: 40000,
    investPrice: 30000,
    monthlyExpenses: 5000,
    clubLoad: 15,
    clubLoadFrom: 10,
    clubLoadTo: 100
  }
}