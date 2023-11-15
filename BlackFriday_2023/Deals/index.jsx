import { useInView } from 'react-intersection-observer';
import style from './style.module.scss';
import Image from 'next/image';
import Slider from '../../BlackFriday_2023/WordSlider';

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
	return (
		<section className={style.deals}>
			<div className={style.wrapper}>
				<div className={style.content}>
					<h2 className={`${style.title} ${inView ? style.animation_main_title : ''}`}>{props.title}</h2>
					<p
						className={`${style.text} ${inView ? style.animation_main_text : ''}`}
						ref={ref}>
						{props.text}
					</p>
					<div className={style.deals_grid}>
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
									}`}>
									<h3
										className={`${style.card_title} ${
											setInview(index) ? style.animation_title : ''
										}`}>
										{item.title}
									</h3>
									<p className={`${style.card_text} ${setInview(index) ? style.animation_text : ''}`}>
										{item.text}
									</p>
									<div
										className={style.card_price_wrapp}
										ref={setRef(index)}>
										<span
											className={`${style.item_active_price} ${
												setInview(index) ? style.animation__scale : ''
											}`}>
											{item.active_price}
										</span>
										<div
											className={`${style.item_unactive_price} ${
												setInview(index) ? style.animation__scale_through : ''
											}`}>
											{item.nonactive_price}
											<span
												className={`${style.line__through} ${
													setInview(index) ? style.animation__through : ''
												}`}></span>
										</div>
									</div>
									<button
										className={`${style.card_button} ${
											setInview(index) ? style.animation__scale : ''
										}`}
										onClick={props.onClick}>
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
									<div className={style.taggers_image}>
										<Image
											src={getTaggersImage(index)}
											alt={item.title}
											layout='fill'
											objectFit='contain'
											quality={100}
										/>
									</div>
									<div
										className={`${
											item.image_right ? style.upper_ribbon : style.upper_ribbon_left
										}`}>
										{item.upper_ribbon_text}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<Slider
					text={
						<>
							Black
							<br />
							Friday
						</>
					}
				/>
			</div>
		</section>
	);
};

export default Deals;
