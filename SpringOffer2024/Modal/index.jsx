import { useRef } from "react";

import style from "./style.module.scss";
import { useModals } from "../../../context/ModalsProvider";

import dynamic from "next/dynamic";

const ConsultationForm = dynamic(() => import("./Form"), { ssr: false });

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
            ref={ref}
        >
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
                    budgetPlaceholder={props.budgetPlaceholder}
                    btnText={props.btnText}
                    question__text={props.question__text}
                    agreementText={props.agreementText}
                    title={props.title}
                    destinationURL={props.destinationURL}
                    orderName={props.orderName}
                    lang={props.lang}
                    errorPhoneText={props.errorPhoneText}
                    thank_you_page={props.thank_you_page}
                    contactMethodPlaceholder={props.contactMethodPlaceholder}
                    commentPlaceholder={props.commentPlaceholder}
                />
                <div className={style.button_block}>
                    <button
                        className={style.close__button}
                        onClick={modal?.closeModal}
                    >
                        <svg
                            width="11"
                            height="11"
                            viewBox="0 0 11 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M0.2 11L4.51 5.54L0.3 0.2H1.7L5.19 4.67L8.66 0.2H10.06L5.85 5.54L10.16 11H8.74L5.19 6.41L1.62 11H0.2Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
