import Image from 'next/image';
import style from './style.module.scss';
import { FunctionComponent, ReactNode } from 'react';

interface MainProps {
    title: ReactNode | string;
    image: string;
    imageResponsive: string;
    eventLogo: string;
    buttonText: string;
    objectPosition: string;
    resObjectPosition: string;
    timeName?: string;
    time?: ReactNode | string;
    dateName: string;
    date: ReactNode | string;
    placeName: string;
    place: ReactNode | string;
    text?: ReactNode | string;
    onClick: () => void;
}

const Main: FunctionComponent<MainProps> = (props) => {
    return (
        <section className={style.main}>
            <div className={style.wrapper}>
                <div className={style.event_logo}>
                    <Image
                        src={props.eventLogo}
                        layout='fill'
                        width={108}
                        height={52}
                    />
                </div>
                <h1 className={style.title}>{props.title || ''}</h1>

                <EventInfo
                    dateName={props.dateName}
                    date={props.date}
                    placeName={props.placeName}
                    place={props.place}
                />
                <div className={style.button_outer}>
                    <button className={style.button} onClick={props.onClick}>
                        {props.buttonText}
                    </button>
                </div>
            </div>
            <div className={style.background}>
                <Image
                    src={props.image}
                    layout='fill'
                    objectFit='contain'
                    objectPosition={props.objectPosition}
                />
            </div>
            <div className={style.image_responsive}>
                <Image
                    src={props.imageResponsive}
                    layout='fill'
                    objectFit='cover'
                    objectPosition={props.resObjectPosition}
                />
            </div>
        </section>
    );
};

export default Main;

interface EventInfoProps {
    timeName?: string;
    time?: ReactNode | string;
    dateName: string;
    date: ReactNode | string;
    placeName: string;
    place: ReactNode | string;
}

function EventInfo(props: EventInfoProps) {
    return (
        <div className={style.event_info}>
            <div className={style.event_info_cell}>
                <div className={style.event_info__top}>
                    <div className={style.event_info__date_icon_outer}>
                        {dateIcon}
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

const placeIcon = (
    <svg width='25' height='25' viewBox='0 0 25 25' fill='none'>
        <path
            d='M12.2383 2.5C8.36828 2.5 5.23828 5.63 5.23828 9.5C5.23828 14.75 12.2383 22.5 12.2383 22.5C12.2383 22.5 19.2383 14.75 19.2383 9.5C19.2383 5.63 16.1083 2.5 12.2383 2.5ZM7.23828 9.5C7.23828 6.74 9.47828 4.5 12.2383 4.5C14.9983 4.5 17.2383 6.74 17.2383 9.5C17.2383 12.38 14.3583 16.69 12.2383 19.38C10.1583 16.71 7.23828 12.35 7.23828 9.5Z'
            fill='#8E8E8E'
        />
        <path
            d='M12.2383 12C13.619 12 14.7383 10.8807 14.7383 9.5C14.7383 8.11929 13.619 7 12.2383 7C10.8576 7 9.73828 8.11929 9.73828 9.5C9.73828 10.8807 10.8576 12 12.2383 12Z'
            fill='#8E8E8E'
        />
    </svg>
);
const dateIcon = (
    <svg
        width='25'
        height='20'
        viewBox='0 0 18 20'
        fill='none'
        className={style.date_icon}
    >
        <path
            d='M4 9H6V11H4V9ZM18 4V18C18 19.1 17.1 20 16 20H2C0.89 20 0 19.1 0 18L0.00999999 4C0.00999999 2.9 0.89 2 2 2H3V0H5V2H13V0H15V2H16C17.1 2 18 2.9 18 4ZM2 6H16V4H2V6ZM16 18V8H2V18H16ZM12 11H14V9H12V11ZM8 11H10V9H8V11Z'
            fill='#8E8E8E'
        />
    </svg>
);
