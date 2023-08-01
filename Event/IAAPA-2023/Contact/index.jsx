import Image from 'next/image';
import style from './style.module.scss';
import Link from 'next/link';

const Page = (props) => {
	return (
		<section className={style.main}>
			<div className={style.content}>
				<h2 className={style.title}>{props.title}</h2>
				<p className={style.text}>{props.text}</p>
				<div className={style.cell_wrapper}>
					{props.data.map((item, index) => (
						<div className={style.cell} key={index}>
							<span className={style.cell_title}>
								{item.title}
							</span>
							<div className={style.devider}></div>
							<Link href={`tel:${item.phone1}`}>
								<a className={style.link}>
									{item.phone1}
								</a>
							</Link>
							{item.email ? (
								<Link href={`mailto:${item.email}`}>
									<a className={style.link}>
										{item.email}
									</a>
								</Link>
							) : null}
							<Link href={`tel:${item.phone2}`}>
								<a className={style.link}>
									{item.phone2}
								</a>
							</Link>
						</div>
					))}
				</div>
			</div>
			<div className={style.background_image}>
				<Image
					src={props.image}
					alt='Netronic Logo'
					layout='fill'
					objectFit='cover'
				/>
			</div>
		</section>
	);
};

export default Page;
