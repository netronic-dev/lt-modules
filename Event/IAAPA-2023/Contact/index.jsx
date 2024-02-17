import Image from "next/image";
import style from "./style.module.scss";
import Link from "next/link";
import {
    formatPhoneNumberEurope,
    formatPhoneNumberUsa,
} from "../../../functions/formatPhoneNumber";

const Page = (props) => {
    return (
        <section className={style.main}>
            <div className={style.content}>
                <h2 className={style.title}>{props.title}</h2>
                <p className={style.text}>{props.text}</p>
                <div className={style.cell_wrapper}>
                    {props.data.map((item, index) => (
                        <div className={style.cell} key={index}>
                            <span className={style.cell_title}>
                                {item.title}
                            </span>
                            <div className={style.devider}></div>
                            {item.phone1 ? (
                                <Link
                                    href={
                                        item.link1
                                            ? `https://wa.me/${item.phone1}`
                                            : `tel:${item.phone1}`
                                    }
                                >
                                    <a className={style.link} target="_black">
                                        {formatPhoneNumberUsa(item.phone1)}
                                    </a>
                                </Link>
                            ) : null}
                            {item.email ? (
                                <Link href={`mailto:${item.email}`}>
                                    <a className={style.link}>{item.email}</a>
                                </Link>
                            ) : null}
                            {item.phone2 ? (
                                <Link
                                    href={
                                        item.link2
                                            ? `https://wa.me/${item.phone2}`
                                            : `tel:${item.phone2}`
                                    }
                                >
                                    <a className={style.link} target="_black">
                                        {formatPhoneNumberEurope(item.phone2)}
                                    </a>
                                </Link>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
            <div className={style.background_image}>
                <Image
                    src={props.image}
                    alt="Netronic Logo"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
        </section>
    );
};

export default Page;
