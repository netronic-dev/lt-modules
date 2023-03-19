import Image from 'next/image';
import style from './style.module.scss';
import bannerLogo from '../../public/event/lasertag-convention.png';
import Link from 'next/link';

const Banner = (props) => {
    return (
        <div className={`${style.banner} fade-down-animation`}>
            {/* <div className={style.banner_logo}>
                <Image src={bannerLogo} width='379' height={134} alt='logo' />
            </div>
            <EventInfo
                dateName={props.dateName}
                date={props.date}
                placeName={props.placeName}
                place={props.place}
            /> */}
            <div className={style.logo_event_info_mob}>
                <div className={style.banner_logo}>
                    <Image
                        src={bannerLogo}
                        width='379'
                        height={134}
                        alt='logo'
                    />
                </div>
                <EventInfo
                    dateName={props.dateName}
                    date={props.date}
                    placeName={props.placeName}
                    place={props.place}
                />
            </div>
            <div className={style.descr_row}>
                <div className={style.button_submit_wrap}>
                    <Link href='/laser-tag-convention-2023#utm_source=site&utm_medium=banner%2Fpop-up&utm_campaign=exhibition_las_vegas_2023'>
                        <button
                            type='submit'
                            className={style.button_submit}
                            onClick={() => props.toggleActivity()}
                        >
                            {props.buttonText}
                        </button>
                    </Link>
                </div>
                <div className={style.text_wrap}>
                    <p className={style.text}>{props.text}</p>
                </div>
            </div>
            <div className={style.button_submit_wrap_mob}>
                <Link href='/laser-tag-convention-2023#utm_source=site&utm_medium=banner%2Fpop-up&utm_campaign=exhibition_las_vegas_2023'>
                    <button
                        type='submit'
                        className={style.button_submit}
                        onClick={() => props.toggleActivity()}
                    >
                        {props.buttonText}
                    </button>
                </Link>
            </div>
            <div className={style.text_wrap_mob}>
                <p className={style.text}>{props.text}</p>
            </div>
            <button
                className={style.button_close}
                onClick={() => props.toggleActivity()}
            >
                {closeBtn}
            </button>
            <button
                className={style.button_close_mob}
                onClick={() => props.toggleActivity()}
            >
                {closeBtnMob}
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
                        {calendarIcon}
                    </div>
                    <div className={style.event_info__place_icon_outer_mob}>
                        {calendarIconMob}
                    </div>
                    <div
                        className={`${style.event_info__title} ${style.event_info__title_date}`}
                    >
                        {props.dateName}
                    </div>
                </div>
                <div className={style.event_info__text}>{props.date}</div>
            </div>
            <div className={style.event_info_cell}>
                <div className={style.event_info__top}>
                    <div className={style.event_info__place_icon_outer}>
                        {placeIcon}
                    </div>
                    <div className={style.event_info__place_icon_outer_mob}>
                        {placeIconMob}
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
        width='30'
        height='27'
        viewBox='0 0 30 27'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <g clipPath='url(#clip0_223_55)'>
            <path
                d='M8.73315 12.3H11.1832V14.5167H8.73315V12.3ZM25.8832 6.75836V22.2751C25.8832 23.4942 24.7807 24.4918 23.4332 24.4918H6.28314C4.92338 24.4918 3.83313 23.4942 3.83313 22.2751L3.84538 6.75836C3.84538 5.53919 4.92338 4.54169 6.28314 4.54169H7.50814V2.32501H9.95815V4.54169H19.7582V2.32501H22.2082V4.54169H23.4332C24.7807 4.54169 25.8832 5.53919 25.8832 6.75836ZM6.28314 8.97503H23.4332V6.75836H6.28314V8.97503ZM23.4332 22.2751V11.1917H6.28314V22.2751H23.4332ZM18.5332 14.5167H20.9832V12.3H18.5332V14.5167ZM13.6332 14.5167H16.0832V12.3H13.6332V14.5167Z'
                fill='white'
            />
        </g>
        <defs>
            <clipPath id='clip0_223_55'>
                <rect
                    width='29.4001'
                    height='26.6001'
                    fill='white'
                    transform='translate(0.158112 0.108337)'
                />
            </clipPath>
        </defs>
    </svg>
);

const calendarIconMob = (
    <svg
        width='18'
        height='17'
        viewBox='0 0 18 17'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M5.25 7.57272H6.75V8.92986H5.25V7.57272ZM15.75 4.17986V13.6799C15.75 14.4263 15.075 15.037 14.25 15.037H3.75C2.9175 15.037 2.25 14.4263 2.25 13.6799L2.2575 4.17986C2.2575 3.43343 2.9175 2.82272 3.75 2.82272H4.5V1.46558H6V2.82272H12V1.46558H13.5V2.82272H14.25C15.075 2.82272 15.75 3.43343 15.75 4.17986ZM3.75 5.537H14.25V4.17986H3.75V5.537ZM14.25 13.6799V6.89415H3.75V13.6799H14.25ZM11.25 8.92986H12.75V7.57272H11.25V8.92986ZM8.25 8.92986H9.75V7.57272H8.25V8.92986Z'
            fill='white'
        />
    </svg>
);

const placeIcon = (
    <svg
        width='30'
        height='28'
        viewBox='0 0 30 28'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <g clipPath='url(#clip0_223_61)'>
            <path
                d='M14.7001 3.20374C9.95929 3.20374 6.12503 6.67283 6.12503 10.9621C6.12503 16.7809 14.7001 25.3705 14.7001 25.3705C14.7001 25.3705 23.2751 16.7809 23.2751 10.9621C23.2751 6.67283 19.4408 3.20374 14.7001 3.20374ZM8.57504 10.9621C8.57504 7.90308 11.319 5.42041 14.7001 5.42041C18.0811 5.42041 20.8251 7.90308 20.8251 10.9621C20.8251 14.1541 17.2971 18.931 14.7001 21.9125C12.1521 18.9532 8.57504 14.1209 8.57504 10.9621Z'
                fill='white'
            />
            <path
                d='M14.7001 13.7329C16.3914 13.7329 17.7626 12.4924 17.7626 10.9621C17.7626 9.43177 16.3914 8.19122 14.7001 8.19122C13.0087 8.19122 11.6375 9.43177 11.6375 10.9621C11.6375 12.4924 13.0087 13.7329 14.7001 13.7329Z'
                fill='white'
            />
        </g>
        <defs>
            <clipPath id='clip0_223_61'>
                <rect
                    width='29.4001'
                    height='26.6001'
                    fill='white'
                    transform='translate(0 0.987061)'
                />
            </clipPath>
        </defs>
    </svg>
);

const placeIconMob = (
    <svg
        width='18'
        height='17'
        viewBox='0 0 18 17'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M9 1.35718C6.0975 1.35718 3.75 3.48111 3.75 6.10718C3.75 9.66968 9 14.9286 9 14.9286C9 14.9286 14.25 9.66968 14.25 6.10718C14.25 3.48111 11.9025 1.35718 9 1.35718ZM5.25 6.10718C5.25 4.23432 6.93 2.71432 9 2.71432C11.07 2.71432 12.75 4.23432 12.75 6.10718C12.75 8.06146 10.59 10.9861 9 12.8115C7.44 10.9997 5.25 8.04111 5.25 6.10718Z'
            fill='white'
        />
        <path
            d='M9 7.80362C10.0355 7.80362 10.875 7.04411 10.875 6.1072C10.875 5.17028 10.0355 4.41077 9 4.41077C7.96447 4.41077 7.125 5.17028 7.125 6.1072C7.125 7.04411 7.96447 7.80362 9 7.80362Z'
            fill='white'
        />
    </svg>
);

const closeBtn = (
    <svg
        width='40'
        height='40'
        viewBox='0 0 40 40'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <circle cx='20' cy='20' r='20' fill='white' />
        <circle
            cx='20'
            cy='20'
            r='19'
            stroke='white'
            strokeOpacity='0.4'
            strokeWidth='2'
        />
        <path
            d='M25 15L14 26'
            stroke='#8E8E8E'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
        <path
            d='M14 15L25 26'
            stroke='#8E8E8E'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
);

const closeBtnMob = (
    <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <circle cx='10' cy='10' r='10' fill='white' />
        <circle cx='10' cy='10' r='9.5' stroke='#8E8E8E' strokeOpacity='0.4' />
        <path
            d='M12.5 7.5L7 13'
            stroke='#8E8E8E'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
        <path
            d='M7 7.5L12.5 13'
            stroke='#8E8E8E'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
);
