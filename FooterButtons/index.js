import style from "./style.module.scss";
import { useInView } from "react-hook-inview";
import { useModals } from "../../context/ModalsProvider";

const logoses = {
	ltnet: "/ltnet-logo.svg",
	netronic: "/netroniclogo.svg",
	forpost: "/forpost-logo.svg",
	galaxy: "/galaxylogo.svg",
	galaxyBlack: "/galaxylogo-black.svg",
	galaxyPulse: "/galaxypulselogo.svg",
};

const themes = {
	normal: style.block,
	black: style.block_black,
	grey: style.block_grey,
};

export function FooterButtons(props) {
	const [ref, isVisible] = useInView({
		unobserveOnEnter: true,
	});
	const modals = useModals();

	return (
		<>
			<div className={style.footer_buttons__out}>
				<div
					ref={ref}
					key={isVisible ? "footer_buttons-inview" : "footer_buttons"}
					className={`
            ${themes[props.theme || "normal"]}
            zoom-animation
          `}
				>
					<div className={style.left_side}>
						<img src={logoses[props.logoName]} alt={props.logoName} />
						<div className={style.text_block}>
							<p className={style.top}>{props.textTop}</p>
							<p className={style.bottom}>{props.textBottom}</p>
						</div>
					</div>
					<div className={style.right_side}>
						<button
							onClick={modals.NamePhoneModalChangeVisibility}
							className={`${style.button} fade-animation`}
						>
							{props.buttonText}
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
