import { useGAEvents } from "../../../context/GAEventsProvider";
import style from "./style.module.scss";
import Link from "next/link";

export function Contacts(props) {
  const GAEvents = useGAEvents();

  return (
    <div className={style.container}>
      <div className={style.contacts}>
        {props.data.map((item, index) => (
          <div className={style.cell} key={index}>
            <h3 className={style.title}>{item.title}</h3>
            {item.contacts.map((item, index) => (
              <div className={style.contact_block} key={index}>
                <span className={style.contact__title}>{item.title}</span>
                {renderContact(
                  item.title,
                  item.value,
                  item.whatsAppLink,
                  item.europe
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const renderContact = (title, value, whatsapp, europe) => {
  if (title === "Email") {
    return (
      <span className={style.contact__text}>
        <Link href={`mailto:${value}`}>{value}</Link>
      </span>
    );
  } else if (title === "Phone") {
    return (
      <PhoneWithLinks
        title={title}
        phone_number={value}
        whatsapp={whatsapp}
        europe={europe}
      />
    );
  } else {
    return <span className={style.contact__text}>{value}</span>;
  }
};

function formatPhoneNumber(number) {
  let newNum = number
    .replace(/[^\d]+/g, "")
    .replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, "+$1-$2-$3-$4");
  return newNum;
}

function formatPhoneNumberEurope(number) {
  let newNum = number
    .replace(/[^\d]+/g, "")
    .replace(/(\d{3})(\d{4})(\d{4})/, "+$1-$2-$3");
  return newNum;
}

function PhoneWithLinks(props) {
  return (
    <div className={style.links_union}>
      {props.phone_number ? (
        <p className={style.phone_link}>
          <Link target="_blank" href={`tel:${props.phone_number}`}>
            {props.europe
              ? formatPhoneNumberEurope(props.phone_number)
              : formatPhoneNumber(props.phone_number)}
          </Link>
        </p>
      ) : null}
      {props.whatsapp ? (
        <a
          className={style.icon_link}
          target="_blank"
          href={props.whatsapp}
          aria-label="Whatsapp icon"
        >
          {whatsAppIcon}
        </a>
      ) : (
        ""
      )}
    </div>
  );
}
const whatsAppIcon = (
  <svg
    className={style.whatsapp}
    width="23"
    height="22"
    viewBox="0 0 23 22"
    fill="none"
  >
    <path
      d="M22.9941 10.7067C22.9941 16.6222 18.1541 21.4133 12.1897 21.4133C10.3075 21.4133 8.52303 20.9244 6.95858 20.0689L0.994141 22L2.9497 16.2556C1.97192 14.6422 1.4097 12.7356 1.4097 10.7311C1.38525 4.79111 6.22525 0 12.1897 0C18.1541 0 22.9941 4.79111 22.9941 10.7067ZM12.1897 1.71111C7.17859 1.71111 3.12081 5.74444 3.12081 10.7067C3.12081 12.6867 3.75636 14.4956 4.85636 15.9867L3.73192 19.3356L7.22747 18.2356C8.6697 19.1889 10.3808 19.7267 12.2141 19.7267C17.2008 19.7267 21.283 15.6933 21.283 10.7067C21.283 5.72 17.2008 1.71111 12.1897 1.71111ZM17.6408 13.1756C17.5675 13.0778 17.3964 13.0044 17.1275 12.8578C16.8586 12.7356 15.563 12.1 15.3186 12.0022C15.0741 11.9044 14.903 11.88 14.7319 12.1244C14.5608 12.3933 14.0475 12.98 13.9008 13.1511C13.7541 13.3222 13.583 13.3467 13.3386 13.2244C13.0697 13.1022 12.2141 12.8089 11.2119 11.9289C10.4297 11.2444 9.89192 10.3644 9.74525 10.12C9.59859 9.85111 9.72081 9.70444 9.86747 9.58222C9.9897 9.46 10.1364 9.26444 10.2586 9.11778C10.3808 8.97111 10.4297 8.84889 10.5275 8.67778C10.6253 8.50667 10.5764 8.36 10.503 8.21333C10.4297 8.09111 9.91636 6.79556 9.69636 6.25778C9.47636 5.74444 9.25636 5.81778 9.1097 5.81778C8.96303 5.81778 8.76747 5.79333 8.59636 5.79333C8.42525 5.79333 8.13192 5.86667 7.88747 6.11111C7.64303 6.38 6.95858 7.01556 6.95858 8.31111C6.95858 9.60667 7.91192 10.8533 8.03414 11.0244C8.15636 11.1956 9.86747 13.9333 12.5564 14.9844C15.2453 16.0356 15.2453 15.6933 15.7341 15.6444C16.223 15.5956 17.2986 15.0089 17.5186 14.3978C17.7141 13.8111 17.7141 13.2978 17.6408 13.1756Z"
      fill="white"
    />
  </svg>
);
