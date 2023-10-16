import Image from 'next/image';
import { FunctionComponent, ReactNode } from 'react';
import style from './style.module.scss';

interface EventLocationProps {
	title: ReactNode;
	placeName: string;
	placeText: ReactNode;
	mapImage: string;
	dateName: string;
	dateText: string;
	timeName?: string;
	timeText?: string;
	bg_figure?: string;
	lt_convention?: boolean;
	sizesMap?: boolean;
}

const EventLocation: FunctionComponent<EventLocationProps> = props => {
	return (
		<section className={style.section}>
			<div className={style.how_find}>
				<div className={style.text_wrapper}>
					<h2
						className={
							props.lt_convention ? style.title_new : style.title
						}>
						{props.title}
					</h2>
					<div className={style.cell_row}>
						<div className={style.cell}>
							<div className={style.cell_title}>
								{calendarIcon}
								{props.dateName}
							</div>
							<p className={style.cell__text}>{props.dateText}</p>
						</div>
						{props.timeText ? (
							<div className={style.cell}>
								<div className={style.cell_title}>
									{timeIcon}
									{props.timeName}
								</div>
								<p className={style.cell__text}>
									{props.timeText}
								</p>
							</div>
						) : null}
						<div className={style.cell}>
							<div className={style.cell_title}>
								{placeIcon}
								{props.placeName}
							</div>
							<p className={style.cell__text}>
								{props.placeText}
							</p>
						</div>
					</div>
				</div>
				{props.mapImage && (
					<div
						className={`${style.map} ${
							props.sizesMap ? style.map_sizes : ''
						}`}>
						<img src={props.mapImage} />
					</div>
				)}
			</div>
			{props.bg_figure && (
				<div
					className={
						props.lt_convention
							? style.bg_figure_conv
							: style.bg_figure
					}>
					<Image
						src={props.bg_figure}
						layout='fill'
						objectFit='contain'
					/>
				</div>
			)}
		</section>
	);
};

export default EventLocation;

const placeIcon = (
	<svg
		width='24'
		height='25'
		viewBox='0 0 24 25'
		fill='none'
		className={style.icon}>
		<path
			d='M12 2.89062C8.13 2.89062 5 6.02063 5 9.89062C5 15.1406 12 22.8906 12 22.8906C12 22.8906 19 15.1406 19 9.89062C19 6.02063 15.87 2.89062 12 2.89062ZM7 9.89062C7 7.13062 9.24 4.89062 12 4.89062C14.76 4.89062 17 7.13062 17 9.89062C17 12.7706 14.12 17.0806 12 19.7706C9.92 17.1006 7 12.7406 7 9.89062Z'
			fill='#8E8E8E'
		/>
		<path
			d='M12 12.3906C13.3807 12.3906 14.5 11.2713 14.5 9.89062C14.5 8.50991 13.3807 7.39062 12 7.39062C10.6193 7.39062 9.5 8.50991 9.5 9.89062C9.5 11.2713 10.6193 12.3906 12 12.3906Z'
			fill='#8E8E8E'
		/>
	</svg>
);

const calendarIcon = (
	<svg
		width='24'
		height='23'
		viewBox='0 0 20 23'
		fill='none'
		className={style.icon}>
		<path
			d='M4.43087 10.0548H6.5545V12.2467H4.43087V10.0548ZM19.2963 4.57516V19.9183C19.2963 21.1238 18.3407 22.1102 17.1727 22.1102H2.30723C1.12861 22.1102 0.183594 21.1238 0.183594 19.9183L0.194212 4.57516C0.194212 3.36962 1.12861 2.38328 2.30723 2.38328H3.36905V0.191406H5.49268V2.38328H13.9872V0.191406H16.1109V2.38328H17.1727C18.3407 2.38328 19.2963 3.36962 19.2963 4.57516ZM2.30723 6.76703H17.1727V4.57516H2.30723V6.76703ZM17.1727 19.9183V8.95891H2.30723V19.9183H17.1727ZM12.9254 12.2467H15.049V10.0548H12.9254V12.2467ZM8.67814 12.2467H10.8018V10.0548H8.67814V12.2467Z'
			fill='#8E8E8E'
		/>
	</svg>
);

const timeIcon = (
	<svg
		width='24'
		height='24'
		viewBox='0 0 17 17'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={style.icon}>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M8.72145 1.84968C7.02406 1.85099 5.39672 2.52653 4.19741 3.72769C2.99811 4.92885 2.32508 6.55724 2.32639 8.25462C2.32704 9.09508 2.49323 9.92718 2.81546 10.7034C3.13769 11.4797 3.60965 12.1848 4.20441 12.7787C4.79916 13.3725 5.50506 13.8434 6.28179 14.1644C7.05852 14.4854 7.89088 14.6503 8.73134 14.6497C9.5718 14.649 10.4039 14.4828 11.1801 14.1606C11.9564 13.8384 12.6615 13.3664 13.2554 12.7717C13.8492 12.1769 14.3201 11.471 14.6411 10.6943C14.9621 9.91755 15.127 9.08519 15.1264 8.24473C15.1251 6.54735 14.4495 4.92 13.2484 3.7207C12.0472 2.52139 10.4188 1.84837 8.72145 1.84968ZM3.06517 2.59719C4.5643 1.09574 6.59848 0.251318 8.72021 0.249679C10.8419 0.24804 12.8774 1.08932 14.3789 2.58845C15.8803 4.08759 16.7248 6.12177 16.7264 8.2435C16.7272 9.29407 16.5211 10.3345 16.1198 11.3054C15.7185 12.2763 15.1299 13.1587 14.3876 13.9022C13.6453 14.6456 12.7639 15.2356 11.7936 15.6383C10.8233 16.0411 9.78315 16.2489 8.73257 16.2497C7.682 16.2505 6.64155 16.0444 5.67064 15.6431C4.69972 15.2418 3.81735 14.6532 3.07391 13.9109C2.33047 13.1686 1.74051 12.2871 1.33772 11.3169C0.934936 10.3466 0.727207 9.30643 0.726395 8.25586C0.724756 6.13413 1.56604 4.09864 3.06517 2.59719ZM8.7233 4.24968C9.16513 4.24934 9.52358 4.60723 9.52392 5.04906L9.52614 7.91769L11.6935 10.0817C12.0062 10.3939 12.0065 10.9004 11.6944 11.2131C11.3822 11.5257 10.8757 11.5261 10.563 11.2139L8.16114 8.8158C8.011 8.66589 7.92656 8.46247 7.92639 8.25029L7.92392 5.0503C7.92358 4.60847 8.28147 4.25002 8.7233 4.24968Z'
			fill='#8E8E8E'
		/>
	</svg>
);
