import Image from 'next/image';
import style from './style.module.scss';
import bannerLogo from '../../public/iaapa-vienna-2023/logo.png';
import Link from 'next/link';

const Banner = (props) => {
    return (
        <div className={`${style.banner} fade-down-animation`}>
            <div className={style.banner_logo}>
                <Image src={bannerLogo} width='379' height={134} alt='logo' />
            </div>
            <div className={style.banner_info}>
                <EventInfo
                    dateName={props.dateName}
                    date={props.date}
                    placeName={props.placeName}
                    place={props.place}
                />
            </div>
            <Link href='https://lasertag.net/iaapa-vienna-2023?utm_source=site&utm_medium=banner&utm_campaign=iaapa+vienna+2023'>
                <button
                    type='submit'
                    className={style.button_submit}
                    onClick={() => props.toggleActivity()}
                >
                    {props.buttonText}
                </button>
            </Link>
            <p className={style.text}>{props.text}</p>

            <button
                className={style.button_close}
                onClick={() => props.toggleActivity()}
            >
                {closeBtn}
            </button>
        </div>
    );
};

export default Banner;

function EventInfo(props) {
    return (
        <div className={style.event_info}>
            <div className={style.event_info_cell}>
                <div className={style.event_info__top}>
                    <div className={style.event_info__date_icon_outer}>
                        {placeIcon}
                    </div>
                    <div className={style.event_info__title}>
                        {props.dateName}
                    </div>
                </div>
                <div className={style.event_info__text}>{props.date}</div>
            </div>
            <div className={style.event_info_cell}>
                <div className={style.event_info__top}>
                    <div className={style.event_info__place_icon_outer}>
                        {calendarIcon}
                    </div>
                    <div className={style.event_info__title}>
                        {props.placeName}
                    </div>
                </div>
                <div className={style.event_info__text}>{props.place}</div>
            </div>
        </div>
    );
}

const calendarIcon = (
    <svg
        width='24'
        height='23'
        viewBox='0 0 20 23'
        fill='none'
        className={style.icon}
    >
        <path
            d='M4.43087 10.0548H6.5545V12.2467H4.43087V10.0548ZM19.2963 4.57516V19.9183C19.2963 21.1238 18.3407 22.1102 17.1727 22.1102H2.30723C1.12861 22.1102 0.183594 21.1238 0.183594 19.9183L0.194212 4.57516C0.194212 3.36962 1.12861 2.38328 2.30723 2.38328H3.36905V0.191406H5.49268V2.38328H13.9872V0.191406H16.1109V2.38328H17.1727C18.3407 2.38328 19.2963 3.36962 19.2963 4.57516ZM2.30723 6.76703H17.1727V4.57516H2.30723V6.76703ZM17.1727 19.9183V8.95891H2.30723V19.9183H17.1727ZM12.9254 12.2467H15.049V10.0548H12.9254V12.2467ZM8.67814 12.2467H10.8018V10.0548H8.67814V12.2467Z'
            fill='#8E8E8E'
        />
    </svg>
);

const placeIcon = (
    <svg
        width='24'
        height='25'
        viewBox='0 0 24 25'
        fill='none'
        className={style.icon}
    >
        <path
            d='M12 2.89062C8.13 2.89062 5 6.02063 5 9.89062C5 15.1406 12 22.8906 12 22.8906C12 22.8906 19 15.1406 19 9.89062C19 6.02063 15.87 2.89062 12 2.89062ZM7 9.89062C7 7.13062 9.24 4.89062 12 4.89062C14.76 4.89062 17 7.13062 17 9.89062C17 12.7706 14.12 17.0806 12 19.7706C9.92 17.1006 7 12.7406 7 9.89062Z'
            fill='#8E8E8E'
        />
        <path
            d='M12 12.3906C13.3807 12.3906 14.5 11.2713 14.5 9.89062C14.5 8.50991 13.3807 7.39062 12 7.39062C10.6193 7.39062 9.5 8.50991 9.5 9.89062C9.5 11.2713 10.6193 12.3906 12 12.3906Z'
            fill='#8E8E8E'
        />
    </svg>
);

const closeBtn = (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="20" fill="white" />
        <path d="M26 14L15 25" stroke="#8E8E8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 14L26 25" stroke="#8E8E8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);