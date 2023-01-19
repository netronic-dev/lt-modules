import style from './style.module.scss';
import { TitleText, TextTitle } from '../TitleText';
import Link from 'next/link';
import Image from 'next/image';
import { useGAEvents } from '../../context/GAEventsProvider';
import { InView } from 'react-intersection-observer';

const theme = {
    White: 'white_tile',
    Black: 'black_tile',
};

export function TileFullWidth(props) {
    const GAEvents = useGAEvents();
    function sectionWasInView(sectionName) {
        GAEvents.sectionWasInView(sectionName);
    }
    return (
        <InView
            as='div'
            onChange={(inView, entry) =>
                inView && sectionWasInView(`Card ${props.title || ''}`)
            }
        >
            <Link href={props.link}>
                <a
                    onClick={() =>
                        GAEvents.buttonClick('Card', 'Link Click', props.link)
                    }
                >
                    <div className={`${style.tile} ${theme[props.style]}`}>
                        <div className={style.tile_bg}>
                            {props.bgResponsive ? (
                                <>
                                    <div
                                        className={style.main}
                                        style={{
                                            backgroundColor: props.bgColor,
                                        }}
                                    >
                                        <Image
                                            alt={props.title}
                                            src={props.bg}
                                            layout='fill'
                                            objectFit={
                                                props.contain
                                                    ? 'contain'
                                                    : 'cover'
                                            }
                                            priority={true}
                                            quality={90}
                                        />
                                    </div>
                                    <div
                                        className={style.responsive}
                                        style={{
                                            backgroundColor: props.bgColor,
                                        }}
                                    >
                                        <Image
                                            alt={props.title}
                                            src={props.bgResponsive}
                                            layout='fill'
                                            objectFit={
                                                props.contain
                                                    ? 'contain'
                                                    : 'cover'
                                            }
                                            priority={true}
                                            quality={90}
                                        />
                                    </div>
                                </>
                            ) : (
                                <Image
                                    alt={props.title}
                                    src={props.bg}
                                    layout='fill'
                                    objectFit='cover'
                                    priority={true}
                                    quality={90}
                                />
                            )}
                        </div>
                        <div className={style.text}>
                            <TitleText
                                title={props.title}
                                text={props.text}
                                theme={props.style}
                                buttonText={props.buttonText}
                                direction={props.direction}
                            />
                        </div>
                    </div>
                </a>
            </Link>
        </InView>
    );
}

export function TileFullWidthReverse(props) {
    const GAEvents = useGAEvents();
    let LinkComponent = props.external ? 'div' : Link;
    function sectionWasInView(sectionName) {
        GAEvents.sectionWasInView(sectionName);
    }
    return (
        <InView
            as='div'
            onChange={(inView, entry) =>
                inView && sectionWasInView(`Card ${props.title || ''}`)
            }
        >
            <LinkComponent href={props.external ? null : props.link}>
                <a
                    href={props.external ? props.link : null}
                    target={props.external ? '_blank' : null}
                    onClick={() =>
                        GAEvents.buttonClick('Card', 'Link Click', props.link)
                    }
                >
                    <div className={`${style.tile} ${theme[props.style]}`}>
                        <div
                            className={style.tile_bg}
                            style={{ backgroundColor: props.bgColor }}
                        >
                            {props.bgResponsive ? (
                                <>
                                    <div
                                        className={style.main}
                                        style={{
                                            backgroundColor: props.bgColor,
                                        }}
                                    >
                                        <Image
                                            alt={props.title}
                                            src={props.bg}
                                            layout='fill'
                                            objectFit={
                                                props.contain
                                                    ? 'contain'
                                                    : 'cover'
                                            }
                                            priority={true}
                                            quality={90}
                                        />
                                    </div>
                                    <div
                                        className={style.responsive}
                                        style={{
                                            backgroundColor: props.bgColor,
                                        }}
                                    >
                                        <Image
                                            alt={props.title}
                                            src={props.bgResponsive}
                                            layout='fill'
                                            objectFit={
                                                props.contain
                                                    ? 'contain'
                                                    : 'cover'
                                            }
                                            priority={true}
                                            quality={90}
                                        />
                                    </div>
                                </>
                            ) : (
                                <Image
                                    alt={props.title}
                                    src={props.bg}
                                    layout='fill'
                                    objectFit='cover'
                                    priority={true}
                                    quality={90}
                                />
                            )}
                        </div>
                        <div className={style.text}>
                            <TextTitle
                                title={props.title}
                                text={props.text}
                                theme={props.style}
                                description={props.description}
                                direction={props.direction}
                                buttonText={props.buttonText}
                            />
                        </div>
                    </div>
                </a>
            </LinkComponent>
        </InView>
    );
}
