import { useRef } from 'react';

import style from './style.module.scss';
import { useModals } from '../../../context/ModalsProvider';
import ConsultationForm from './Form';

const Modal = (props) => {
	const ref = useRef(null);
	const modal = useModals();

	const handleCloseModal = (e) => {
		e.target === ref.current ? modal?.closeModal() : false;
	};

	return (
		<div
			className={
				modal?.isLuxOpen || modal?.isPremiumOpen || modal?.isEclipseOpen
					? style.background_blur
					: style.closed__modal
			}
			onClick={(e) => handleCloseModal(e)}
			ref={ref}>
			<div className={`${style.modal} ${style.animation_scale}`}>
				<ConsultationForm
					text={props.text}
					isModal={props.isModal}
					textType={props.textType}
					phoneType={props.phoneType}
					emailType={props.emailType}
					namePlaceholder={props.namePlaceholder}
					phonePlaceholder={props.phonePlaceholder}
					emailPlaceholder={props.emailPlaceholder}
					btnText={props.btnText}
					question__text={props.question__text}
					agreementText={props.agreementText}
					title={props.title}
					destinationURL={props.destinationURL}
					orderName={props.orderName}
					lang={props.lang}
					errorPhoneText={props.errorPhoneText}
					thank_you_page={props.thank_you_page}
				/>
				<button
					className={style.close__button}
					onClick={modal?.closeModal}>
					&times;
				</button>
			</div>
		</div>
	);
};

export default Modal;
