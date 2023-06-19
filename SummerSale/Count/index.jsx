import AnchorLink from 'react-anchor-link-smooth-scroll';
import style from './style.module.scss';
import Image from 'next/image';

const Count = (props) => {
	return (
		<section className={style.main}>
			<div className={style.content}>
				<h2 className={style.title}>{props.title}</h2>
				<div className={style.counter_wrapper}>
					<div className={style.counter_item}>3</div>
					<div className={style.counter_item}>6</div>
					<div className={style.counter_item}>4</div>
				</div>
				<span className={style.text}>{props.text}</span>
				<AnchorLink href='#sale' offset='200'>
					<button className={style.button}>{props.buttonText}</button>
				</AnchorLink>
				<div className={style.under_button_text}>
					{props.underButtonText}
				</div>
			</div>
			<div className={style.bacground_text_wrap}>
				<p className={style.bacground_text}>{props.bacgroundText}</p>
			</div>
			<div className={style.right_ribbons}>
				<Image
					src={props.right_ribons}
					alt='ribbons'
					layout='fill'
					objectFit='cover'
				/>
			</div>
			<div className={style.left_ribbons}>
				<Image
					src={props.left_ribons}
					alt='ribbons'
					layout='fill'
					objectFit='cover'
				/>
			</div>
		</section>
	);
};

export default Count;
