import AnchorLink from 'react-anchor-link-smooth-scroll';
import style from './style.module.scss';
import Image from 'next/image';
import Countdown, { CountdownCircleTimer } from 'react-countdown';
import { useState } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

const Count = props => {
	const [dayText, setDayText] = useState('days');
	const targetDate = new Date('2023-11-04T00:00:00').getTime();
	const [ref, inView] = useInView({
		triggerOnce: true,
	});

	const renderer = ({ days, completed }) => {
		days === 1 ? setDayText('day') : null;
		if (completed) {
			return <span className={style.countdown_number}>0</span>;
		} else {
			return <span className={style.countdown_number}>{days}</span>;
		}
	};
	return (
		<section className={style.main}>
			<div className={style.wrapper}>
				<div className={style.content}>
					<h2
						className={`${style.title} ${
							inView ? style.animation__title__up : ''
						}`}
						ref={ref}>
						{props.title}
					</h2>
					<div
						className={`${style.countdown} ${
							inView ? style.animation__countdown__up : ''
						}`}>
						<Countdown
							date={targetDate}
							renderer={renderer}
						/>
					</div>
					<span
						className={`${style.days__text} ${
							inView ? style.animation__countdown_text__up : ''
						}`}>
						{dayText}
					</span>
					<p
						className={`${style.text} ${
							inView ? style.animation__text__up : ''
						}`}>
						{props.text}
					</p>
					<AnchorLink
						className={`${style.button} ${
							inView ? style.animation__btn__up : ''
						}`}
						href='#sale'
						offset='200'>
						{props.buttonText}
					</AnchorLink>
					<div
						className={`${style.content__image} ${
							inView ? style.animation__halloween_logo__up : ''
						}`}>
						<Image
							src={props.halloween_image}
							alt=''
						/>
					</div>
				</div>
			</div>
			<div
				className={`${style.pumpkins__image} ${
					inView ? style.animation_rtl : ''
				}`}>
				<Image
					src={props.pumpkins_image}
					alt='pumpkins image'
					layout='fill'
					objectFit='contain'
				/>
			</div>
			<div
				className={`${style.bats__image} ${
					inView ? style.animation_rotate_and_scale : ''
				}`}>
				<Image
					src={props.bats_image}
					alt='pumpkins image'
					layout='fill'
					objectFit='contain'
				/>
			</div>
		</section>
	);
};

export default Count;
