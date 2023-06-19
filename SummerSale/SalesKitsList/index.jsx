import Image from 'next/image';
import style from './style.module.scss';
import WordSlider from '../WordSlider';

const SaleKitsList = (props) => {
	return (
		<section className={style.main}>
			<div className={style.content}>
				<h2 className={style.title}>{props.title}</h2>
				{props.data.map((item, index) => (
					<div
						className={`${style.item} ${
							item.second
								? style.item_second
								: item.eclipse
								? style.item_third
								: null
						}`}
						key={index}
					>
						<div className={style.item_content}>
							<p className={style.text}>{item.text}</p>
							<div
								className={
									item.second
										? style.item_image_second
										: item.eclipse
										? style.item_image_eclipse
										: style.item_image
								}
							>
								<Image
									src={item.image}
									alt={item.image_alt}
									layout='fill'
									objectFit='cover'
								/>
							</div>
							<WordSlider
								one
								second={item.second}
								className={style.words_slider}
								text={item.sliderWordsText}
							/>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default SaleKitsList;
