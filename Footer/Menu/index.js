import Link from "next/link";
import style from "../footer.module.scss";

export default function FooterMenuEn(props) {
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
          <Link href="/indoor-laser-tag-equipment"
          >
            <a>
              <li>
                Indoor laser tag
              </li>
            </a>
          </Link>
          <Link href="/outdoor-laser-tag">
            <a>
              <li>
                Outdoor laser tag
              </li>
            </a>
          </Link>
          <Link href="/equipment/software">
            <a>
              <li>
                Mobile laser tag
              </li>
            </a>
          </Link>
          <Link href="/equipment/sets">
            <a>
              <li>
                Laser tag sets
              </li>
            </a>
          </Link>
          <Link href="/outdoor-laser-tag/shock-band">
            <a>
              <li>
                Shock-band
              </li>
            </a>
          </Link>
          <Link href="/equipment/software">
            <a>
              <li>
                Software
              </li>
            </a>
          </Link>
          <Link href="/equipment/software">
            <a>
              <li>
                Mobile laser tag
              </li>
            </a>
          </Link>
        </ul>
        <ul>
          <Link href="/laser-tag-business">
            <a>
              <li className={style.general}>
                Bussiness
              </li>
            </a>
          </Link>
          <Link href="/laser-tag-business/indoor">
            <a>
              <li>
                Indoor
              </li>
            </a>
          </Link>
          <Link href="/laser-tag-business/outdoor">
            <a>
              <li>
                Outdoor
              </li>
            </a>
          </Link>
          <Link href="/laser-tag-business/shock-fight">
            <a>
              <li>
                Shock-Fight
              </li>
            </a>
          </Link>
          <Link href="/laser-tag-business/mobile">
            <a>
              <li>
                Mobile
              </li>
            </a>
          </Link>
          <Link href="/laser-tag-business/arena-development">
            <a>
              <li>
                Arena development
              </li>
            </a>
          </Link>
        </ul>
        <ul>
          <Link href="/about-us">
            <a>
              <li className={style.general}>
                About us
              </li>
            </a>
          </Link>
          <Link href="/official-dealers">
            <a>
              <li>
                Dealers
              </li>
            </a>
          </Link>
          <Link href="/about-us/video">
            <a>
              <li>
                Video
              </li>
            </a>
          </Link>
        </ul>
        <ul>
          <Link href="/blog">
            <a>
              <li className={style.general}>
                Blog
              </li>
            </a>
          </Link>
          <Link href="/support/warranty">
            <a>
              <li className={style.general}>
                Warranty
              </li>
            </a>
          </Link>
          <Link href="/about-us/contact/">
            <a>
              <li className={style.general}>
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
      {props.en
        ?
        "Developing"
        :
        "В разработке"
      }
    </p>
  )
}