import { Contacts } from './Contacts';
import FooterSocial from './Social';
import style from './footer.module.scss';
import FooterMobile from './Mobile';
import FooterMenu from './Menu';
import { InView } from 'react-intersection-observer';
import { useGAEvents } from '../../context/GAEventsProvider';

export default function Footer(props) {
    const GAEvents = useGAEvents();

    function sectionWasInView(sectionName) {
        GAEvents.sectionWasInView(sectionName);
    }

    return (
        <div className={style.footer}>
            <InView
                as='div'
                onChange={(inView, entry) =>
                    inView && sectionWasInView('Footer Menu')
                }
            >
                <div className={style.footer_desktop}>
                    (<FooterMenu data={props.data} />)
                </div>
                <div className={style.footer_mobile}>
                    <FooterMobile data={props.dataResponsive} />
                </div>
            </InView>
            <InView
                as='div'
                onChange={(inView, entry) =>
                    inView && sectionWasInView('Footer Contacts')
                }
            >
                <Contacts
                    nameOfRegion={props.nameOfRegion}
                    adressTitle={props.adressTitle}
                    emailTitle={props.emailTitle}
                    phoneTitle={props.phoneTitle}
                />
            </InView>
            <InView
                as='div'
                onChange={(inView, entry) =>
                    inView && sectionWasInView('Footer social-media')
                }
            >
                <FooterSocial
                    facebook={props.facebook}
                    instagram={props.instagram}
                    youtube={props.youtube}
                    logo={props.logo}
                />
            </InView>
        </div>
    );
}
