import style from "./header.module.scss";
import Link from "next/link";
import { useModals } from "../../context/ModalsProvider";
import { useGAEvents } from "../../context/GAEventsProvider";
import { PopupModal, useCalendlyEventListener } from "react-calendly";
import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { useDispatch } from "react-redux";
import { addUserData } from "../../store/userSlice";
import { postData } from "../functions/postData";
import { useRouter } from "next/router";
import Calendly from "../Calendly";

export default function Header(props) {
    const [isOpen, setState] = useState(false);
    const [isCalendly, setIsCalendly] = useState(false);
    const dispatch = useDispatch();
    const modals = useModals();
    const GAEvents = useGAEvents();
    const router = useRouter();

    function onGAEventSend(link) {
        GAEvents.buttonClick("Header", "link click", link);
    }

    return (
        <div className={`${style.header} header`}>
            <div className={`active`}></div>
            <nav className={style.header_inside}>
                <ul
                    className={style.menu}
                    style={{
                        gridTemplateColumns: `repeat(${
                            props.data.length + 2
                        }, 1fr)`,
                    }}
                >
                    <li className={style.header__logo_net}>
                        <Link href="/">
                            <a onClick={() => onGAEventSend("/")}>
                                <img src={props.logo} alt="logo" />
                            </a>
                        </Link>
                    </li>
                    {props.data.map((item, index) =>
                        item.items ? (
                            <HeaderHoverItem
                                key={index}
                                text={item.name}
                                link={item.link}
                                data={item.items}
                                onLinkClick={(link) => onGAEventSend(link)}
                            />
                        ) : (
                            <HeaderSingleItemMain
                                key={index}
                                text={item.name}
                                link={item.link}
                                onLinkClick={(link) => onGAEventSend(link)}
                            />
                        )
                    )}
                    {/* <li
              className={`${style.phone_icon} ${style.nav__item}`}
              onClick={() => setState(true)}
            // onClick={modals.NamePhoneModalChangeVisibility}
            >
              {phoneIcon}
            </li> */}
                    <Calendly
                        setIsCalendly={setIsCalendly}
                        setState={setState}
                    />
                </ul>
            </nav>
            {isCalendly && (
                <PopupModal
                    url="https://calendly.com/lasertag_net/30min"
                    pageSettings={props.pageSettings}
                    utm={props.utm}
                    prefill={props.prefill}
                    onModalClose={() => setState(false)}
                    open={isOpen}
                    rootElement={document.getElementById("__next")}
                />
            )}
        </div>
    );
}

const phoneIcon = (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle
            className={style.phone_icon__circle}
            cx="13"
            cy="13"
            r="13"
            fill="white"
        />
        <path
            d="M19.0075 15.535C18.085 15.535 17.1925 15.385 16.36 15.115C16.0975 15.025 15.805 15.0925 15.6025 15.295L14.425 16.7725C12.3025 15.76 10.315 13.8475 9.2575 11.65L10.72 10.405C10.9225 10.195 10.9825 9.9025 10.9 9.64C10.6225 8.8075 10.48 7.915 10.48 6.9925C10.48 6.5875 10.1425 6.25 9.7375 6.25H7.1425C6.7375 6.25 6.25 6.43 6.25 6.9925C6.25 13.96 12.0475 19.75 19.0075 19.75C19.54 19.75 19.75 19.2775 19.75 18.865V16.2775C19.75 15.8725 19.4125 15.535 19.0075 15.535Z"
            fill="#070707"
        />
    </svg>
);

function HeaderSingleItem(props) {
    return (
        <li className={style.nav__item}>
            <Link href={props.link}>
                <a
                    className={style.nav__item_a}
                    target={props.blank ? "_blank" : ""}
                    onClick={props.onLinkClick}
                >
                    {props.text}
                </a>
            </Link>
        </li>
    );
}

function HeaderHoverItem(props) {
    return (
        <li className={`${style.drop} ${style.nav__item_main}`}>
            {props.link ? (
                <Link href={props.link}>
                    <a
                        className={style.nav__item_main_a}
                        onClick={() => props.onLinkClick(props.link)}
                    >
                        {props.text}
                    </a>
                </Link>
            ) : (
                <> {props.text}</>
            )}
            <ul className={style.dropmenu}>
                {props.data.map((item, index) => (
                    <HeaderSingleItem
                        key={index}
                        text={item.name}
                        link={item.link}
                        linkA={item.linkA}
                        developing={item.developing}
                        onLinkClick={() => props.onLinkClick(item.link)}
                    />
                ))}
            </ul>
        </li>
    );
}

function HeaderSingleItemMain(props) {
    return (
        <li className={style.nav__item_main}>
            <Link href={props.link}>
                <a
                    className={style.nav__item_main_a}
                    target={props.blank ? "_blank" : ""}
                    onClick={() => props.onLinkClick(props.link)}
                >
                    {props.text}
                </a>
            </Link>
        </li>
    );
}
