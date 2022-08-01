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
          <ul>
            {item.data.map((subItem, subIndex) => (
              <Link
                key={"" + subIndex + index}
                href={subItem.link}
              >
                <a>
                  <li className={`${subItem.general && style.general}`}>
                    {subItem.name}
                  </li>
                </a>
              </Link>
            ))}
          </ul>
        ))}

      </div>
    </div>
  );
}