import Image from "next/image";
import { FunctionComponent, ReactNode } from "react";
import style from "./style.module.scss";

interface CardsProps {
	title?: ReactNode;
	data?: Cell[];
}

const Cards: FunctionComponent<CardsProps> = (props) => {
	return (
		<section className={style.section}>
			<div className={style.wrapper}>
				{props.title && <h2 className={style.title}>{props.title}</h2>}
				{props.data && (
					<div className={style.grid}>
						{props.data.map((item, index) => (
							<Cell
								key={index}
								title={item.title}
								text={item.text}
								image={item.image}
							/>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

interface Cell {
	image?: string;
	title?: string;
	text?: string;
}

const Cell: FunctionComponent<Cell> = (props) => {
	return (
		<div className={style.cell}>
			<div className={style.cell_image}>
				{props.image && (
					<Image src={props.image} layout="fill" objectFit="cover" />
				)}
			</div>
			<div className={style.cell_content}>
				{props.title && <h3 className={style.cell_title}>{props.title}</h3>}
				{props.text && <p className={style.cell_text}>{props.text}</p>}
			</div>
		</div>
	);
};

export default Cards;
