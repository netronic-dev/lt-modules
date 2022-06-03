import { ContactsEn } from "./Contacts";
import FooterSocial from "./Social";
import style from "./footer.module.scss";
import FooterMobile from "./Mobile";
import FooterMenuEn from "./Menu";

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
