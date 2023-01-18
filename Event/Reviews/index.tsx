import { FunctionComponent, ReactNode } from "react";
import SliderReviewsLP from "../../Slider/SliderReviewsLP";
import CTA from "../CTA";
import style from "./style.module.scss";

interface ReviewsProps {
	title?: ReactNode | string;
	data?: SliderCell[];
	cta_text?: string;
	cta_buttonText?: string;
	cta_bgColor?: string;
	cta_button_onClick?: () => void;
}

interface SliderCell {
	picture?: string;
	videoImg?: string;
	image?: string;
	videoLink?: string;
	alt?: string;
	text?: string;
	name?: string;
	location?: string;
}

const Reviews: FunctionComponent<ReviewsProps> = (props) => {
	return (
		<section className={style.section}>
			{props.title && <h2 className={style.title}>{props.title}</h2>}
			{props.data && (
				<SliderReviewsLP
					right
					data={props.data}
					theme="default" // or default
				/>
			)}
			{props.cta_text && props.cta_buttonText && props.cta_button_onClick && (
				<CTA
					bgColor={props.cta_bgColor}
					text={props.cta_text}
					buttonText={props.cta_buttonText}
					onClick={props.cta_button_onClick}
				/>
			)}
		</section>
	);
};

export default Reviews;
