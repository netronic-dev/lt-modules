import style from "./style.module.scss";
import Image from "next/image";

export const UniqueOpportunity = (props) => {
    return (
        <section className={style.unique_opportunity}>
            <div className={style.container}>
                <div className={style.content}>
                    <h2 className={style.title}>{props.title}</h2>
                    <div className={style.grid}>
                        {props.data.map((item, index) => (
                            <div className={style.grid_cell} key={index}>
                                <div className={style.icons}>
                                    <Image src={item.icon} alt="Icons" />
                                </div>
                                <p className={style.cell_text}>{item.text}</p>
                            </div>
                        ))}
                        <div className={style.divider}></div>
                    </div>
                    <p className={style.text}>{props.text}</p>
                </div>
            </div>
        </section>
    );
};
