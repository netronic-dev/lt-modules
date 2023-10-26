import Image from 'next/image';
import { InputsWName } from '../Form/Inputs';
import style from './style.module.scss';
import { useInView } from 'react-intersection-observer';
import RunningText from '../Main/RunningText';

const Form = (props) => {
	const [ref, inView] = useInView({
		triggerOnce: true,
	});
	const spiderWebSVG = (
		<svg
			width='350'
			height='363'
			viewBox='0 0 350 363'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<g clipPath='url(#clip0_2_1171)'>
				<path
					d='M72.4615 -90.1217C90.9231 -60.5301 154.308 42.4241 212.769 165.106'
					stroke='#16001A'
					strokeWidth='0.5'
					strokeMiterlimit='10'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M348.154 39.9581C348.154 39.9581 245.385 38.7251 145.077 34.4097'
					stroke='#16001A'
					strokeWidth='0.5'
					strokeMiterlimit='10'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M-112.769 103.457L145.077 35.0262'
					stroke='#16001A'
					strokeWidth='0.5'
					strokeMiterlimit='10'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M129.692 160.791L144.462 33.7932L10.9231 199.63'
					stroke='#16001A'
					strokeWidth='0.5'
					strokeMiterlimit='10'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M258.923 -106.767L145.077 35.0262L-21.6923 -32.7879'
					stroke='#16001A'
					strokeWidth='0.5'
					strokeMiterlimit='10'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M222 -61.1465C222 -61.1465 154.308 -38.9528 89.0769 -64.229C89.0769 -64.229 69.3846 -17.3756 20.1538 -16.7591C20.1538 -16.7591 38 43.6571 1.0769 72.0158C1.0769 72.0158 60.1538 93.593 53.3846 147.228C53.3846 147.228 95.2307 125.034 129.692 151.543C129.692 151.543 166.615 128.117 206.615 155.242C206.615 155.242 219.538 83.7291 273.692 38.7252C273.692 38.7252 224.462 35.0262 222 -61.1465Z'
					stroke='#16001A'
					strokeWidth='0.5'
					strokeMiterlimit='10'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M196.769 -29.0889C196.769 -29.0889 150.615 -18.6086 105.077 -35.8704C105.077 -35.8704 90.3077 -1.96329 56.4615 -1.96329C56.4615 -1.96329 66.9231 42.4241 41.0769 62.1519C41.0769 62.1519 84.1538 78.1807 79.2307 115.787C79.2307 115.787 109.385 105.306 133.385 123.185C133.385 123.185 161.077 100.374 188.154 118.869C188.154 118.869 195.538 68.3168 233.692 36.8757C234.308 37.4922 198 37.4922 196.769 -29.0889Z'
					stroke='#16001A'
					strokeWidth='0.5'
					strokeMiterlimit='10'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M179.538 -8.12816C179.538 -8.12816 178.923 27.0119 206.615 37.4923C206.615 37.4923 179.538 63.3849 176.462 94.826C176.462 94.826 156.769 86.8116 136.462 99.758C136.462 99.758 132.769 81.2632 106.308 80.6467C106.308 80.6467 103.846 55.987 81.0769 51.6716C81.0769 51.6716 101.385 38.7252 98.3077 16.5315C98.3077 16.5315 121.692 14.0656 120.462 -8.12816C121.077 -8.74465 156.154 4.20168 179.538 -8.12816Z'
					stroke='#16001A'
					strokeWidth='0.5'
					strokeMiterlimit='10'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M79.8462 7.90051C79.8462 7.90051 86.6154 36.2592 69.3846 54.7539'
					stroke='#16001A'
					strokeWidth='0.5'
					strokeMiterlimit='10'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M167.846 6.6676C167.846 6.6676 170.923 28.8613 184.462 36.2592C184.462 36.2592 169.692 54.1375 167.231 76.3312C167.231 76.3312 148.154 72.6323 140.154 80.0302C140.154 80.0302 132.769 63.3849 119.846 65.2344C119.846 65.2344 121.077 47.9726 109.385 44.2736C109.385 44.2736 119.846 35.0262 114.923 22.0799C114.923 22.0799 127.846 17.148 127.846 4.81812C127.846 4.81812 150.615 15.2985 167.846 6.6676Z'
					stroke='#16001A'
					strokeWidth='0.5'
					strokeMiterlimit='10'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M169.077 35.6428C169.077 35.6428 160.462 44.8901 158 59.686C158 59.686 149.385 57.22 140.769 64.0014C140.769 64.0014 138.923 54.754 130.308 51.0551C130.308 51.0551 129.077 43.6572 123.538 40.5747C123.538 40.5747 129.077 33.1768 126.615 27.6284C126.615 27.6284 134.615 25.1624 134.615 18.381C134.615 18.381 146.923 26.3954 155.538 22.0799C156.154 21.4634 158 32.5603 169.077 35.6428Z'
					stroke='#16001A'
					strokeWidth='0.5'
					strokeMiterlimit='10'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</g>
			<defs>
				<clipPath id='clip0_2_1171'>
					<rect
						width='350'
						height='363'
						rx='20'
						fill='white'
					/>
				</clipPath>
			</defs>
		</svg>
	);

	return (
		<section className={style.main}>
			<div className={style.content}>
				<h2
					className={style.title}
					id='sale'>
					{props.title}
				</h2>
				<p
					className={style.text}
					ref={ref}>
					{props.text}
				</p>
				<InputsWName
					buttonText={props.buttonText}
					agreementText={props.agreementText}
					destinationURL={props.destinationURL}
					orderName={props.orderName}
					namePlaceholder={props.namePlaceholder}
					callPlaceholder={props.callPlaceholder}
					thankYouPage={props.thankYouPage}
				/>
			</div>

			<div className={`${style.spider_web} ${inView ? style.scaleAnimation : ''}`}>{spiderWebSVG}</div>
			<div className={`${style.spider} ${inView ? style.scaleAnimationAndMove : ''}`}>{spiderSVG}</div>
			<div className={`${style.thread__of__web} ${inView ? style.moveThread : ''}`}></div>
			{inView ? (
				<>
					<div className={`${style.main_ribbon} ${inView ? style.animation_ribbon_1 : ''}`}>
						<div className={`${style.ribbon__text} ${style.ribbon__text_1}`}>Halloween Special Offer</div>
						<div className={` ${style.ribbon__text} ${style.ribbon__text_2}`}>Halloween Special Offer</div>
						<div className={` ${style.ribbon__text} ${style.ribbon__text_3}`}>Halloween Special Offer</div>
						<div className={` ${style.ribbon__text} ${style.ribbon__text_4}`}>Halloween Special Offer</div>
					</div>
					<div className={`${style.main_ribbon_2} ${inView ? style.animation_ribbon_2 : ''}`}>
						F<div className={`${style.ribbon__text} ${style.ribbon__text_1}`}>Halloween Special Offer</div>
						<div className={` ${style.ribbon__text} ${style.ribbon__text_2}`}>Halloween Special Offer</div>
						<div className={` ${style.ribbon__text} ${style.ribbon__text_3}`}>Halloween Special Offer</div>
						<div className={` ${style.ribbon__text} ${style.ribbon__text_4}`}>Halloween Special Offer</div>
					</div>
					<div className={`${style.main_ribbon_3} ${inView ? style.animation_ribbon_3 : ''}`}>
						<div className={`${style.ribbon__text} ${style.ribbon__text_1}`}>Halloween Special Offer</div>
						<div className={` ${style.ribbon__text} ${style.ribbon__text_2}`}>Halloween Special Offer</div>
						<div className={` ${style.ribbon__text} ${style.ribbon__text_3}`}>Halloween Special Offer</div>
						<div className={` ${style.ribbon__text} ${style.ribbon__text_4}`}>Halloween Special Offer</div>
					</div>
				</>
			) : null}
		</section>
	);
};

