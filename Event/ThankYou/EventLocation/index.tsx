import { FunctionComponent, ReactNode } from "react";
import style from "./style.module.scss";

interface EventLocationProps {
	title: ReactNode;
	placeName: string;
	placeText: ReactNode;
	mapImage: string;
}

const EventLocation: FunctionComponent<EventLocationProps> = (props) => {
	return (
		<section>
			<div className={style.how_find}>
				<div className={style.text_wrapper}>
					<h2 className={style.title}>{props.title}</h2>
					<div className={style.cell}>
						<div className={style.cell_title}>
							{placeIcon}
							{props.placeName}
						</div>
						<p className={style.cell__text}>{props.placeText}</p>
					</div>
				</div>
				{props.mapImage && (
					<div className={style.map}>
						<img src={props.mapImage} />
					</div>
				)}
			</div>
		</section>
	);
};

export default EventLocation;

const placeIcon = (
	<svg
		width="24"
		height="25"
		viewBox="0 0 24 25"
		fill="none"
		className={style.place_icon}
	>
		<path
			d="M12 2.89062C8.13 2.89062 5 6.02063 5 9.89062C5 15.1406 12 22.8906 12 22.8906C12 22.8906 19 15.1406 19 9.89062C19 6.02063 15.87 2.89062 12 2.89062ZM7 9.89062C7 7.13062 9.24 4.89062 12 4.89062C14.76 4.89062 17 7.13062 17 9.89062C17 12.7706 14.12 17.0806 12 19.7706C9.92 17.1006 7 12.7406 7 9.89062Z"
			fill="#8E8E8E"
		/>
		<path
			d="M12 12.3906C13.3807 12.3906 14.5 11.2713 14.5 9.89062C14.5 8.50991 13.3807 7.39062 12 7.39062C10.6193 7.39062 9.5 8.50991 9.5 9.89062C9.5 11.2713 10.6193 12.3906 12 12.3906Z"
			fill="#8E8E8E"
		/>
	</svg>
);
