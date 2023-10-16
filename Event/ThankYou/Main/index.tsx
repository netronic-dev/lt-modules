import { FunctionComponent, ReactNode } from 'react';
import style from './style.module.scss';

interface ThankYouProps {
	title: ReactNode;
	subtitle: string;
	lt_convention?: boolean;
	text?: string | React.ReactNode;
}

const ThankYou: FunctionComponent<ThankYouProps> = props => {
	return (
		<section
			className={
				props.lt_convention ? style.thank_you_conv : style.thank_you
			}>
			<div className={style.main}>
				<h1 className={style.title}>{props.title}</h1>
				<p className={style.subtitle}>{props.subtitle}</p>
			</div>
			{props.text && <p className={style.text}>{props.text}</p>}
		</section>
	);
};

export default ThankYou;
