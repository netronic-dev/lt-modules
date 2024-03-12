import { useInView } from "react-intersection-observer";
import style from "./style.module.scss";
import Image from "next/image";
import Slider from "../../BlackFriday_2023/WordSlider";
import RunningText from "../Main/RunningText";
import { useModals } from "../../../context/ModalsProvider";

const Deals = (props) => {
    console.log(props.isTimerCompleted);
    const [ref, inView] = useInView({
        triggerOnce: true,
    });
    const [ref1, inView1] = useInView({
        triggerOnce: true,
    });
    const [ref2, inView2] = useInView({
        triggerOnce: true,
    });
    const [ref3, inView3] = useInView({
        triggerOnce: true,
    });

    const modal = useModals();

    const setInview = (index) => {
        switch (true) {
            case index === 0:
                return inView1;
            case index === 1:
                return inView2;
            case index === 2:
                return inView3;
        }
    };

    const getTaggersImage = (index) => {
        switch (true) {
            case index === 0:
                return props.taggersF2Image;
            case index === 1:
                return props.taggersLuxImage;
            case index === 2:
                return props.taggersEclipseImage;
        }
    };

    const setRef = (index) => {
        switch (true) {
            case index === 0:
                return ref1;
            case index === 1:
                return ref2;
            case index === 2:
                return ref3;
        }
    };

    const setModal = (index) => {
        switch (true) {
            case index === 0:
                return modal.openPremiumModal;
            case index === 1:
                return modal.openLuxModal;
            case index === 2:
                return modal.openEclipseModal;
        }
    };

    return (
        <section className={style.deals}>
            <div className={style.top_blur}>
                <Image src={props.top_blur_image} layout="fill" alt="blur" />
            </div>
            <div className={style.deal_bg_blur}>
                <Image src={props.deal_bg_blur} layout="fill" alt="blur" />
            </div>

            <div className={style.wrapper}>
                <div className={style.content}>
                    <h2
                        className={`${style.title} ${
                            inView ? style.animation_main_title : ""
                        }`}
                        ref={ref}
                    >
                        {props.title}
                    </h2>
                    <p
                        className={`${style.text} ${
                            inView ? style.animation_main_text : ""
                        }`}
                    >
                        {props.text}
                    </p>
                    <div className={style.deals_grid} id="set">
                        {props.deals_data.map((item, index) => (
                            <div
                                className={`${style.card} ${
                                    setInview(index)
                                        ? style.animation__box_shadow
                                        : ""
                                }`}
                                key={index}
                            >
                                <div
                                    className={`${style.deal_card} ${
                                        item.image_right
                                            ? ""
                                            : style.deal_card_right
                                    }`}
                                >
                                    <div
                                        className={`${style.card_content} ${
                                            index === 1
                                                ? style.card_content_2
                                                : ""
                                        } ${
                                            setInview(index)
                                                ? item.image_right
                                                    ? style.animation__left
                                                    : style.animation__right
                                                : ""
                                        }
										`}
                                    >
                                        <h3
                                            className={`${style.card_title} ${
                                                setInview(index)
                                                    ? style.animation_title
                                                    : ""
                                            }`}
                                        >
                                            {item.title}
                                        </h3>
                                        <div className={style.includes_block}>
                                            <span
                                                className={`${
                                                    style.includes_title
                                                } ${
                                                    setInview(index)
                                                        ? style.includes_title_animation
                                                        : ""
                                                }`}
                                            >
                                                {item.includes_title}
                                            </span>
                                            <div
                                                className={style.includes_grid}
                                            >
                                                {item.includes_data.map(
                                                    (cell, index_2) => (
                                                        <div
                                                            className={`${
                                                                style.grid_cell
                                                            } ${
                                                                setInview(index)
                                                                    ? index_2 ===
                                                                      0
                                                                        ? style.grid_cell_1
                                                                        : index_2 ===
                                                                          1
                                                                        ? style.grid_cell_2
                                                                        : style.grid_cell_3
                                                                    : ""
                                                            }`}
                                                            key={index_2}
                                                        >
                                                            <div
                                                                className={
                                                                    style.cell_icon
                                                                }
                                                            >
                                                                <Image
                                                                    src={
                                                                        cell.icon
                                                                    }
                                                                    alt={
                                                                        cell.text
                                                                    }
                                                                />
                                                            </div>

                                                            <p
                                                                className={
                                                                    style.grid_text
                                                                }
                                                            >
                                                                {cell.text}
                                                            </p>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        <p
                                            className={`${style.card_text} ${
                                                setInview(index)
                                                    ? style.animation_text
                                                    : ""
                                            }`}
                                        >
                                            {item.text}
                                        </p>
                                    </div>
                                    <div
                                        className={`${style.card_image} ${
                                            setInview(index)
                                                ? item.image_right
                                                    ? style.animation__right
                                                    : style.animation__left
                                                : ""
                                        }`}
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            layout="fill"
                                            objectFit="cover"
                                            quality={100}
                                        />
                                        <div className={style.taggers_image}>
                                            <Image
                                                src={getTaggersImage(index)}
                                                alt={item.title}
                                                layout="fill"
                                                objectFit="contain"
                                                quality={100}
                                            />
                                        </div>
                                        <div
                                            className={`${
                                                item.image_right
                                                    ? style.upper_ribbon
                                                    : style.upper_ribbon_left
                                            }`}
                                        >
                                            {item.upper_ribbon_text}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`${style.bottom_block} ${
                                        setInview(index)
                                            ? style.bottom_block_animation
                                            : ""
                                    }`}
                                >
                                    <div className={style.upper_grid}>
                                        {item.price_block_cells.map(
                                            (cellItem, index_3) => (
                                                <div
                                                    className={`${style.cell} ${
                                                        setInview(index)
                                                            ? index_3 === 0
                                                                ? style.cell_1
                                                                : index_3 === 1
                                                                ? style.cell_2
                                                                : index_3 === 2
                                                                ? style.cell_3
                                                                : style.cell_4
                                                            : ""
                                                    }`}
                                                    key={index_3}
                                                >
                                                    <div
                                                        className={
                                                            style.top_line
                                                        }
                                                    ></div>
                                                    <span
                                                        className={style.title}
                                                    >
                                                        {cellItem.title}
                                                    </span>
                                                    <p
                                                        className={
                                                            style.cell_text
                                                        }
                                                    >
                                                        {cellItem.text}
                                                    </p>
                                                </div>
                                            )
                                        )}
                                    </div>
                                    <div
                                        className={style.card_price_wrapp}
                                        ref={setRef(index)}
                                    >
                                        <span
                                            className={`${
                                                style.before_price_text
                                            } ${
                                                setInview(index)
                                                    ? style.before_price_text_animation
                                                    : ""
                                            }`}
                                        >
                                            {item.before_price_text}
                                        </span>
                                        <div className={style.price_row}>
                                            <span
                                                className={`${
                                                    style.item_active_price
                                                } ${
                                                    setInview(index)
                                                        ? style.animation__scale
                                                        : ""
                                                }`}
                                            >
                                                {item.active_price}
                                            </span>
                                            <div
                                                className={`${
                                                    style.item_unactive_price
                                                } ${
                                                    setInview(index)
                                                        ? style.animation__scale_through
                                                        : ""
                                                }`}
                                            >
                                                {item.nonactive_price}
                                                <span
                                                    className={`${
                                                        style.line__through
                                                    } ${
                                                        setInview(index)
                                                            ? style.animation__through
                                                            : ""
                                                    }`}
                                                ></span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className={`${style.card_button} ${
                                            setInview(index)
                                                ? style.animation__scale_button
                                                : ""
                                        }`}
                                        disabled={props.isTimerCompleted}
                                        onClick={setModal(index)}
                                    >
                                        {item.btn_text}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Deals;
