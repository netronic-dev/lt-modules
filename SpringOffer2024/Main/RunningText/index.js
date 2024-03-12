import style from "./style.module.scss";

const RunningText = (props) => {
    const customClass = {
        bottom: style.ribbon__text_bottom,
        bottom_right: style.ribbon__text_bottom_right,
        count_bottom: style.ribbon__text_bottom_right_count,
    };

    return (
        <div className={`${style.main_ribbon} ${customClass[props.className]}`}>
            <div className={`${style.ribbon__text} ${style.ribbon__text_1}`}>
                Seasonal Spring Promotion
            </div>
            <div className={` ${style.ribbon__text} ${style.ribbon__text_2}`}>
                Seasonal Spring Promotion
            </div>
            <div className={` ${style.ribbon__text} ${style.ribbon__text_3}`}>
                Seasonal Spring Promotion
            </div>
            <div className={` ${style.ribbon__text} ${style.ribbon__text_4}`}>
                Seasonal Spring Promotion
            </div>
            {/* <div className={` ${style.ribbon__text} ${style.ribbon__text_5}`}>
                Seasonal Spring Promotion
            </div>
            <div className={` ${style.ribbon__text} ${style.ribbon__text_6}`}>
                Seasonal Spring Promotion
            </div> */}
        </div>
    );
};

export default RunningText;
