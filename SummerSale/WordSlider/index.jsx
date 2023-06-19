import style from './style.module.scss';

export default function Slider(props) {
	return (
		<div
			className={`${style.slider} ${
				props.className ? props.className : ''
			}`}
		>
			<div
				// className={
				// 	props.even
				// 		? style.slider_right_item
				// 		: !props.even
				// 		? style.slider_left_item
				// 		: style.slider_left
				// }
				className={
					props.one
						? props.second
							? style.slider_right_one
							: style.slider_left_one
						: style.slider_left
				}
			>
				<p
					className={
						props.blueText || props.even
							? style.blueText
							: style.text
					}
				>
					{props.text}
				</p>
			</div>
			{props.one ? null : (
				<div className={style.slider_right}>
					<p className={style.text}>{props.text}</p>
				</div>
			)}
		</div>
	);
}
