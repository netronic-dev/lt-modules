import Image from "next/image";
import style from "./style.module.scss";

const Page = (props) => {
    return (
        <section className={style.main}>
            <h2 className={style.title}>{props.title}</h2>
            <p className={style.text}>{props.text}</p>
            {props.bg_logo && (
                <div className={style.bg_logo}>
                    <Image
                        src={props.bg_logo}
                        alt="background logo"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            )}
            <div className={style.images_block}>
                <Image
                    src={props.image}
                    alt="companies logo"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className={style.images_block_mob}>
                <Image
                    src={props.image_mob}
                    alt="companies logo"
                    layout="fill"
                    objectFit="contain"
                />
            </div>
            <p className={style.lil_text}>{props.lil_text}</p>
        </section>
    );
};

export default Page;
