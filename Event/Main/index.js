import Image from "next/image";
import style from "./style.module.scss";
import CountDownModule from "../CountDownModule";
import { BreadCrumbs } from "../../BreadCrumbs";

export default function IAAPAMain(props) {
    return (
        <section className={style.main}>
            <div className={style.breadcrumb}>
                {props.seoExpo ? (
                    <BreadCrumbs
                        breadcrumbData={breadcrumbData}
                        color="white"
                    />
                ) : (
                    <BreadCrumbs
                        breadcrumbData={breadcrumbData}
                        color="black"
                    />
                )}
            </div>
            <div className={style.wrapper}>
                <div className={style.event_logo}>
                    <Image
                        src={props.eventLogo}
                        layout="fill"
                        objectFit="contain"
                        width={108}
                        height={52}
                        alt="laser tag convetion"
                    />
                </div>
                <h1 className={style.title}>{props.title || ""}</h1>
                {props.seoExpo ? null : (
                    <div className={style.image_responsive}>
                        <Image
                            src={props.imageResponsive}
                            layout="fill"
                            objectFit="cover"
                            height={740}
                            width={360}
                            objectPosition={props.resObjectPosition}
                        />
                    </div>
                )}
                <EventInfo
                    iconsBlue={props.iconsBlue}
                    textWhite={props.textWhite}
                    timeName={props.timeName}
                    time={props.time}
                    dateName={props.dateName}
                    date={props.date}
                    placeName={props.placeName}
                    place={props.place}
                />

                {props.text ? (
                    <div className={style.text}>{props.text}</div>
                ) : null}
                <div
                    className={
                        props.text
                            ? style.button_outer_2023_sea_expo
                            : style.button_outer_2023
                    }
                >
                    <button className={style.button} onClick={props.onClick}>
                        {props.buttonText}
                    </button>
                </div>
            </div>
            <div className={style.background}>
                <Image
                    src={props.image}
                    layout="fill"
                    objectFit="cover"
                    objectPosition={props.objectPosition}
                />
            </div>
            {props.seoExpo ? (
                <div className={style.image_responsive_new}>
                    <Image
                        src={props.imageResponsive}
                        layout="fill"
                        objectFit="cover"
                        height={740}
                        width={360}
                        objectPosition={props.resObjectPosition}
                    />
                </div>
            ) : null}
        </section>
    );
}

function EventInfo(props) {
    return (
        <div className={style.event_info}>
            <div className={style.event_info_cell}>
                <div className={style.event_info__top}>
                    <div className={style.event_info__place_icon_outer}>
                        {props.iconsBlue ? dateIconBlue : dateIcon}
                    </div>
                    <div
                        className={
                            props.iconsBlue
                                ? style.event_info__title_blue
                                : style.event_info__title
                        }
                    >
                        {props.dateName}
                    </div>
                </div>
                <div
                    className={
                        props.textWhite
                            ? style.event_info__text_white
                            : style.event_info__text
                    }
                >
                    {props.date}
                </div>
            </div>
            {props.time ? (
                <div className={style.event_info_cell}>
                    <div className={style.event_info__top}>
                        <div className={style.event_info__place_icon_outer}>
                            {props.iconsBlue ? timeIconBlue : timeIcon}
                        </div>
                        <div
                            className={
                                props.iconsBlue
                                    ? style.event_info__title_blue
                                    : style.event_info__title
                            }
                        >
                            {props.timeName}
                        </div>
                    </div>
                    <div
                        className={
                            props.textWhite
                                ? style.event_info__text_white
                                : style.event_info__text
                        }
                    >
                        {props.time}
                    </div>
                </div>
            ) : null}
            <div className={style.event_info_cell}>
                <div className={style.event_info__top}>
                    <div className={style.event_info__place_icon_outer}>
                        {props.iconsBlue ? placeIconBlue : placeIcon}
                    </div>
                    <div
                        className={
                            props.iconsBlue
                                ? style.event_info__title_blue
                                : style.event_info__title
                        }
                    >
                        {props.placeName}
                    </div>
                </div>
                <div
                    className={
                        props.textWhite
                            ? style.event_info__text_white
                            : style.event_info__text
                    }
                >
                    {props.place}
                </div>
            </div>
        </div>
    );
}

