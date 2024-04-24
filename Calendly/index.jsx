import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import ReactGA from "react-ga4";
import { postData } from "../functions/postData";
import { useCalendlyEventListener } from "react-calendly";
import ReactPixel from "react-facebook-pixel";
import style from "./style.module.scss";
import { addUserData } from "../../store/userSlice";
import { searchParams } from "../../store/searchParamsSlice";

const Calendly = (props) => {
    const [eventData, setEventData] = useState(null);
    const router = useRouter();
    const dispatch = useDispatch();
    const queryParams = useSelector(searchParams);

    useCalendlyEventListener({
        onEventScheduled: (e) => {
            e.data.payload ? setEventData(e.data.payload) : null;
        },
    });

    const ClientID = "zwS7Dl8yo4TRvwEKRYhr3iot9BgC-ErZYwL6n-oW-a8";
    const ClientSecret = "laU5if5m0GErA-ryFW72AhIh0slLFmKrP2TDu4JsZug";

    useEffect(() => {
        props.setIsCalendly(true);
    }, []);

    useEffect(() => {
        const obj = {
            ClientID,
            ClientSecret,
            ...eventData,
        };
        eventData &&
            fetch("https://api.netronic.net/calendly", {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    dispatch(addUserData(data.name));
                    postData(
                        data,
                        "https://dev.lasertag.net/forms",
                        `Call  order | LT NET (Call ${data.time})`,
                        props.lang,
                        window.location.href,
                        queryParams || router.query
                    )
                        .then(
                            ReactGA.event("generate_lead", {
                                category: "form",
                                action: "submit",
                            })
                        )
                        .then(ReactPixel.track("Lead"))
                        .then(router.push("/thanks-call"))
                        .catch((error) => console.log(error));
                })
                .catch((error) => console.log(error));
    }, [eventData]);
    return (
        <li
            className={`${style.phone_icon} ${style.nav__item}`}
            onClick={() => props.setState(true)}
        >
            {phoneIcon}
        </li>
    );
};

export default Calendly;

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
