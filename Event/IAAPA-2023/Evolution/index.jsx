import Image from 'next/image';
import style from './style.module.scss';
import Link from 'next/link';

const Evolution = props => {
	const setClassName = index => {
		switch (true) {
			case index === 1:
				return style.cell1;
			case index === 2:
				return style.cell2;
			case index === 3:
				return style.cell3;
			case index === 4:
				return style.cell4;
			default:
				break;
		}
	};
	return (
		<section className={style.evolution}>
			<div className={style.wrapper}>
				<div className={style.content}>
					<h2 className={style.title}>{props.title}</h2>
					<div className={style.descr_grid}>
						<div className={style.image}>
							<Image
								src={props.image}
								alt='new software image'
								layout='fill'
								objectFit='contain'
							/>
						</div>
						<div className={style.descr__text}>{props.text}</div>
						{props.firstRowFeatures.map((item, index) => (
							<div
								className={`${
									style.features__item
								} ${setClassName(index + 1)}`}
								key={index}>
								<div className={style.item__image}>
									<Image
										src={item.icon}
										alt={item.text}
										layout='fill'
										objectFit='contain'
									/>
								</div>
								<span className={style.item__text}>
									{item.text}
								</span>
							</div>
						))}
					</div>
					<div className={style.second_row_features}>
						{props.secondRowFeatures.map((item, index) => (
							<div
								className={style.features__item}
								key={index}>
								<div className={style.item__image}>
									<Image
										src={item.icon}
										alt={item.text}
										layout='fill'
										objectFit='contain'
									/>
								</div>
								<span className={style.item__text}>
									{item.text}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className={style.join_us}>
				<div className={style.wrapper}>
					<div className={style.join_us_content}>
						<p className={style.join_us__text}>
							{props.joinUsText}
						</p>
						<Link
							href='/blog/iaapa-orlando-2023/#register'
							scroll={false}>
							<a className={style.register__button}>
								{props.button_text}
							</a>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Evolution;