const placeIcon = (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
        <path
            d="M12.2383 2.5C8.36828 2.5 5.23828 5.63 5.23828 9.5C5.23828 14.75 12.2383 22.5 12.2383 22.5C12.2383 22.5 19.2383 14.75 19.2383 9.5C19.2383 5.63 16.1083 2.5 12.2383 2.5ZM7.23828 9.5C7.23828 6.74 9.47828 4.5 12.2383 4.5C14.9983 4.5 17.2383 6.74 17.2383 9.5C17.2383 12.38 14.3583 16.69 12.2383 19.38C10.1583 16.71 7.23828 12.35 7.23828 9.5Z"
            fill="#8E8E8E"
        />
        <path
            d="M12.2383 12C13.619 12 14.7383 10.8807 14.7383 9.5C14.7383 8.11929 13.619 7 12.2383 7C10.8576 7 9.73828 8.11929 9.73828 9.5C9.73828 10.8807 10.8576 12 12.2383 12Z"
            fill="#8E8E8E"
        />
    </svg>
);

const placeIconBlue = (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clipPath="url(#clip0_2_394)">
            <path
                d="M12 2.00037C8.13 2.00037 5 5.13037 5 9.00037C5 14.2504 12 22.0004 12 22.0004C12 22.0004 19 14.2504 19 9.00037C19 5.13037 15.87 2.00037 12 2.00037ZM7 9.00037C7 6.24037 9.24 4.00037 12 4.00037C14.76 4.00037 17 6.24037 17 9.00037C17 11.8804 14.12 16.1904 12 18.8804C9.92 16.2104 7 11.8504 7 9.00037Z"
                fill="#0090FF"
            />
            <path
                d="M12 11.5004C13.3807 11.5004 14.5 10.3811 14.5 9.00037C14.5 7.61965 13.3807 6.50037 12 6.50037C10.6193 6.50037 9.5 7.61965 9.5 9.00037C9.5 10.3811 10.6193 11.5004 12 11.5004Z"
                fill="#0090FF"
            />
        </g>
        <defs>
            <clipPath id="clip0_2_394">
                <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0 0.000366211)"
                />
            </clipPath>
        </defs>
    </svg>
);

const dateIcon = (
    <svg
        width="25"
        height="20"
        viewBox="0 0 18 20"
        fill="none"
        className={style.date_icon}
    >
        <path
            d="M4 9H6V11H4V9ZM18 4V18C18 19.1 17.1 20 16 20H2C0.89 20 0 19.1 0 18L0.00999999 4C0.00999999 2.9 0.89 2 2 2H3V0H5V2H13V0H15V2H16C17.1 2 18 2.9 18 4ZM2 6H16V4H2V6ZM16 18V8H2V18H16ZM12 11H14V9H12V11ZM8 11H10V9H8V11Z"
            fill="#8E8E8E"
        />
    </svg>
);

const dateIconBlue = (
    <svg
        width="19"
        height="20"
        viewBox="0 0 19 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M4.76172 9H6.76172V11H4.76172V9ZM18.7617 4V18C18.7617 19.1 17.8617 20 16.7617 20H2.76172C1.65172 20 0.761719 19.1 0.761719 18L0.771719 4C0.771719 2.9 1.65172 2 2.76172 2H3.76172V0H5.76172V2H13.7617V0H15.7617V2H16.7617C17.8617 2 18.7617 2.9 18.7617 4ZM2.76172 6H16.7617V4H2.76172V6ZM16.7617 18V8H2.76172V18H16.7617ZM12.7617 11H14.7617V9H12.7617V11ZM8.76172 11H10.7617V9H8.76172V11Z"
            fill="#0090FF"
        />
    </svg>
);

