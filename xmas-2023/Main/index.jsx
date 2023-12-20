import AnchorLink from 'react-anchor-link-smooth-scroll';
import style from './style.module.scss';
import Image from 'next/image';
import RunningText from './RunningText';

const parentStyles = {
	position: 'absolute',
	top: '80px',
	right: '-100px',
	transform: 'rotate(25deg)',
};

const Main = (props) => {
	return (
		<section className={style.main}>
			<div className={style.main_inner}>
				<div className={style.content}>
					<h1 className={style.title}>{props.title}</h1>
					<p className={style.sub_title}>{props.sub_title}</p>
					<p className={style.text}>{props.text}</p>
					<AnchorLink
						href='#set'
						offset='80'>
						<button className={style.button}>{props.buttonText}</button>
					</AnchorLink>
				</div>
			</div>
			{/* <div className={style.image_blur_top}>
				<Image
					src={props.image_blur_top}
					layout='fill'
					objectFit='contain'
					objectPosition='50% 50%'
					priority={true}
					quality={100}
				/>
			</div>
			<div className={style.image_text_left}>
				<Image
					src={props.image_text_left}
					layout='fill'
					objectFit='contain'
					objectPosition='50% 50%'
					priority={true}
					quality={100}
				/>
			</div> */}
			<div className={style.image_bg}>
				<Image
					src={props.image_bg}
					layout='fill'
					objectFit='cover'
					objectPosition='80% 50%'
					priority={true}
					quality={100}
				/>
			</div>
			<div className={style.image_bg_mob}>
				<Image
					src={props.image_bg_mob}
					layout='fill'
					objectFit='cover'
					objectPosition='100% 100%'
					priority={true}
					quality={100}
				/>
			</div>
			{/* <div className={style.image_bg_lap}>
				<Image
					src={props.image_bg_lap}
					layout='fill'
					objectFit='cover'
					objectPosition='50% 50%'
					priority={true}
				/>
			</div>
			<div className={style.image_bg_mob}>
				<Image
					src={props.image_bg_mob}
					layout='fill'
					objectFit='cover'
					objectPosition='50% 50%'
					priority={true}
				/>
			</div> */}
			{/* <RunningText styles={parentStyles} /> */}
		</section>
	);
};

export default Main;
