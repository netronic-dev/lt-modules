import style from './style.module.scss';

const RunningText = (props) => {
    return (
        <div className={style.main_ribbon}>
            <div className={`${style.ribbon__text} ${style.ribbon__text_1}`}>
                Black Friday
            </div>
            <div className={` ${style.ribbon__text} ${style.ribbon__text_2}`}>
                Black Friday
            </div>
            <div className={` ${style.ribbon__text} ${style.ribbon__text_3}`}>
                Black Friday
            </div>
            <div className={` ${style.ribbon__text} ${style.ribbon__text_4}`}>
                Black Friday
            </div>
            <div className={` ${style.ribbon__text} ${style.ribbon__text_5}`}>
                Black Friday
            </div>
            <div className={` ${style.ribbon__text} ${style.ribbon__text_6}`}>
                Black Friday
            </div>
        </div>
    );
};

export default RunningText;