import Image from 'next/image';
import style from './style.module.scss';

const FindUs = (props) => {
    return (
        <section className={style.find_us}>
            <div className={style.content}>
                <h2 className={style.title}>{props.title}</h2>
                <div className={style.img_wrapper}>
                    <Image
                        src={props.imgSrc}
                        alt={props.altImg}
                        layout='fill'
                        objectFit='cover'
                    />
                </div>
            </div>
        </section>
    );
};

export default FindUs;
