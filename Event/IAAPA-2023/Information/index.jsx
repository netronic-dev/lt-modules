import Image from 'next/image';
import style from './style.module.scss';
import Link from 'next/link';

const Page = (props) => {
	return (
		<section className={style.main}>
			<h2 className={style.title}>{props.title}</h2>
			<div className={style.even_block}>
				<div className={style.image_block}>
					<Image
						src={props.image}
						alt='Image'
						layout='fill'
						objectFit='cover'
					/>
				</div>
				<div className={style.event_info}>
					{props.data.map((item, index) => (
						<div className={style.info_row} key={index}>
							<div className={style.icon_cell}>
								<div className={style.icon_block}>
									<Image
										src={item.icon}
										alt='icon'
										width={24}
										height={24}
									/>
								</div>
								<span className={style.icon_text}>
									{item.iconText}
								</span>
							</div>
							<span className={style.cell_text}>{item.text}</span>
						</div>
					))}
				</div>
				<Link href={props.button_link}>
					<a className={style.button} rel='nofollow' target='_blank'>
						{props.buttonText}
					</a>
				</Link>
			</div>
		</section>
	);
};

export default Page;
