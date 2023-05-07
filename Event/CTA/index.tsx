import { FunctionComponent, MouseEventHandler, ReactNode } from 'react';
import style from './style.module.scss';

interface CTAProps {
    text: ReactNode | string;
    buttonText: string;
    bgColor?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const CTA: FunctionComponent<CTAProps> = (props) => {
    return (
        <div
            className={style.cta}
            style={{ background: props.bgColor || '#f0f0f2' }}
        >
            <p className={style.text}>{props.text}</p>
            <button onClick={props.onClick} className={style.button}>
                {props.buttonText}
            </button>
        </div>
    );
};

export default CTA;
