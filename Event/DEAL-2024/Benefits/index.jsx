import Image from "next/image";
import style from "./style.module.scss";

const Benefits = (props) => {
    return (
        <section className={style.benefits}>
            <div className={style.container}>
                <h2 className={style.title}>{props.title}</h2>
                <p className={style.text}>{props.text}</p>
                <div className={style.benefits_grid}>
                    <div className={style.upper_row}>
                        {props.data.map((item, index) => {
                            if (index <= 2)
                                return (
                                    <div
                                        className={style.grid_cell}
                                        key={index}
                                    >
                                        <div className={style.icon_image}>
                                            <Image
                                                src={item.src}
                                                alt={item.alt}
                                                layout="fill"
                                                objectFit="contain"
                                            />
                                        </div>

                                        <div className={style.divider}></div>
                                        <p className={style.text}>
                                            {item.text}
                                        </p>
                                    </div>
                                );
                        })}
                    </div>
                    <div className={style.bottom_row}>
                        {props.data.map((item, index) => {
                            if (index > 2)
                                return (
                                    <div
                                        className={style.grid_cell}
                                        key={index}
                                    >
                                        <div className={style.icon_image}>
                                            <Image
                                                src={item.src}
                                                alt={item.alt}
                                                layout="fill"
                                                objectFit="contain"
                                            />
                                        </div>
                                        <div className={style.divider}></div>
                                        <p className={style.text}>
                                            {item.text}
                                        </p>
                                    </div>
                                );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Benefits;
