import { FunctionComponent, MouseEventHandler } from "react";
import style from "./style.module.scss";

interface CTAProps {
	text: string;
	buttonText: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

const CTA: FunctionComponent<CTAProps> = (props) => {
	return (
		<div className={style.cta}>
			<p className={style.text}>{props.text}</p>
			<button onClick={props.onClick} className={style.button}>
				{props.buttonText}
			</button>
		</div>
	);
};

export default CTA;
