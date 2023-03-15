import Image from 'next/image';
import style from './style.module.scss';
import bannerLogo from '../../public/event/lasertag-convention.png';
import Link from 'next/link';

const Banner = (props) => {
    return (
        <div className={`${style.banner} fade-down-animation`}>
            <div className={style.banner_logo}>
                <Image src={bannerLogo} width='379' height={134} alt='logo' />
            </div>
            <EventInfo
                dateName={props.dateName}
                date={props.date}
                placeName={props.placeName}
                place={props.place}
            />
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
                        {calendarIcon}
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
                        {placeIcon}
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

const closeBtn = (
    <svg
        width='65'
        height='65'
        viewBox='0 0 65 65'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <g clipPath='url(#clip0_223_70)'>
            <path
                d='M45.5346 45.5347C52.9311 38.1382 52.9311 26.1461 45.5346 18.7496C38.1381 11.3531 26.146 11.3531 18.7495 18.7496C11.353 26.1461 11.353 38.1382 18.7495 45.5347C26.146 52.9312 38.1381 52.9312 45.5346 45.5347Z'
                fill='white'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M26.7851 26.7852L37.4991 37.4992'
                stroke='#8E8E8E'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M26.7851 37.4991L37.4991 26.7851'
                stroke='#8E8E8E'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </g>
        <defs>
            <clipPath id='clip0_223_70'>
                <rect
                    width='45.4558'
                    height='45.4558'
                    fill='white'
                    transform='translate(0 32.1422) rotate(-45)'
                />
            </clipPath>
        </defs>
    </svg>
);
