import style from './style.module.scss';

export default function Slider(props) {
	return (
		<div
			className={`${style.slider} ${
				props.className ? props.className : ''
			}`}
		>
			<div
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
						props.second
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
