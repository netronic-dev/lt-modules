import "client-only";

import style from "./style.module.scss";
import { getLocalStorage, setLocalStorage } from "./storageHelper";
import { useState, useEffect } from "react";

export default function CookieBanner(props) {
    const [cookieConsent, setCookieConsent] = useState(null);

    useEffect(() => {
        const storedCookieConsent = getLocalStorage("cookie_consent", null);

        setCookieConsent(storedCookieConsent);
    }, [setCookieConsent]);

    useEffect(() => {
        const newValue = cookieConsent ? "granted" : "denied";

        window.gtag("consent", "update", {
            analytics_storage: newValue,
            ad_storage: newValue,
        });

        setLocalStorage("cookie_consent", cookieConsent);
    }, [cookieConsent]);

    return cookieConsent === null ? (
        <div className={style.banner}>
            <div className={style.container}>
                <div className={style.content}>
                    <h3 className={style.banner_title}>{props.title}</h3>
                    <p className={style.banner_text}>{props.text}</p>
                </div>
                <div className={style.buttons_block}>
                    <button
                        className={style.button}
                        onClick={() => setCookieConsent(false)}
                    >
                        {props.decline_btn_text}
                    </button>
                    <button
                        className={style.button}
                        onClick={() => {
                            setCookieConsent(true);
                            window.location.reload();
                        }}
                    >
                        {props.allow_btn_text}
                    </button>
                </div>
            </div>
        </div>
    ) : null;
}
