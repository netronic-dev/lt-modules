import AnchorLink from 'react-anchor-link-smooth-scroll';
import style from './style.module.scss';
import Image from 'next/image';
import WordSlider from '../WordSlider';
import Link from 'next/link';

const Main = (props) => {
    return (
        <section className={style.main}>
            <div className={style.main_inner}>
                <div className={style.content}>
                    <div className={style.title_block}>
                        <h1 className={style.title}>{props.title}</h1>
                        <div className={style.image_sold_out}>
                            <Image
                                src={props.image_sold_out}
                                alt='Sold-out'
                                layout='fill'
                                objectFit='contain'
                                // width={230}
                                // height={138}
                                priority={true}
                            />
                        </div>
                    </div>
                    <p className={style.text}>{props.text}</p>
                    {props.textUS ? (
                        <div className={style.us_block}>
                            <p className={style.us_text}>{props.textUS}</p>
                            <div className={style.flag}>
                                <Image
                                    src={props.flag}
                                    alt='usa flag'
                                    layout='fill'
                                    objectFit='cover'
                                />
                            </div>
                        </div>
                    ) : null}
                    <AnchorLink href='#sale' offset='200'>
                        <button className={style.button} disabled={true}>
                            {props.buttonText}
                        </button>
                    </AnchorLink>
                </div>
                <div className={style.image_outer}>
                    <Image
                        src={props.image}
                        layout='fill'
                        objectFit='cover'
                        objectPosition={props.objectPosition}
                        priority={true}
                    />
                </div>
                <div className={style.image_outer_lap}>
                    <Image
                        src={props.image_lap}
                        layout='fill'
                        objectFit='cover'
                        objectPosition={props.objectPosition}
                        priority={true}
                    />
                </div>
                <div className={style.image_outer_mob}>
                    <Image
                        src={props.image_mob}
                        layout='fill'
                        objectFit='cover'
                        objectPosition='0 0'
                        priority={true}
                    />
                </div>
            </div>
            <WordSlider
                blueText
                className={style.words_slider}
                text={props.sliderWordsText}
            />
        </section>
    );
};

export default Main;
