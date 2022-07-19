import Link from "next/link";
import style from "../footer.module.scss";

export default function FooterMobile(props) {
  function scroll() {
    window.scroll({ top: 0 })
  }
  return (
    <div className={style.footer_menu_mobile}>
      {props.data.map((data, index) =>
        data.items === undefined ? (
          <Link href={data.link} key={index} >
            <div onClick={scroll} className={style.mobile_menu__item}>
              <p className={style.mobile_menu__item_text}>{data.name}</p>
            </div></Link>
        ) : (
          <FooterAccordion
            key={index}
            id={index}
            title={data.name}
            listData={data.items}
            link={data.link}
          />
        )
      )}
    </div>
  );
}

function FooterAccordion(props) {
  return (
    <div className={style.accordion}>
      <input
        type="checkbox"
        name="tab-group"
        id={props.id + "f"} // f means footer чтоб не было id как в хедере
        className={style.accordion__input}
      />
      <label htmlFor={props.id + "f"} className={style.tab_title}>
        {props.link ?
          (<Link href={props.link}>
            <p className={style.accordion__text}>
              {props.title}
            </p>
          </Link>) :
          (<p className={style.accordion__text}>{props.title}</p>)}
        <div className={style.accordion__arrow}>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path
              d="M10.59 7.40997L6 2.82997L1.41 7.40997L1.23266e-07 5.99997L6 -2.72274e-05L12 5.99997L10.59 7.40997Z"
              fill="white"
            />
          </svg>
        </div>
      </label>
      <span className={style.tab_content}>
        <ul>
          {props.listData.map((listData, index) => (
            <AccordionItem
              key={index}
              link={listData.link}
              linkA={listData.linkA}
              text={listData.name}
              developing={listData.developing}
            />
          ))}
        </ul>
      </span>
    </div>
  );
}

function AccordionItem(props) {

  function scroll() {
    window.scroll({ top: 0 })
  }

  return (
    <Link href={props.link ? props.link : ""}>
      <a
        target={props.blank ? "_blank" : false}
      >
        <li onClick={scroll} className={style.tab_content__list}>
          {props.text}
        </li>
      </a>
    </Link>
  );
}
