import style from "./style.module.scss";
import { TitleText, TextTitle } from "../TitleText";
import Link from "next/link";
import Image from "next/image";
import { useGAEvents } from "../../context/GAEventsProvider";

const theme = {
	White: "white_tile",
	Black: "black_tile",
};

export function TileToTile(props) {
	const GAEvents = useGAEvents();
	return (
		<div className={style.tile_to_tile}>
			<Link href={props.linkFirst}>
				<a
					onClick={() =>
						GAEvents.buttonClick("Card", "Link Click", props.linkFirst)
					}
				>
					<div className={`${style.tile} ${theme[props.styleFirst]}`}>
						<div
							className={style.tile_bg}
							style={{ backgroundColor: props.bgColor }}
						>
							<Image
								priority={true}
								alt={props.title}
								src={props.bgOne}
								layout="fill"
								objectPosition={
									props.objectPosition ? props.objectPosition : "50% 50%"
								}
								objectFit={props.contain ? "contain" : "cover"}
							/>
						</div>
						<div className={style.text}>
							<TitleText
								title={props.title}
								text={props.text}
								theme={props.styleFirst}
								buttonText={props.buttonText}
							/>
						</div>
					</div>
				</a>
			</Link>
			<Link href={props.linkSecond}>
				<a
					onClick={() =>
						GAEvents.buttonClick("Card", "Link Click", props.linkSecond)
					}
				>
					<div className={`${style.tile} ${theme[props.styleSecond]}`}>
						<div
							className={style.tile_bg}
							style={{ backgroundColor: props.bgColorTwo }}
						>
							<Image
								priority={true}
								alt={props.title}
								src={props.bgTwo}
								layout="fill"
								objectFit={props.containTwo ? "contain" : "cover"}
								objectPosition={
									props.objectPositionTwo ? props.objectPositionTwo : "50% 50%"
								}
							/>
						</div>
						<div className={style.text}>
							<TitleText
								title={props.titleTwo}
								text={props.textTwo}
								theme={props.styleSecond}
								buttonText={props.buttonText_2}
							/>
						</div>
					</div>
				</a>
			</Link>
		</div>
	);
}

export function TileToTileReverse(props) {
	const GAEvents = useGAEvents();
	return (
		<div className={style.tile_to_tile}>
			{props.title === undefined ? (
				<></>
			) : (
				<Link href={props.linkFirst}>
					<a
						onClick={() =>
							GAEvents.buttonClick("Card", "Link Click", props.linkFirst)
						}
					>
						<div className={`${style.tile} ${theme[props.styleFirst]}`}>
							<div
								className={style.tile_bg}
								style={{ backgroundColor: props.bgColor }}
							>
								<Image
									priority={true}
									alt={props.title}
									src={props.bgOne}
									layout="fill"
									objectPosition={
										props.objectPosition ? props.objectPosition : "50% 50%"
									}
									objectFit={props.contain ? "contain" : "cover"}
								/>
							</div>
							<div className={style.text}>
								<TextTitle
									buttonText={props.buttonText}
									title={props.title}
									text={props.text}
									theme={props.styleFirst}
									description={props.description}
								/>
							</div>
						</div>
					</a>
				</Link>
			)}
			{props.titleTwo === undefined ? (
				<></>
			) : (
				<Link href={props.linkSecond}>
					<a
						onClick={() =>
							GAEvents.buttonClick("Card", "Link Click", props.linkSecond)
						}
					>
						<div className={`${style.tile} ${theme[props.styleSecond]}`}>
							<div
								className={style.tile_bg}
								style={{ backgroundColor: props.bgColorTwo }}
							>
								<Image
									priority={true}
									alt={props.titleTwo}
									src={props.bgTwo}
									layout="fill"
									objectFit={props.containTwo ? "contain" : "cover"}
									objectPosition={
										props.objectPositionTwo
											? props.objectPositionTwo
											: "50% 50%"
									}
								/>
							</div>
							<div className={style.text}>
								<TextTitle
									buttonText={props.buttonText_2}
									title={props.titleTwo}
									text={props.textTwo}
									theme={props.styleSecond}
									description={props.descriptionTwo}
								/>
							</div>
						</div>
					</a>
				</Link>
			)}
		</div>
	);
}
export function TileToTileStatic(props) {
	return (
		<div className={style.tile_to_tile_static}>
			{props.title === undefined ? (
				<></>
			) : (
				<div className={style.tile_static}>
					<div className={`${style.content} ${style.text}`}>
						<h2 className={style.static_title}>{props.title}</h2>
						<p className={style.static_text}>{props.text}</p>
					</div>
					<div className={style.tile_static_img}>
						<Image
							priority={true}
							alt={props.title}
							src={props.bgOne}
							layout="fill"
							objectFit="contain"
						/>
					</div>
				</div>
			)}
			{props.titleTwo === undefined ? (
				<></>
			) : (
				<div className={style.tile_static}>
					<div className={`${style.content} ${style.text}`}>
						<h2 className={style.static_title}>{props.titleTwo}</h2>
						<p className={style.static_text}>{props.textTwo}</p>
					</div>
					<div className={style.tile_static_img}>
						<Image
							priority={true}
							alt={props.titleTwo}
							src={props.bgTwo}
							layout="fill"
							objectFit="contain"
						/>
					</div>
				</div>
			)}
		</div>
	);
}
