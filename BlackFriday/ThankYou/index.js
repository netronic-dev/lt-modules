import Image from "next/image";
import style from "./style.module.scss";

export default function IAAPAThankYou(props) {
	return (
		<section className={style.section}>
			<div className={style.main}>
				<div className={style.main_in}>
					<h1 className={style.title}>{props.title}</h1>
					<p className={style.subtitle}>{props.subtitle}</p>
				</div>
				<div className={style.image}>
					<Image
						src={props.image}
						layout="responsive"
						width={1170}
						height={500}
					/>
				</div>
			</div>
		</section>
	);
}
