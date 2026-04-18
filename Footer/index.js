import Link from "next/link";
import { InView } from "react-intersection-observer";
import { Contacts } from "./Contacts";
import FooterSocial from "./Social";
import style from "./footer.module.scss";
import FooterMobile from "./Mobile";
import FooterMenu from "./Menu";
import { useGAEvents } from "../../context/GAEventsProvider";

export default function Footer(props) {
  const GAEvents = useGAEvents();

  function sectionWasInView(sectionName) {
    GAEvents.sectionWasInView(sectionName);
  }

  return (
    <div className={style.footer}>
      <div className={style.footer_inside}>
        <div className={style.footer_inside_container}>
          <div className={style.footer_inside_block_top}>
            <InView
              as="div"
              onChange={(inView, entry) =>
                inView && sectionWasInView("Footer social-media")
              }
            >
              <FooterSocial
                text={props.social_text}
                facebook={props.facebook}
                instagram={props.instagram}
                youtube={props.youtube}
                linkedin={props.linkedin}
                tikTok={props.tikTok}
                logo={props.logo}
                onEmailIconCLick={props.onEmailIconCLick}
              />
            </InView>
            <InView
              as="div"
              onChange={(inView, entry) =>
                inView && sectionWasInView("Footer Contacts")
              }
            >
              <Contacts data={props.contactsData} />
            </InView>
          </div>

          <InView
            as="div"
            onChange={(inView, entry) =>
              inView && sectionWasInView("Footer Menu")
            }
          >
            <div className={style.footer_desktop}>
              <FooterMenu data={props.data} />
            </div>
            <div className={style.footer_mobile}>
              <FooterMobile data={props.dataResponsive} />
            </div>
          </InView>
        </div>
        <p className={style.footer_copyright_text}>
          <Link href="/privacy-policy">
            <a
              onClick={() =>
                GAEvents.buttonClick("Footer", "Link click", "/privacy-policy")
              }
            >
              Privacy Policy |
            </a>
          </Link>{" "}
          Copyright © {new Date().getFullYear()} All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
