import Link from "next/link";
import { useGAEvents } from "../../../context/GAEventsProvider";
import style from "../footer.module.scss";

export default function FooterMobile(props) {
  const GAEvents = useGAEvents();

  function scroll() {
    window.scroll({ top: 0 });
  }

  function SendGAClickEvent(link) {
    GAEvents.buttonClick("Footer", "Link click", link);
  }

  if (!props.data) {
    return <div className={style.footer_menu_mobile}></div>;
  }
  return (
    <div className={style.footer_menu_mobile}>
      {props.data.map((data, index) =>
        data.items === undefined ? (
          <Link href={data.link} key={index}>
            <div
              onClick={() => {
                scroll(), SendGAClickEvent(data.link);
              }}
              className={style.mobile_menu__item}
            >
              <p className={style.mobile_menu__item_text}>{data.name}</p>
            </div>
          </Link>
        ) : (
          <FooterAccordion
            key={index}
            id={index}
            title={data.name}
            listData={data.items}
            link={data.link}
            onLinkClick={(link) => SendGAClickEvent(link)}
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
        {props.link ? (
          <Link href={props.link}>
            <p
              className={style.accordion__text}
              onClick={() => props.onLinkClick(props.link)}
            >
              {props.title}
            </p>
          </Link>
        ) : (
          <p className={style.accordion__text}>{props.title}</p>
        )}
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
              text={listData.name}
              onLinkClick={() => props.onLinkClick(listData.link)}
            />
          ))}
        </ul>
      </span>
    </div>
  );
}

function AccordionItem(props) {
  function scroll() {
    window.scroll({ top: 0 });
  }

  return (
    <li onClick={scroll} className={style.tab_content__list}>
      <Link href={props.link || "/"}>
        <a target={props.blank ? "_blank" : ""} onClick={props.onLinkClick}>
          {props.text}
        </a>
      </Link>
    </li>
  );
}
