import style from './style.module.scss';

const RunningText = (props) => {
    return (
        <div className={style.main_ribbon}>
            <div className={`${style.ribbon__text} ${style.ribbon__text_1}`}>
                Halloween Special Offer
            </div>
            <div className={` ${style.ribbon__text} ${style.ribbon__text_2}`}>
                Halloween Special Offer
            </div>
            <div className={` ${style.ribbon__text} ${style.ribbon__text_3}`}>
                Halloween Special Offer
            </div>
            <div className={` ${style.ribbon__text} ${style.ribbon__text_4}`}>
                Halloween Special Offer
            </div>
        </div>
    );
};

export default RunningText;