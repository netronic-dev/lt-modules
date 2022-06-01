
import style from "./dealers.module.scss"
import { useState } from "react"
import InfoCard from "./Card"
import { nanoid } from "nanoid"

export default function Page(props) {

  const [activeRegion, changeRegion] = useState(0)

  function changePage(id) {
    changeRegion(id)
  }

  return (
    <div className={style.body}>
      <div className={style.grid}>
        <h1 className={style.title}>
          {props.title}{" "}
          <span className={style.active}>
            {props.data.items[activeRegion].name}
          </span>
        </h1>
        <Menu
          data={props.data}
          activeRegion={activeRegion}
          onItemChange={changePage}
        />
        <div className={style.cards_greed}>
          {props.data.items[activeRegion].items.map((item) => (
            <InfoCard
              title={item.name}
              key={nanoid()}
              data={item.items}
            />
          ))}
        </div>
      </div>
    </div>

  )
}
function Menu(props) {
  return (
    <div className={style.dealers_menu}>
      {props.data.items.map((item, index) => (
        <Item
          className={props.activeRegion === index ? style.active : ""}
          onClick={() => props.onItemChange(index)}
          key={index}
        >
          {item.name}
        </Item>
      ))}
    </div>
  )
}
function Item(props) {
  return (
    <p
      className={`
        ${style.item} 
        ${props.className}
      `}
      onClick={props.onClick}
    >
      {props.children}
    </p >
  )
}