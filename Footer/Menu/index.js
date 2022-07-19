import Link from "next/link";
import style from "../footer.module.scss";

export default function FooterMenu(props) {
  return (
    <div className={style.footer_menu}>
      <div className={style.inside}>
        <ul>
          <Link href="/equipment"
          >
            <a>
              <li className={style.general}>
                Equipment
              </li>
            </a>
          </Link>
          <Link href="/equipment/falcon"
          >
            <a>
              <li>
                Falcon
              </li>
            </a>
          </Link>
          <Link href="/equipment/lux">
            <a>
              <li>
                Falcon Lux
              </li>
            </a>
          </Link>
          <Link href="/equipment/software">
            <a>
              <li>
                Headband
              </li>
            </a>
          </Link>
          <Link href="/equipment/headband">
            <a>
              <li>
                Laser tag sets
              </li>
            </a>
          </Link>
          <Link href="/equipment/scorpion">
            <a>
              <li>
                Scorpion
              </li>
            </a>
          </Link>
        </ul>
        <ul>
          <Link href="/mobile-business">
            <a>
              <li className={style.general}>
                Mobile business
              </li>
            </a>
          </Link>
          <Link href="/software">
            <a>
              <li className={style.general}>
                Software
              </li>
            </a>
          </Link>
        </ul>
        <ul>
          <Link href="/about-company">
            <a>
              <li className={style.general}>
                About company
              </li>
            </a>
          </Link>
          <Link href="/about-company/clubs">
            <a>
              <li>
                Laser tag clubs
              </li>
            </a>
          </Link>
          <Link href="/about-company/contacts/">
            <a>
              <li>
                Contacts
              </li>
            </a>
          </Link>
        </ul>
      </div>
    </div>
  );
}
function Developing(props) {
  return (
    <p className={style.developing}>
      Developing
    </p>
  )
}