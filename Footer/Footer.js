import Contacts, { ContactsEn } from "./Contacts/Contacts";
import FooterMenu from "./FooterMenu/FooterMenu";
import FooterSocial from "./FooterSocial/FooterSocial";
import style from "./footer.module.scss";
import FooterMobile from "./FooterMobile/FooterMobile";
import { PriceButton } from "../Buttons/Buttons";
import FooterMenuEn from "./FooterMenu/FooterMenuEn";

export default function Footer(props) {
  return (
    <div className={style.footer}>
      <div className={style.footer_desktop}>
        {props.en ?
          (<FooterMenuEn />)
          :
          (<FooterMenu />)}
      </div>
      <div className={style.footer_mobile}>
        <FooterMobile
          data={props.data}
        />
      </div>
      {props.en ?
        (<ContactsEn />) :
        (<Contacts />)}
      <FooterSocial
        en={props.en}
      />
    </div>
  );
}

export function FooterLP() {
  return (
    <div id="contacts" name="contacts" className={style.footer_lp}>
      <div className={style.lp_mode}>
        <div className={style.buttons}>
          <div className={style.buttons_button}>
            <PriceButton
              uniqueClass="footer_catalog"
              text="Скачать каталог"
              style="blueWhite"
              catalogLP={true}
            />
          </div>
          <div className={style.buttons_button}>
            <PriceButton
              uniqueClass="footer_call"
              text="Заказать звонок"
              style="white"
              callLP={true}
            />
          </div>
        </div>
        <div className={style.contacts}>
          <Contacts />
        </div>
      </div>
      <FooterSocial lp={true} />
    </div>
  );
}
