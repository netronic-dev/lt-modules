import Link from "next/link";
import style from "../footer.module.scss";

export default function FooterMenu(props) {
  return (
    <div className={style.footer_menu}>
      <div className={style.inside}>
        <ul>
          <Link href="/oborudovanie">
            <a>
              <li className={style.general}>
                Оборудование
              </li>
            </a>
          </Link>
          <Link href="/arennoe-lasertag-oborudovanie">
            <a>
              <li>
                Аренное лазертаг-оборудование
              </li>
            </a>
          </Link>
          <Link href="/vnearennoe-lasertag-oborudovanie">
            <a>
              <li>
                Внеаренное лазертаг-оборудование
              </li>
            </a>
          </Link>
          <Link href="/oborudovanie/komplektacii">
            <a>
              <li>
                Комплектации оборудования
              </li>
            </a>
          </Link>
          <Link href="/vnearennoe-lasertag-oborudovanie/shok-braslet-scorpion">
            <a>
              <li>
                Шок-браслет
            </li>
            </a>
          </Link>
          <Link href="/oborudovanie/prilozhenie">
            <a>
              <li>
                Программное обеспечение
          </li>
            </a>
          </Link>
          <a href="https://marsvr.ru"
            target="_blank"
          >
            <li>
              VR
      </li>
          </a>
        </ul >
        <ul>
          <Link href="/lazertag-biznes">
            <a>
              <li className={style.general}>
                Лазертаг-бизнес
              </li>
            </a>
          </Link>
          <Link href="/lazertag-biznes/arenniy-buisness/">
            <a>
              <li>
                Аренный бизнес
    </li>
            </a>
          </Link >
          <Link href="/lazertag-biznes/vnearenniy-buisness" >
            <a>
              <li>
                Внеаренный бизнес
    </li>
            </a>
          </Link >
          <Link href="/lazertag-biznes/shock-fight/">
            <a>
              <li>
                Шок-файт бизнес
            </li>
            </a>
          </Link >
          <Link href="/lazertag-biznes/mobilniy-lasertag-business/">
            <a>
              <li>
                Мобильный бизнес
          </li>
            </a>
          </Link >
          <Link href="/lazertag-biznes/otkroy-lasertag-arenu/">
            <a>
              <li>
                Разработка лазертаг-арен
        </li>
            </a>
          </Link >
        </ul >
        <ul>
          <Link href="/o-nas/">
            <a>
              <li className={style.general}>
                О нас
              </li>
            </a>
          </Link>
          <Link href="/o-nas/otzyvy/">
  <a>
            <li>
Отзывы
            </li>
          </a>
          </Link >
        <Link href="/o-nas/lazertag-klubu-rossii">
  <a>
          <li>
Карта лазертаг-клубов
            
          </li>
        </a>
          </Link >
      <Link href="/o-nas/goszakazchikam/">
      <a>
        <li>
Госзакупки
        </li>
      </a>
          </Link >
        </ul >
        <ul>
          <Link href="/stati">
            <a>
              <li className={style.general}>
Новости
              </li>
            </a>
          </Link>
          <Link href="/support-forpost/contacts">
  <a>
    <li className={style.general}>
Поддержка
    </li>
  </a>
          </Link >
  <Link href="/o-nas/kontakty/">
  <a>
    <li className={style.general}>
Контакты
    </li>
  </a>
          </Link >
        </ul >
      </div >
    </div >
  );
}
function Developing(props) {
  return (
    <p className={style.developing}>
В разработке
    </p>
  )
}