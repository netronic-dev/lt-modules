import Image from "next/image";
import Link from "next/link";
import style from "./style.module.scss";
import { useModals } from "../../../../context/ModalsProvider";

const Customers = (props) => {
    const modals = useModals();

    const getLInk = (index) => {
        switch (index) {
            case 0:
                return "SCeoOnjKmMY";
            case 1:
                return "Fd9_F5lmOYg";
            case 2:
                return "VGkBFgFQ8aw";
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
                                onClick={() =>
                                    modals.VideoModalOpen(getLInk(index))
                                }
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
                                onClick={() =>
                                    modals.VideoModalOpen(getLInk(index))
                                }
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