const timeIcon = (
    <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.72145 1.84968C7.02406 1.85099 5.39672 2.52653 4.19741 3.72769C2.99811 4.92885 2.32508 6.55724 2.32639 8.25462C2.32704 9.09508 2.49323 9.92718 2.81546 10.7034C3.13769 11.4797 3.60965 12.1848 4.20441 12.7787C4.79916 13.3725 5.50506 13.8434 6.28179 14.1644C7.05852 14.4854 7.89088 14.6503 8.73134 14.6497C9.5718 14.649 10.4039 14.4828 11.1801 14.1606C11.9564 13.8384 12.6615 13.3664 13.2554 12.7717C13.8492 12.1769 14.3201 11.471 14.6411 10.6943C14.9621 9.91755 15.127 9.08519 15.1264 8.24473C15.1251 6.54735 14.4495 4.92 13.2484 3.7207C12.0472 2.52139 10.4188 1.84837 8.72145 1.84968ZM3.06517 2.59719C4.5643 1.09574 6.59848 0.251318 8.72021 0.249679C10.8419 0.24804 12.8774 1.08932 14.3789 2.58845C15.8803 4.08759 16.7248 6.12177 16.7264 8.2435C16.7272 9.29407 16.5211 10.3345 16.1198 11.3054C15.7185 12.2763 15.1299 13.1587 14.3876 13.9022C13.6453 14.6456 12.7639 15.2356 11.7936 15.6383C10.8233 16.0411 9.78315 16.2489 8.73257 16.2497C7.682 16.2505 6.64155 16.0444 5.67064 15.6431C4.69972 15.2418 3.81735 14.6532 3.07391 13.9109C2.33047 13.1686 1.74051 12.2871 1.33772 11.3169C0.934936 10.3466 0.727207 9.30643 0.726395 8.25586C0.724756 6.13413 1.56604 4.09864 3.06517 2.59719ZM8.7233 4.24968C9.16513 4.24934 9.52358 4.60723 9.52392 5.04906L9.52614 7.91769L11.6935 10.0817C12.0062 10.3939 12.0065 10.9004 11.6944 11.2131C11.3822 11.5257 10.8757 11.5261 10.563 11.2139L8.16114 8.8158C8.011 8.66589 7.92656 8.46247 7.92639 8.25029L7.92392 5.0503C7.92358 4.60847 8.28147 4.25002 8.7233 4.24968Z"
            fill="#0090FF"
        />
    </svg>
);

const timeIconBlue = (
    <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.72145 1.84968C7.02406 1.85099 5.39672 2.52653 4.19741 3.72769C2.99811 4.92885 2.32508 6.55724 2.32639 8.25462C2.32704 9.09508 2.49323 9.92718 2.81546 10.7034C3.13769 11.4797 3.60965 12.1848 4.20441 12.7787C4.79916 13.3725 5.50506 13.8434 6.28179 14.1644C7.05852 14.4854 7.89088 14.6503 8.73134 14.6497C9.5718 14.649 10.4039 14.4828 11.1801 14.1606C11.9564 13.8384 12.6615 13.3664 13.2554 12.7717C13.8492 12.1769 14.3201 11.471 14.6411 10.6943C14.9621 9.91755 15.127 9.08519 15.1264 8.24473C15.1251 6.54735 14.4495 4.92 13.2484 3.7207C12.0472 2.52139 10.4188 1.84837 8.72145 1.84968ZM3.06517 2.59719C4.5643 1.09574 6.59848 0.251318 8.72021 0.249679C10.8419 0.24804 12.8774 1.08932 14.3789 2.58845C15.8803 4.08759 16.7248 6.12177 16.7264 8.2435C16.7272 9.29407 16.5211 10.3345 16.1198 11.3054C15.7185 12.2763 15.1299 13.1587 14.3876 13.9022C13.6453 14.6456 12.7639 15.2356 11.7936 15.6383C10.8233 16.0411 9.78315 16.2489 8.73257 16.2497C7.682 16.2505 6.64155 16.0444 5.67064 15.6431C4.69972 15.2418 3.81735 14.6532 3.07391 13.9109C2.33047 13.1686 1.74051 12.2871 1.33772 11.3169C0.934936 10.3466 0.727207 9.30643 0.726395 8.25586C0.724756 6.13413 1.56604 4.09864 3.06517 2.59719ZM8.7233 4.24968C9.16513 4.24934 9.52358 4.60723 9.52392 5.04906L9.52614 7.91769L11.6935 10.0817C12.0062 10.3939 12.0065 10.9004 11.6944 11.2131C11.3822 11.5257 10.8757 11.5261 10.563 11.2139L8.16114 8.8158C8.011 8.66589 7.92656 8.46247 7.92639 8.25029L7.92392 5.0503C7.92358 4.60847 8.28147 4.25002 8.7233 4.24968Z"
            fill="#0090FF"
        />
    </svg>
);

const breadcrumbData = [
    {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "/",
    },
    {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "/blog",
    },
    {
        "@type": "ListItem",
        position: 3,
        name: "SEA EXPO 2023",
        item: "",
    },
];
