import AnchorLink from 'react-anchor-link-smooth-scroll';
import style from './style.module.scss';
import Image from 'next/image';
import Countdown, { CountdownCircleTimer } from 'react-countdown';
import { useState } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import RunningText from '../Main/RunningText';

const Count = (props) => {
	const [dayText, setDayText] = useState(props.days);
	const targetDate = new Date('2023-12-01T00:00:00').getTime();
	const [ref, inView] = useInView({
		triggerOnce: true,
	});

	const renderer = ({ days, completed }) => {
		days === 1 ? setDayText(props.day) : null;
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
						className={`${style.title} ${inView ? style.animation__title__up : ''}`}
						ref={ref}>
						{props.title}
					</h2>
					<div className={`${style.countdown} ${inView ? style.animation__countdown__up : ''}`}>
						<Countdown
							date={targetDate}
							renderer={renderer}
						/>
					</div>
					<span className={`${style.days__text} ${inView ? style.animation__countdown_text__up : ''}`}>
						{dayText}
					</span>
					<p className={`${style.text} ${inView ? style.animation__text__up : ''}`}>{props.text}</p>
					<AnchorLink
						href='#set'
						offset='80'>
						<button className={`${style.button} ${inView ? style.animation__btn__up : ''}`}>
							{props.buttonText}
						</button>
					</AnchorLink>
				</div>
			</div>
			<div className={style.bg_image}>
				<Image
					src={props.countBgImage}
					alt='pumpkins image'
					layout='fill'
					objectFit='cover'
				/>
			</div>
			<RunningText className='count_bottom' />
		</section>
	);
};

export default Count;
