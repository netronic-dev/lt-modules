import "client-only";

import style from "./style.module.scss";
import { getLocalStorage, setLocalStorage } from "./storageHelper";
import { useState, useLayoutEffect } from "react";

export default function CookieBanner(props) {
  const [cookieConsent, setCookieConsent] = useState(null);

  useLayoutEffect(() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null);
    setCookieConsent(storedCookieConsent);
  }, []);

  const updateConsent = (isGranted) => {
    const newValue = isGranted ? "granted" : "denied";

    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }

      gtag("consent", "update", {
        analytics_storage: newValue,
        ad_storage: newValue,
        ad_user_data: newValue,
        ad_personalization: newValue,
      });

      window.dataLayer.push({
        event: "cookie_consent_update",
        cookie_consent_status: newValue,
      });
    }

    setLocalStorage("cookie_consent", isGranted);
    setCookieConsent(isGranted);
  };

  if (cookieConsent !== null) {
    return null;
  }

  return (
    <div className={style.banner}>
      <div className={style.container}>
        <div className={style.content}>
          <h3 className={style.banner_title}>{props.title}</h3>
          <p className={style.banner_text}>{props.text}</p>
        </div>
        <div className={style.buttons_block}>
          <button
            className={style.allow_button}
            onClick={() => updateConsent(true)}
          >
            {props.allow_btn_text}
          </button>
          <button
            className={style.decline_button}
            onClick={() => updateConsent(false)}
          >
            {props.decline_btn_text}
          </button>
        </div>
      </div>
    </div>
  );
}
