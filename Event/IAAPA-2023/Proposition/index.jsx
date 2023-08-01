import Image from 'next/image';
import style from './style.module.scss';

const Page = (props) => {
	return (
		<section className={style.main}>
			<div className={style.content_wrapper}>
				<h2 className={style.title}>{props.title}</h2>
				<div className={style.cells_wrapper}>
					{props.data.map((item, index) => (
						<div className={style.cell} key={index}>
							<div className={style.image_block} key={index}>
								<Image
									src={item.image}
									alt='icon'
									layout='fill'
									objectFit='contain'
								/>
							</div>
							<div className={style.devider}></div>
							<p className={style.cell_text}>{item.text}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Page;
