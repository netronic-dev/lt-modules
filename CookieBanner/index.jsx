// import "client-only";

// import style from "./style.module.scss";
// import { getLocalStorage, setLocalStorage } from "./storageHelper";
// import { useState, useEffect, useLayoutEffect } from "react";

// export default function CookieBanner(props) {
//     const [cookieConsent, setCookieConsent] = useState(null);

//     useLayoutEffect(() => {
//         const storedCookieConsent = getLocalStorage("cookie_consent", null);

//         setCookieConsent(storedCookieConsent);
//     }, [setCookieConsent]);

// // useEffect(() => {
// //   if (typeof window.gtag === "function") {
// //     const newValue = cookieConsent ? "granted" : "denied";

// //     window.gtag("consent", "update", {
// //       analytics_storage: newValue,
// //       ad_storage: newValue,
// //     });

// //     setLocalStorage("cookie_consent", cookieConsent);
// //   } else {
// //     console.warn("Google Analytics is not loaded yet.");
// //   }
//     // }, [cookieConsent]);

// useEffect(() => {
//   if (typeof window.gtag === "function") {
//     const newValue = cookieConsent ? "granted" : "denied";

//     // Оновлюємо згоду для Google
//     window.gtag("consent", "update", {
//       analytics_storage: newValue,
//       ad_storage: newValue,
//     });

//     // --- ВИПРАВЛЕНО ДЛЯ COOKIEHUB ---
//     // Перевіряємо об'єкт у нижньому регістрі
//     if (
//       typeof window.cookiehub !== "undefined" &&
//       typeof window.cookiehub.changeConsent === "function"
//     ) {
//       window.cookiehub.changeConsent(cookieConsent ? "allow" : "deny");
//     } else {
//       console.warn("CookieHub is not loaded yet.");
//     }
//     // --------------------------------

//     setLocalStorage("cookie_consent", cookieConsent);
//   }
// }, [cookieConsent]);

//     return cookieConsent === null ? (
//         <div className={style.banner}>
//             <div className={style.container}>
//                 <div className={style.content}>
//                     <h3 className={style.banner_title}>{props.title}</h3>
//                     <p className={style.banner_text}>{props.text}</p>
//                 </div>
//                 <div className={style.buttons_block}>
//                     <button
//                         className={style.allow_button}
//                         onClick={() => {
//                             setCookieConsent(true);
//                             window.location.reload();
//                         }}
//                     >
//                         {props.allow_btn_text}
//                     </button>
//                     <button
//                         className={style.decline_button}
//                         onClick={() => setCookieConsent(false)}
//                     >
//                         {props.decline_btn_text}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     ) : null;
// }

import "client-only";

import style from "./style.module.scss";
import { getLocalStorage, setLocalStorage } from "./storageHelper";
import { useState, useEffect, useLayoutEffect } from "react";

export default function CookieBanner(props) {
  const [cookieConsent, setCookieConsent] = useState(null);

  useLayoutEffect(() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null);
    setCookieConsent(storedCookieConsent);
  }, []);

useEffect(() => {
  if (cookieConsent === null) return;

  const newValue = cookieConsent ? "granted" : "denied";

  // 1. Оновлюємо згоду для Google Consent Mode
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: newValue,
      ad_storage: newValue,
    });
  }

  // 2. Оновлюємо згоду в CookieHub з перевіркою isReady()
  const updateCookieHub = () => {
    if (
      typeof window.cookiehub !== "undefined" &&
      typeof window.cookiehub.changeConsent === "function"
    ) {
      // ПЕРЕВІРКА НА ГОТОВНІСТЬ API
      if (
        typeof window.cookiehub.isReady === "function" &&
        window.cookiehub.isReady()
      ) {
        window.cookiehub.changeConsent(cookieConsent ? "allow" : "deny");
      } else {
        // Якщо не готовий, чекаємо трохи і пробуємо знову
        setTimeout(updateCookieHub, 100);
      }
    } else {
      console.warn("CookieHub API not available yet.");
    }
  };

  updateCookieHub();

  // 3. Зберігаємо вибір користувача
  setLocalStorage("cookie_consent", cookieConsent);
}, [cookieConsent]);

  // Якщо користувач вже зробив вибір, не показуємо банер
  if (cookieConsent !== null) return null;

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
            onClick={() => {
              setCookieConsent(true);
              // window.location.reload(); // <--- Спробуйте прибрати це
            }}
          >
            {props.allow_btn_text}
          </button>
          <button
            className={style.decline_button}
            onClick={() => setCookieConsent(false)}
          >
            {props.decline_btn_text}
          </button>
        </div>
      </div>
    </div>
  );
}