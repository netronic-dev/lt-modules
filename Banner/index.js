import Image from 'next/image';
import style from './style.module.scss';
import bannerLogo from '../../public/halloween-2023/banner_pumpkins.png';
import bannerLogoMob from '../../public/halloween-2023/banner_pumpkins_mob.png';
import Link from 'next/link';

const Banner = (props) => {
    return (
        <div className={`${style.banner} fade-down-animation`}>
            <div className={style.banner_logo}>
                <Image src={bannerLogo} alt='logo' layout='fill' objectFit='contain' />
            </div>
            <div className={style.banner_logo_mob}>
                <Image src={bannerLogoMob} alt='logo' layout='fill' objectFit='cover' />
            </div>
            <h2 className={style.title}>{props.title}</h2>
            <div className={style.content}>
                <span className={style.content__text}>{props.text}</span>
                <div className={style.content__date_wrap}>
                    <div className={style.date_block}>
                        {calendarIcon}
                        <span className={style.date__name}>{props.dateName}</span>
                    </div>
                    <span className={style.date__text}>{props.date}</span>
                </div>
                <div className={style.eclipse}></div>
            </div>
            <Link href='/halloween-2023'>
                <button
                    type='submit'
                    className={style.button_submit}
                    onClick={() => props.toggleActivity()}
                >
                    {props.buttonText}
                </button>
            </Link>
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

const calendarIcon = (
    <svg width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_44_285)">
            <path d="M8.57503 12.3H11.025V14.5167H8.57503V12.3ZM25.7251 6.7583V22.275C25.7251 23.4942 24.6226 24.4917 23.2751 24.4917H6.12503C4.76527 24.4917 3.67502 23.4942 3.67502 22.275L3.68727 6.7583C3.68727 5.53913 4.76527 4.54163 6.12503 4.54163H7.35003V2.32495H9.80004V4.54163H19.6001V2.32495H22.0501V4.54163H23.2751C24.6226 4.54163 25.7251 5.53913 25.7251 6.7583ZM6.12503 8.97497H23.2751V6.7583H6.12503V8.97497ZM23.2751 22.275V11.1916H6.12503V22.275H23.2751ZM18.3751 14.5167H20.8251V12.3H18.3751V14.5167ZM13.4751 14.5167H15.9251V12.3H13.4751V14.5167Z" fill="#0090FF" />
        </g>
        <defs>
            <clipPath id="clip0_44_285">
                <rect width="29.4001" height="26.6001" fill="white" transform="translate(0 0.108398)" />
            </clipPath>
        </defs>
    </svg>
);

const closeBtn = (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="white" />
        <path d="M26 14L15 25" stroke="#8E8E8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 14L26 25" stroke="#8E8E8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

);