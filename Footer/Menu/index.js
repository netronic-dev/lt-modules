import Link from "next/link";
import { useGAEvents } from "../../../context/GAEventsProvider";
import style from "../footer.module.scss";

export default function FooterMenu(props) {
  const GAEvents = useGAEvents();

  function SendGAClickEvent(link) {
    GAEvents.buttonClick("Footer", "Link click", link);
  }

  if (!props.data) {
    return <div className={style.footer_menu}></div>;
  }
  return (
    <div className={style.footer_menu}>
      <div className={style.inside}>
        {props.data.map((item, index) => (
          <ul key={index}>
            {item.data.map((subItem, subIndex) => (
              <li key={"" + subIndex + index}>
                <Cell
                  key={"" + subIndex + index}
                  name={subItem.name}
                  general={subItem.general}
                  link={subItem.link}
                  onLinkClick={() => SendGAClickEvent(subItem.link)}
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

function Cell(props) {
  return (
    <Link href={props.link}>
      <a onClick={props.onLinkClick}>
        <span className={`${props.general && style.general}`}>
          {props.name}
        </span>
      </a>
    </Link>
  );
}
