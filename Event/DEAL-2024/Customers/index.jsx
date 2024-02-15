import Image from "next/image";
import Link from "next/link";
import style from "./style.module.scss";

const Customers = (props) => {
    const getLInk = (index) => {
        switch (index) {
            case 0:
                return "https://www.youtube.com/watch?v=SCeoOnjKmMY&list=PLLQp1pbhB3oMqpIgBQKnw-zmtMvtV6Vpz&index=1";
            case 1:
                return "https://www.youtube.com/watch?v=Fd9_F5lmOYg&list=PLLQp1pbhB3oMqpIgBQKnw-zmtMvtV6Vpz&index=3";
            case 2:
                return "https://www.youtube.com/watch?v=VGkBFgFQ8aw&list=PLLQp1pbhB3oMqpIgBQKnw-zmtMvtV6Vpz&index=5";
            default:
                break;
        }
    };
    return (
        <section className={style.customers}>
            <div className={style.container}>
                <h2 className={style.title}>{props.title}</h2>
                <p className={style.text}>{props.text}</p>
                <div className={style.grid}>
                    {props.data.map((item, index) => (
                        <div className={style.cell} key={index}>
                            <a
                                className={style.cell_image}
                                href={getLInk(index)}
                                target="_blank"
                            >
                                <Image
                                    src={item.src}
                                    alt={item.text}
                                    layout="fill"
                                    objectFit="contain"
                                />

                                <div className={style.bg_hover}>
                                    <Image
                                        src={props.youtube}
                                        alt="Youtube logo"
                                        width={55}
                                        height={40}
                                    />
                                </div>
                            </a>
                            <div className={style.divider}></div>
                            <a
                                href={getLInk(index)}
                                target="_blank"
                                className={style.cell_text}
                            >
                                {item.text}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Customers;
