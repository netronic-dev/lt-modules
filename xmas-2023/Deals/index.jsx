import { useInView } from 'react-intersection-observer';
import style from './style.module.scss';
import Image from 'next/image';
import { useModals } from '../../../context/ModalsProvider';
import { useEffect } from 'react';

const Deals = (props) => {
	const [ref, inView] = useInView({
		triggerOnce: true,
	});
	const [ref1, inView1] = useInView({
		triggerOnce: true,
	});
	const [ref2, inView2] = useInView({
		triggerOnce: true,
	});
	const [ref3, inView3] = useInView({
		triggerOnce: true,
	});

	const modal = useModals();

	const setInview = (index) => {
		switch (true) {
			case index === 0:
				return inView1;
			case index === 1:
				return inView2;
			case index === 2:
				return inView3;
		}
	};

	const getTaggersImage = (index) => {
		switch (true) {
			case index === 0:
				return props.taggersF2Image;
			case index === 1:
				return props.taggersLuxImage;
			case index === 2:
				return props.taggersEclipseImage;
		}
	};

	const setRef = (index) => {
		switch (true) {
			case index === 0:
				return ref1;
			case index === 1:
				return ref2;
			case index === 2:
				return ref3;
		}
	};

	const setModal = (index) => {
		switch (true) {
			case index === 0:
				return modal.openPremiumModal;
			case index === 1:
				return modal.openLuxModal;
			case index === 2:
				return modal.openEclipseModal;
		}
	};

	useEffect(() => {
		const handleScroll = () => {
			const scroll = window.scrollY;
			const parallaxElement = document.querySelector('.snow_bg');
			if (parallaxElement) {
				parallaxElement.style.top = `-${scroll * 0.2}px`;
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<section className={style.deals}>
			<div className='snow_bg'></div>
			<div className={style.wrapper}>
				<div className={style.content}>
					<h2 className={`${style.title} ${inView ? style.animation_main_title : ''}`}>{props.title}</h2>
					<p
						className={`${style.text} ${inView ? style.animation_main_text : ''}`}
						ref={ref}>
						{props.text}
					</p>
					<div
						className={style.deals_grid}
						id='set'>
						{props.deals_data.map((item, index) => (
							<div
								className={`${style.deal_card} ${item.image_right ? '' : style.deal_card_right} ${
									setInview(index) ? style.animation__box_shadow : ''
								}`}
								key={index}>
								<div
									className={`${style.card_content} ${
										setInview(index)
											? item.image_right
												? style.animation__left
												: style.animation__right
											: ''
									}`}
									ref={setRef(index)}>
									<h3
										className={`${style.card_title} ${
											setInview(index) ? style.animation_title : ''
										}`}>
										{item.title}
									</h3>
									<p className={`${style.card_text} ${setInview(index) ? style.animation_text : ''}`}>
										{item.text}
									</p>
									<button
										className={`${style.card_button} ${
											setInview(index) ? style.animation__scale : ''
										}`}
										onClick={setModal(index)}>
										{item.btn_text}
									</button>
								</div>
								<div
									className={`${style.card_image} ${
										setInview(index)
											? item.image_right
												? style.animation__right
												: style.animation__left
											: ''
									}`}>
									<Image
										src={item.image}
										alt={item.title}
										layout='fill'
										objectFit='cover'
										quality={100}
									/>
									<div
										className={
											index === 0
												? style.taggers_image_1
												: index === 1
												? style.taggers_image_2
												: style.taggers_image_3
										}>
										<Image
											src={getTaggersImage(index)}
											alt={item.title}
											layout='fill'
											objectFit='contain'
											quality={100}
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Deals;
