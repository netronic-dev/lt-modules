import { Contacts } from "./Contacts";
import FooterSocial from "./Social";
import style from "./footer.module.scss";
import FooterMobile from "./Mobile";
import FooterMenu from "./Menu";

export default function Footer(props) {
  return (
    <div className={style.footer}>
      <div className={style.footer_desktop}>
        (<FooterMenu />)
      </div>
      <div className={style.footer_mobile}>
        <FooterMobile
          data={props.data}
        />
      </div>
      (<Contacts />)
      <FooterSocial
        facebook={props.facebook}
        instagram={props.instagram}
        youtube={props.youtube}
        logo={props.logo}
      />
    </div>
  );
}
