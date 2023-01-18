<<<<<<< HEAD
import style from '../footer.module.scss';

export function Contacts() {
=======
import { useGAEvents } from '../../../context/GAEventsProvider';
import style from '../footer.module.scss';

export function Contacts() {
    const GAEvents = useGAEvents();

>>>>>>> 777832d7b8db0d22d880cd3ed1fcc78d29788fde
    return (
        <div className={style.contacts}>
            <div className={style.contacts_cards}>
                <div className={style.contacts_two_cards}>
                    <div className={style.contacts__content}>
                        <h3 className={style.contacts__blue}>EUROPE</h3>
                        <div className={style.contacts__content_item}>
<<<<<<< HEAD
                            <p className={style.title}>
                                Adresse du bureau principal
                            </p>
=======
                            <p className={style.title}>Main Office Address</p>
>>>>>>> 777832d7b8db0d22d880cd3ed1fcc78d29788fde
                            <p
                                className={`${style.contacts__link} ${style.default}`}
                            >
                                Kaupmehe tn 7-120 Tallinn Harjumaa 10114
                                Republic of Estonia
                            </p>
                        </div>
                        <div className={style.contacts__content_item}>
                            <p
                                className={`${style.contacts__link} ${style.default}`}
                            >
                                Plekhanivska street 134, Kharkiv, Ukraine
                            </p>
                        </div>
                        <div
                            className={`${style.contacts__content_item} ${style.short}`}
                        >
                            <p className={style.title}>Email</p>
<<<<<<< HEAD
                            <a target='_blank' href='mailto:sales@lasertag.net'>
=======
                            <a
                                target='_blank'
                                href='mailto:sales@lasertag.net'
                                onClick={() =>
                                    GAEvents.buttonClick(
                                        'Footer',
                                        'Link click',
                                        'sales@lasertag.net'
                                    )
                                }
                            >
>>>>>>> 777832d7b8db0d22d880cd3ed1fcc78d29788fde
                                <p className={style.contacts__link_underline}>
                                    sales@lasertag.net
                                </p>
                            </a>
                        </div>
                        <div
                            className={`${style.contacts__content_item} ${style.short}`}
                        >
                            <p className={style.title}>Phone</p>
<<<<<<< HEAD
                            <a target='_blank' href='tel:+48573581044'>
=======
                            <a
                                target='_blank'
                                href='tel:+48573581044'
                                onClick={() =>
                                    GAEvents.buttonClick(
                                        'Footer',
                                        'Link click',
                                        'tel:+48573581044'
                                    )
                                }
                            >
>>>>>>> 777832d7b8db0d22d880cd3ed1fcc78d29788fde
                                <p className={style.contacts__link}>
                                    +48 573 58 10 44
                                </p>
                            </a>
                        </div>
                    </div>
                    <div className={style.contacts__icons}>
                        <div className={style.icon_item}>
<<<<<<< HEAD
                            <a target='_blank' href='skype:chiefsales?chat'>
=======
                            <a
                                target='_blank'
                                href='skype:chiefsales?chat'
                                onClick={() =>
                                    GAEvents.buttonClick(
                                        'Footer',
                                        'Link click',
                                        'skype:chiefsales?chat'
                                    )
                                }
                            >
>>>>>>> 777832d7b8db0d22d880cd3ed1fcc78d29788fde
                                {skypeLogo}
                            </a>
                        </div>
                        <div className={style.icon_item}>
<<<<<<< HEAD
                            <a target='_blank' href='https://wa.me/37258662265'>
=======
                            <a
                                target='_blank'
                                href='https://wa.me/37258662265'
                                onClick={() =>
                                    GAEvents.buttonClick(
                                        'Footer',
                                        'Link click',
                                        'https://wa.me/37258662265'
                                    )
                                }
                            >
>>>>>>> 777832d7b8db0d22d880cd3ed1fcc78d29788fde
                                {whatsAppIcon}
                            </a>
                        </div>
                        <div className={style.icon_item}>
<<<<<<< HEAD
                            <a target='_blank' href='https://wa.me/34645379324'>
=======
                            <a
                                target='_blank'
                                href='https://wa.me/34645379324'
                                onClick={() =>
                                    GAEvents.buttonClick(
                                        'Footer',
                                        'Link click',
                                        'https://wa.me/34645379324'
                                    )
                                }
                            >
>>>>>>> 777832d7b8db0d22d880cd3ed1fcc78d29788fde
                                {whatsAppIcon}
                            </a>
                        </div>
                    </div>
                </div>
                <div className={style.contacts_two_cards}>
                    <div className={style.contacts__content}>
                        <h3 className={style.contacts__blue}>USA</h3>
                        <div className={style.contacts__content_item}>
<<<<<<< HEAD
                            <p className={style.title}>Addresse</p>
=======
                            <p className={style.title}>Address</p>
>>>>>>> 777832d7b8db0d22d880cd3ed1fcc78d29788fde
                            <p
                                className={`${style.contacts__link} ${style.default}`}
                            >
                                7567 Brightwater Pl, Oviedo, FL 32765
                            </p>
                        </div>
                        <div
                            className={`${style.contacts__content_item} ${style.short}`}
                        >
                            <p className={style.title}>Email</p>
<<<<<<< HEAD
                            <a target='_blank' href='mailto:sales@lasertag.net'>
=======
                            <a
                                target='_blank'
                                href='mailto:sales@lasertag.net'
                                onClick={() =>
                                    GAEvents.buttonClick(
                                        'Footer',
                                        'Link click',
                                        'mailto:sales@lasertag.net'
                                    )
                                }
                            >
>>>>>>> 777832d7b8db0d22d880cd3ed1fcc78d29788fde
                                <p className={style.contacts__link_underline}>
                                    sales@lasertag.net
                                </p>
                            </a>
                        </div>
                        <div
                            className={`${style.contacts__content_item} ${style.short}`}
                        >
                            <p className={style.title}>Phone</p>
<<<<<<< HEAD
                            <a target='_blank' href='tel:+13479192246'>
=======
                            <a
                                target='_blank'
                                href='tel:+13479192246'
                                onClick={() =>
                                    GAEvents.buttonClick(
                                        'Footer',
                                        'Link click',
                                        'tel:+13479192246'
                                    )
                                }
                            >
>>>>>>> 777832d7b8db0d22d880cd3ed1fcc78d29788fde
                                <p className={style.contacts__link}>
                                    +1 347 919 2246
                                </p>
                            </a>
                        </div>
                    </div>
                    <div className={style.contacts__icons}>
                        <div className={style.icon_item}>
<<<<<<< HEAD
                            <a target='_blank' href='skype:chiefsales?chat'>
=======
                            <a
                                target='_blank'
                                href='skype:chiefsales?chat'
                                onClick={() =>
                                    GAEvents.buttonClick(
                                        'Footer',
                                        'Link click',
                                        'skype:chiefsales?chat'
                                    )
                                }
                            >
>>>>>>> 777832d7b8db0d22d880cd3ed1fcc78d29788fde
                                {skypeLogo}
                            </a>
                        </div>
                        <div className={style.icon_item}>
<<<<<<< HEAD
                            <a target='_blank' href='https://wa.me/16464802917'>
=======
                            <a
                                target='_blank'
                                href='https://wa.me/16464802917'
                                onClick={() =>
                                    GAEvents.buttonClick(
                                        'Footer',
                                        'Link click',
                                        'https://wa.me/16464802917'
                                    )
                                }
                            >
>>>>>>> 777832d7b8db0d22d880cd3ed1fcc78d29788fde
                                {whatsAppIcon}
                            </a>
                        </div>
                        <div className={style.icon_item}>
<<<<<<< HEAD
                            <a target='_blank' href='https://wa.me/16464802917'>
=======
                            <a
                                target='_blank'
                                href='https://wa.me/16464802917'
                                onClick={() =>
                                    GAEvents.buttonClick(
                                        'Footer',
                                        'Link click',
                                        'https://wa.me/16464802917'
                                    )
                                }
                            >
>>>>>>> 777832d7b8db0d22d880cd3ed1fcc78d29788fde
                                {whatsAppIcon}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
const whatsAppIcon = (
    <svg
        className={style.whatsapp}
        width='23'
        height='22'
        viewBox='0 0 23 22'
        fill='none'
    >
        <path
            d='M22.9941 10.7067C22.9941 16.6222 18.1541 21.4133 12.1897 21.4133C10.3075 21.4133 8.52303 20.9244 6.95858 20.0689L0.994141 22L2.9497 16.2556C1.97192 14.6422 1.4097 12.7356 1.4097 10.7311C1.38525 4.79111 6.22525 0 12.1897 0C18.1541 0 22.9941 4.79111 22.9941 10.7067ZM12.1897 1.71111C7.17859 1.71111 3.12081 5.74444 3.12081 10.7067C3.12081 12.6867 3.75636 14.4956 4.85636 15.9867L3.73192 19.3356L7.22747 18.2356C8.6697 19.1889 10.3808 19.7267 12.2141 19.7267C17.2008 19.7267 21.283 15.6933 21.283 10.7067C21.283 5.72 17.2008 1.71111 12.1897 1.71111ZM17.6408 13.1756C17.5675 13.0778 17.3964 13.0044 17.1275 12.8578C16.8586 12.7356 15.563 12.1 15.3186 12.0022C15.0741 11.9044 14.903 11.88 14.7319 12.1244C14.5608 12.3933 14.0475 12.98 13.9008 13.1511C13.7541 13.3222 13.583 13.3467 13.3386 13.2244C13.0697 13.1022 12.2141 12.8089 11.2119 11.9289C10.4297 11.2444 9.89192 10.3644 9.74525 10.12C9.59859 9.85111 9.72081 9.70444 9.86747 9.58222C9.9897 9.46 10.1364 9.26444 10.2586 9.11778C10.3808 8.97111 10.4297 8.84889 10.5275 8.67778C10.6253 8.50667 10.5764 8.36 10.503 8.21333C10.4297 8.09111 9.91636 6.79556 9.69636 6.25778C9.47636 5.74444 9.25636 5.81778 9.1097 5.81778C8.96303 5.81778 8.76747 5.79333 8.59636 5.79333C8.42525 5.79333 8.13192 5.86667 7.88747 6.11111C7.64303 6.38 6.95858 7.01556 6.95858 8.31111C6.95858 9.60667 7.91192 10.8533 8.03414 11.0244C8.15636 11.1956 9.86747 13.9333 12.5564 14.9844C15.2453 16.0356 15.2453 15.6933 15.7341 15.6444C16.223 15.5956 17.2986 15.0089 17.5186 14.3978C17.7141 13.8111 17.7141 13.2978 17.6408 13.1756Z'
            fill='white'
        />
    </svg>
);
const viberIcon = (
    <svg
        width='25'
        height='24'
        viewBox='0 0 25 24'
        fill='none'
        className={style.viber}
    >
        <path
            d='M20.9115 3.31786C20.3768 2.82525 18.2123 1.25452 13.3866 1.23352C13.3866 1.23352 7.69772 0.892453 4.92694 3.43584C3.38574 4.97695 2.84255 7.23825 2.78358 10.0385C2.72461 12.8388 2.65304 18.0855 7.71033 19.5088H7.7145L7.71033 21.6816C7.71033 21.6816 7.67668 22.5617 8.25774 22.7385C8.95679 22.9575 9.36943 22.288 10.0389 21.5679C10.4053 21.1721 10.9106 20.591 11.2938 20.1488C14.7551 20.4394 17.4123 19.7741 17.7154 19.6773C18.4145 19.4499 22.3685 18.9445 23.0085 13.6978C23.6738 8.28253 22.6885 4.86328 20.9115 3.31786Z'
            fill='white'
        />
        <path
            d='M21.4972 13.3017C20.9539 17.6809 17.7494 17.9588 17.1599 18.1484C16.9073 18.2283 14.5702 18.8095 11.6352 18.62C11.6352 18.62 9.44557 21.2602 8.7634 21.9466C8.54022 22.1698 8.29601 22.1487 8.30022 21.7065C8.30022 21.4161 8.31705 18.0979 8.31705 18.0979C8.31283 18.0979 8.31283 18.0979 8.31705 18.0979C4.03033 16.9103 4.28299 12.4426 4.3293 10.1055C4.37561 7.76854 4.81779 5.85257 6.12316 4.56407C8.46865 2.43754 13.2986 2.75338 13.2986 2.75338C17.3789 2.77021 19.3328 3.99974 19.7876 4.41243C21.2908 5.70098 22.0572 8.78338 21.4972 13.3017Z'
            fill='#101010'
            className={style.wrongpass}
        />
        <path
            d='M15.6435 9.89962C15.6603 10.2617 15.1171 10.287 15.1003 9.92484C15.0539 8.99845 14.6202 8.54793 13.7275 8.4974C13.3653 8.47631 13.399 7.93312 13.7569 7.95421C14.9319 8.01735 15.5845 8.69109 15.6435 9.89962Z'
            fill='white'
        />
        <path
            d='M16.4988 10.375C16.5408 8.58955 15.425 7.19155 13.3069 7.03579C12.9489 7.01052 12.9869 6.46729 13.3448 6.49255C15.7872 6.66946 17.0883 8.3496 17.042 10.3876C17.0378 10.7497 16.4903 10.733 16.4988 10.375Z'
            fill='white'
        />
        <path
            d='M18.4785 10.9397C18.4827 11.3018 17.9353 11.306 17.9353 10.9439C17.91 7.51202 15.6236 5.64236 12.8485 5.62131C12.4906 5.61709 12.4906 5.07812 12.8485 5.07812C15.952 5.09917 18.4491 7.24248 18.4785 10.9397Z'
            fill='white'
        />
        <path
            d='M18.0015 15.071V15.0795C17.5467 15.8796 16.6961 16.7639 15.8203 16.4818L15.8118 16.4691C14.9233 16.2207 12.8306 15.1427 11.5083 14.0899C10.8262 13.5509 10.2029 12.9151 9.72288 12.3045C9.28919 11.7613 8.85128 11.117 8.42599 10.3422C7.52908 8.72102 7.33117 7.99675 7.33117 7.99675C7.04903 7.12089 7.92911 6.27025 8.73335 5.81551H8.74183C9.12921 5.61334 9.49975 5.68075 9.74819 5.97967C9.74819 5.97967 10.2704 6.60283 10.4935 6.91033C10.7041 7.19664 10.9862 7.65559 11.1336 7.91247C11.3905 8.37142 11.2304 8.83886 10.9778 9.0325L10.4725 9.4368C10.2156 9.64309 10.2493 10.0263 10.2493 10.0263C10.2493 10.0263 10.9988 12.8603 13.7991 13.5761C13.7991 13.5761 14.1823 13.6098 14.3886 13.353L14.7929 12.8477C14.9865 12.595 15.454 12.435 15.913 12.6919C16.532 13.0413 17.3194 13.5846 17.8416 14.0773C18.1363 14.3173 18.2036 14.6837 18.0015 15.071Z'
            fill='white'
        />
    </svg>
);
const telegramIcon = (
    <svg
        width='25'
        height='24'
        viewBox='0 0 25 24'
        fill='none'
        className={style.telegram}
    >
        <path
            d='M16.7441 9.07408L10.8941 14.2491C10.8191 14.3241 10.8191 14.3991 10.8191 14.4741L10.5941 16.4991C10.5941 16.5741 10.5191 16.5741 10.4441 16.4991L9.54407 13.4991C9.46907 13.3491 9.54407 13.1991 9.69407 13.1241L16.5191 8.84908C16.7441 8.77408 16.8941 8.99908 16.7441 9.07408Z'
            fill='white'
        />
        <path
            d='M12.9943 1.6499C10.1443 1.6499 7.51934 2.7749 5.64434 4.6499C3.76934 6.5249 2.56934 9.1499 2.56934 11.9999C2.56934 14.8499 3.69434 17.4749 5.64434 19.3499C7.51934 21.2249 10.1443 22.3499 12.9943 22.3499C15.8443 22.3499 18.4693 21.2249 20.3443 19.3499C22.2193 17.4749 23.4193 14.8499 23.4193 11.9999C23.3443 6.2999 18.6943 1.6499 12.9943 1.6499ZM19.1443 7.5749L17.0443 17.7749C16.9693 18.2249 16.3693 18.4499 15.9943 18.1499L12.7693 15.7499L11.1193 17.3999C10.8193 17.6999 10.3693 17.5499 10.2193 17.1749L9.01934 13.4249L5.86934 12.4499C5.41934 12.2999 5.41934 11.7749 5.86934 11.6249L18.3943 6.7499C18.7693 6.6749 19.2943 7.0499 19.1443 7.5749Z'
            fill='white'
        />
    </svg>
);
const skypeLogo = (
    <svg
        width='23'
        height='23'
        viewBox='0 0 23 23'
        fill='none'
        className={style.skype}
    >
        <g clipPath='url(#clip0)'>
            <path
                d='M21.7915 12.8099C23.0354 5.69201 16.8268 -0.401077 9.82718 0.912507C4.49126 -2.35174 -1.6339 3.86967 1.63676 9.18909C0.365346 16.2905 6.5721 22.4624 13.6295 21.1149C18.9755 24.3563 25.0814 18.1266 21.7915 12.8099ZM12.0721 18.21C9.15618 18.21 6.2256 16.8827 6.24026 14.5974C6.24485 13.9081 6.75726 13.2756 7.44018 13.2756C9.1571 13.2756 9.1406 15.8377 11.8741 15.8377C13.7927 15.8377 14.4472 14.7872 14.4472 14.0557C14.4472 11.4102 6.15776 13.0318 6.15776 8.05792C6.15776 5.36476 8.3596 3.50942 11.8218 3.71201C15.1237 3.90726 17.0588 5.36476 17.2458 6.72692C17.3383 7.61701 16.7489 8.31001 15.725 8.31001C14.2327 8.31001 14.0796 6.31076 11.5083 6.31076C10.3478 6.31076 9.36885 6.79476 9.36885 7.84526C9.36885 10.0407 17.6097 8.76651 17.6097 13.5983C17.6088 16.384 15.3886 18.21 12.0721 18.21Z'
                fill='white'
            />
        </g>
        <defs>
            <clipPath id='clip0'>
                <rect
                    width='22'
                    height='22'
                    fill='white'
                    transform='translate(0.719727 0.0078125)'
                />
            </clipPath>
        </defs>
    </svg>
);
