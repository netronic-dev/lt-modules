import { FunctionComponent, ReactNode } from "react";
import SliderReviewsLP from "../../Slider/SliderReviewsLP";
import style from "./style.module.scss";

interface ReviewsProps {
	title?: ReactNode | string;
	data?: SliderCell[];
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
		</section>
	);
};

export default Reviews;
