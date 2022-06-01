import { ContactsEn } from "./Contacts/Contacts";
import FooterSocial from "./FooterSocial/FooterSocial";
import style from "./footer.module.scss";
import FooterMobile from "./FooterMobile/FooterMobile";
import FooterMenuEn from "./FooterMenu/FooterMenuEn";

export default function Footer(props) {
  return (
    <div className={style.footer}>
      <div className={style.footer_desktop}>
        (<FooterMenuEn />)
      </div>
      <div className={style.footer_mobile}>
        <FooterMobile
          data={props.data}
        />
      </div>
      (<ContactsEn />)
      <FooterSocial
        en={props.en}
      />
    </div>
  );
}
