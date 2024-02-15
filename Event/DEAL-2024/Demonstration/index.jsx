import style from './style.module.scss';
import Form from './Form';

const Page = (props) => {
	return (
		<section className={style.main} id="register">
			<h2 className={style.title}>{props.title}</h2>
			<p className={style.text}>{props.text}</p>
			<Form
				dateData={props.dateData}
				equipData={props.equipData}
				buttonText={props.buttonText}
				agreement__text={props.agreementText}
				agreement__text_req={props.agreement__text_req}
				destinationURL={props.destinationURL}
				orderName={props.orderName}
				thank_you_page_url={props.thank_you_page_url}
			/>
		</section>
	);
};

export default Page;
