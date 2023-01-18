import Link from "next/link";
import style from "./style.module.scss";
import Image from "next/image";
import { useEffect } from "react";
import FooterSocial from "../Footer/Social";

export function ThankYou(props) {
	useEffect(() => {
		window.scroll({ top: 0 });
	}, []);
	return (
		<section className={style.section}>
			<div className={style.wrapper}>
				<div className={style.thank_you}>
					<h2 className={style.title}>{props.title}</h2>
					<p className={style.text}>{props.text}</p>
				</div>
				{props.image && (
					<EventBanner
						link={props.link}
						image={props.image}
						objectFit={props.objectFit}
						objectPosition={props.objectPosition}
						imageResponsive={props.imageResponsive}
						objectFitResponsive={props.objectFitResponsive}
						objectPositionResponsive={props.objectPositionResponsive}
					/>
				)}
				<div className={style.button_outer}>
					<Link href="/">
						<a>
							<button className={style.button}>{props.buttonText}</button>
						</a>
					</Link>
				</div>
			</div>
		</section>
	);
}

function EventBanner(props) {
	return (
		<Link href={props.link}>
			<a>
				<div className={style.event_banner}>
					<div className={style.image}>
						<Image
							quality={90}
							src={props.image}
							layout="fill"
							objectFit={props.objectFit}
							objectPosition={props.objectPosition}
						/>
					</div>
					{props.imageResponsive && (
						<div className={style.image_responsive}>
							<Image
								quality={90}
								src={props.imageResponsive}
								layout="fill"
								objectFit={props.objectFitResponsive}
								objectPosition={props.objectPositionResponsive}
							/>
						</div>
					)}
				</div>
			</a>
		</Link>
	);
}
