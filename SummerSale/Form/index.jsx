import Image from 'next/image';
import { InputsWName } from '../Form/Inputs';
import style from './style.module.scss';

const Form = (props) => {
	return (
		<section className={style.main} id='sale'>
			<div className={style.content}>
				<h2 className={style.title}>{props.title}</h2>
				<p className={style.text}>{props.text}</p>
				<InputsWName
					buttonText={props.buttonText}
					agreementText={props.agreementText}
					agreementSpanText={props.agreementSpanText}
					destinationURL={props.destinationURL}
					orderName={props.orderName}
					namePlaceholder={props.namePlaceholder}
					callPlaceholder={props.callPlaceholder}
				/>
			</div>
			<div className={style.left_ribbon}>
				<Image
					src={props.left_ribbon}
					alt='left ribbon'
					width={883}
					height={632}
				/>
			</div>
			<div className={style.right_ribbon}>
				<Image
					src={props.right_ribbon}
					alt='left ribbon'
					height={622}
					width={550}
				/>
			</div>
			<div className={style.right_blue_ribbon}>
				<Image
					src={props.right_blue_ribbon}
					alt='left ribbon'
					width={723}
					height={622}
				/>
			</div>
		</section>
	);
};

export default Form;
