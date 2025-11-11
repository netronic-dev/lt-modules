import style from "./style.module.scss";

export default function Agreement(props) {
	return (
		<div className={`${style.agreement} ${props.style}`}>
			<div
				className={`
        ${style.agreement__checkbox} 
        ${props.active && style.agreement__checkbox_active}
        ${props.checkbox_style}
        ${props.error && style.error}
        `}
				onClick={props.onClick}
			>
				{agreementDot}
			</div>
			<p className={style.agreement__text}>{props.text}</p>
		</div>
	);
}

const agreementDot = (
	<svg
		width="28"
		height="28"
		viewBox="0 0 28 28"
		fill="none"
		className={style.agreement_dot}
	>
		<circle cx="14" cy="14" r="13.5" stroke="white" strokeOpacity="0.5" />
		<path
			d="M11.59 17.58L7.42 13.41L6 14.82L11.59 20.41L23.59 8.41L22.18 7L11.59 17.58Z"
			fill="#0090FF"
		/>
	</svg>
);
