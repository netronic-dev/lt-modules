import Image from 'next/image';
import style from './style.module.scss';
import Link from 'next/link';

const Page = props => {
	return (
		<section className={style.main}>
			<h2 className={style.title}>{props.title}</h2>
			<p className={style.text}>{props.upperText}</p>
			<div className={style.devider}></div>
			<p className={style.text}>{props.underDeviderText}</p>
			<div className={style.cells_wrapper}>
				<div className={style.cards_cell}>
					{props.data.map((item, index) => (
						<div
							className={style.cell}
							key={index}>
							<div className={style.image_wrap}>
								<Image
									src={item.image}
									alt='icon'
								/>
							</div>

							<p className={style.cell_text}>{item.text}</p>
						</div>
					))}
				</div>
				<div className={style.image_cell}>
					<Image
						src={props.heroImage}
						alt='heroImage'
						layout='fill'
						objectFit='cover'
						objectPosition='100% 0'
					/>
				</div>
				<div className={style.image_cell_lap}>
					<Image
						src={props.heroImage_lap}
						alt='heroImage'
						layout='fill'
						objectFit='cover'
						objectPosition='50% 0'
					/>
				</div>
			</div>
			<div className={style.under_cells_text}>
				<p className={style.text}>{props.underCellsText}</p>
			</div>
			{props.buttonText && props.register_text ? (
				<div className={style.register_block}>
					<p className={style.register_text}>{props.register_text}</p>
					<Link
						href={props.link || '/iaapa-vienna-2023/#register'}
						scroll={false}>
						<a className={style.register_button}>
							{props.buttonText}
						</a>
					</Link>
				</div>
			) : null}
		</section>
	);
};

export default Page;