export default Form;

const spiderSVG = (
	<svg
		width='99'
		height='57'
		viewBox='0 0 99 57'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M67.3846 22.4765C67.3846 34.1898 59.3846 44.0537 49.5385 44.0537C39.6923 44.0537 31.6923 34.1898 31.6923 22.4765C31.6923 10.7631 39.6923 0.899232 49.5385 0.899232C59.3846 0.28274 67.3846 10.1466 67.3846 22.4765Z'
			fill='#16001A'
		/>
		<path
			d='M57.5384 46.5196C57.5384 52.0681 53.8461 56.3835 49.5384 56.3835C45.2308 56.3835 41.5385 52.0681 41.5385 46.5196C41.5385 40.9712 45.2308 36.6558 49.5384 36.6558C53.8461 36.6558 57.5384 40.9712 57.5384 46.5196Z'
			fill='#16001A'
		/>
		<path
			d='M81.5385 11.996L62.4615 17.5444L59.3846 14.462L81.5385 9.53003L96.9231 16.3115L81.5385 11.996Z'
			fill='#16001A'
		/>
		<path
			d='M83.3846 23.7093L64.9231 29.2578L61.8462 24.9423L84 20.0104L98.1539 30.4907L83.3846 23.7093Z'
			fill='#16001A'
		/>
		<path
			d='M84 40.9711L63.0769 36.0392V29.8743L86.4615 37.8887L95.0769 55.1504L84 40.9711Z'
			fill='#16001A'
		/>
		<path
			d='M17.5385 11.996L36.6154 17.5444L39.6923 14.462L17.5385 9.53003L2.15384 16.3115L17.5385 11.996Z'
			fill='#16001A'
		/>
		<path
			d='M15.6923 23.7093L34.1538 29.2578L37.2308 24.9423L15.0769 20.0104L0.923065 30.4907L15.6923 23.7093Z'
			fill='#16001A'
		/>
		<path
			d='M15.0769 40.9711L36 36.0392V29.8743L12.6154 37.8887L4 55.1504L15.0769 40.9711Z'
			fill='#16001A'
		/>
	</svg>
);
