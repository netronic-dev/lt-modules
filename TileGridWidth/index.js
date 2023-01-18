import style from "./style.module.scss";
import { TitleText } from "../TitleText";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useGAEvents } from "../../context/GAEventsProvider";
import { InView } from "react-intersection-observer";

const theme = {
	White: "white_tile",
	Black: "black_tile",
};

export function TileGridWidth(props) {
	const GAEvents = useGAEvents();
	function sectionWasInView(sectionName) {
		GAEvents.sectionInView(sectionName);
	}
	return (
		<InView
			as="div"
			onChange={(inView, entry) =>
				inView && sectionWasInView(`Card ${props.title || ""}`)
			}
		>
			<div
				className={`${style.tile} ${theme[props.style]}`}
				style={{ height: props.height }}
			>
				<Link href={props.link}>
					<a
						onClick={() =>
							GAEvents.buttonClick("Card", "Link Click", props.link)
						}
					>
						{props.bg ? (
							<div
								className={style.tile_bg}
								style={{ backgroundColor: props.bgColor }}
							>
								<Image
									alt={props.title}
									src={props.bg}
									priority={true}
									layout="fill"
									objectPosition={
										props.objectPosition ? props.objectPosition : "50% 50%"
									}
									objectFit={props.contain ? "contain" : "cover"}
								/>
							</div>
						) : (
							<div className="tile_bg_responsive">
								<div
									className="tile_bg_desktop"
									style={{ backgroundColor: props.bgColor }}
								>
									<Image
										alt={props.title}
										src={props.bgDesktop}
										layout="fill"
										priority={true}
										objectPosition={
											props.objectPosition ? props.objectPosition : "50% 50%"
										}
										objectFit={props.contain ? "contain" : "cover"}
									/>
								</div>
								<div
									className="tile_bg_mobile"
									style={{ backgroundColor: props.bgColor }}
								>
									<Image
										alt={props.title}
										src={props.bgResponsive}
										layout="fill"
										objectPosition={
											props.objectPosition ? props.objectPosition : "50% 50%"
										}
										priority={true}
										objectFit={props.contain ? "contain" : "cover"}
									/>
								</div>
							</div>
						)}
						<div className={style.text}>
							<TitleText
								title={props.title}
								text={props.text}
								theme={props.style}
								buttonText={props.buttonText}
							/>
						</div>
					</a>
				</Link>
			</div>
		</InView>
	);
}

export function TileGridWidthLeft(props) {
	const GAEvents = useGAEvents();
	function sectionWasInView(sectionName) {
		GAEvents.sectionInView(sectionName);
	}
	return (
		<InView
			as="div"
			onChange={(inView, entry) =>
				inView && sectionWasInView(`Card ${props.title || ""}`)
			}
		>
			<div
				className={`${theme[props.style]} ${style.tile_left}`}
				style={{ background: props.color, height: props.height }}
			>
				<Link href={props.link}>
					<a
						onClick={() =>
							GAEvents.buttonClick("Card", "Link Click", props.link)
						}
					>
						<div className={style.tile_left_side}>
							<div style={{ background: props.color }} className={style.left}>
								<TitleText
									title={props.title}
									text={props.text}
									theme={props.style}
									buttonText={props.buttonText}
								/>
							</div>
							<div className={style.right}>
								<Image
									priority={true}
									alt={props.title}
									src={props.bg}
									layout="fill"
									objectFit="cover"
									objectPosition="100% 100%"
									quality={90}
								/>
							</div>
						</div>
					</a>
				</Link>
			</div>
		</InView>
	);
}

export function TileGridWidthLeftFull(props) {
	const GAEvents = useGAEvents();
	function sectionWasInView(sectionName) {
		GAEvents.sectionInView(sectionName);
	}
	return (
		<InView
			as="div"
			onChange={(inView, entry) =>
				inView && sectionWasInView(`Card ${props.title || ""}`)
			}
		>
			<div
				className={`${theme[props.style]} ${style.tile_left_full}`}
				style={{ height: props.height }}
			>
				<Link href={props.link}>
					<a
						onClick={() =>
							GAEvents.buttonClick("Card", "Link Click", props.link)
						}
					>
						<div className={style.tile_left_side}>
							<div className={style.tile_bg}>
								<Image
									priority={true}
									alt={props.title}
									src={props.bg}
									layout="fill"
									objectFit="cover"
								/>
							</div>
							<div className={style.left}>
								<TitleText
									title={props.title}
									text={props.text}
									theme={props.style}
									buttonText={props.buttonText}
								/>
							</div>
						</div>
					</a>
				</Link>
			</div>
		</InView>
	);
}
export function TileGridWidthButtons(props) {
	const firstImage = props.firstImage;
	const secondImage = props.secondImage;

	const GAEvents = useGAEvents();

	const [image, setImage] = useState(firstImage);

	function onSwapImage() {
		if (image === firstImage) {
			setImage(secondImage);
		} else {
			setImage(firstImage);
		}
	}
	function sectionWasInView(sectionName) {
		GAEvents.sectionInView(sectionName);
	}
	return (
		<InView
			as="div"
			onChange={(inView, entry) =>
				inView && sectionWasInView(`Card ${props.title || ""}`)
			}
		>
			<div
				className={`${style.tile} ${theme[props.style]}`}
				style={{
					height: props.height,
				}}
			>
				<Link href={props.link}>
					<a
						onClick={() =>
							GAEvents.buttonClick("Card", "Link Click", props.link)
						}
					>
						<div
							className={style.tile_bg}
							style={{ backgroundColor: props.bgColor }}
						>
							<Image
								alt={props.title}
								src={image}
								layout="fill"
								objectFit="contain"
								objectPosition="50% 50%"
								priority={true}
							/>
						</div>
						<div className={style.text}>
							<TitleText
								title={props.title}
								text={props.text}
								theme={props.style}
								buttonText={props.buttonText}
							/>
						</div>
					</a>
				</Link>
				<div className={style.buttons_out}>
					<div className={style.buttons} onClick={onSwapImage}>
						<div
							className={
								image === firstImage ? style.buttonActive : style.buttonInactive
							}
						>
							{props.textFirstButton}
						</div>
						<div
							className={
								image === secondImage
									? style.buttonActive
									: style.buttonInactive
							}
						>
							{props.textSecondButton}
						</div>
					</div>
				</div>
			</div>
		</InView>
	);
}
