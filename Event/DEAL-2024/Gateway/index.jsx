import Image from "next/image";
import style from "./style.module.scss";
import Link from "next/link";

const Page = (props) => {
    return (
        <section className={style.main}>
            <div className={style.container}>
                <h2 className={style.title}>{props.title}</h2>
                <p className={style.text}>{props.upperText}</p>
                <div className={style.devider}></div>
                <h2 className={style.second_title}>{props.second_title}</h2>
                <p className={`${style.text} ${style.second_text}`}>
                    {props.second_text}
                </p>
                <p className={`${style.text} ${style.third_text}`}>
                    {props.third_text}
                </p>
                <fieldset className={style.offer_fieldset}>
                    <legend className={style.offer_title}>
                        {props.offer_title}
                    </legend>
                    <span className={style.offer_blue_text}>
                        {props.offer_blue_text}
                    </span>
                    <span className={style.offer_text}>{props.offer_text}</span>
                    <Link href={props.link} scroll={false}>
                        <a className={style.offer_button}>{props.btn_text}</a>
                    </Link>
                </fieldset>
            </div>
            <div className={style.background}>
                <Image
                    src={props.bg_image}
                    alt="Background figure"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
        </section>
    );
};

export default Page;
