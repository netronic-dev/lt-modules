import Link from "next/link";
import style from "../footer.module.scss";

export default function FooterMenu(props) {
  if (!props.data) {
    return (
      <div className={style.footer_menu}>
      </div>
    )
  }
  return (
    <div className={style.footer_menu}>
      <div className={style.inside}>
        {props.data.map((item, index) => (
          <ul key={index}>
            {item.data.map((subItem, subIndex) => (
              <Cell
                key={"" + subIndex + index}
                name={subItem.name}
                general={subItem.general}
                link={subItem.link}
              />
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
function Cell(props) {
  return (
    <Link
      href={props.link}
    >
      <a >
        <li className={`${props.general && style.general}`}>
          {props.name}
        </li>
      </a>
    </Link>
  )
}