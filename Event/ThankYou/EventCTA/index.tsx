import Link from "next/link";
import { FunctionComponent, ReactNode } from "react";
import style from "./style.module.scss";

interface EventCTAProps {
	dateName: string;
	date: string;
	calendarLink: string;
	calendarButtonText: string;
	text: ReactNode;
}

const EventCTA: FunctionComponent<EventCTAProps> = (props) => {
	return (
		<div className={style.event}>
			<div className={style.cell}>
				<div className={style.cell__title}>
					{calendarIcon}
					{props.dateName}
				</div>
				<p className={style.cell__text}>{props.date}</p>
			</div>
			<p className={style.text}>{props.text}</p>
			<div className={style.button_outer}>
				<Link href={props.calendarLink}>
					<a target="_blank">
						<button className={style.button}>
							{calendar_icon_button}
							{props.calendarButtonText}
						</button>
					</a>
				</Link>
			</div>
		</div>
	);
};

export default EventCTA;

const calendarIcon = (
	<svg
		width="24"
		height="25"
		viewBox="0 0 24 25"
		fill="none"
		className={style.calendar_icon}
	>
		<path
			d="M7 11.8906H9V13.8906H7V11.8906ZM21 6.89062V20.8906C21 21.9906 20.1 22.8906 19 22.8906H5C3.89 22.8906 3 21.9906 3 20.8906L3.01 6.89062C3.01 5.79063 3.89 4.89062 5 4.89062H6V2.89062H8V4.89062H16V2.89062H18V4.89062H19C20.1 4.89062 21 5.79063 21 6.89062ZM5 8.89062H19V6.89062H5V8.89062ZM19 20.8906V10.8906H5V20.8906H19ZM15 13.8906H17V11.8906H15V13.8906ZM11 13.8906H13V11.8906H11V13.8906Z"
			fill="#8E8E8E"
		/>
	</svg>
);
const calendar_icon_button = (
	<svg
		width="24"
		height="25"
		viewBox="0 0 24 25"
		fill="none"
		className={style.calendar_icon_button}
	>
		<path
			d="M19 4.89062H18V2.89062H16V4.89062H8V2.89062H6V4.89062H5C3.89 4.89062 3.01 5.79063 3.01 6.89062L3 20.8906C3 21.9906 3.89 22.8906 5 22.8906H19C20.1 22.8906 21 21.9906 21 20.8906V6.89062C21 5.79063 20.1 4.89062 19 4.89062ZM19 20.8906H5V10.8906H19V20.8906ZM19 8.89062H5V6.89062H19V8.89062ZM12 13.8906H17V18.8906H12V13.8906Z"
			fill="white"
		/>
	</svg>
);
