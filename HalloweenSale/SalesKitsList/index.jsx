import Image from "next/image";
import style from "./style.module.scss";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const SaleKitsList = (props) => {
  const [isModal, setIsModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const modalRef = useRef();
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const handleOpenModal = (index) => {
    setIsModal(true);
    setModalIndex(index);
  };

  const handleCloseModal = (e) => {
    if (e.target === modalRef.current) setIsModal(false);
  };

  useEffect(() => {
    isModal
      ? document.body.classList.add("modal_opened")
      : document.body.classList.remove("modal_opened");
  }, [isModal]);
  return (
    <section className={style.main}>
      <div className={style.content}>
        <h2
          className={`${style.title} ${inView ? style.animation__up : ""}`}
          ref={ref}
        >
          {props.title}
        </h2>
        {props.data.map((item, index) => (
          <div
            className={`${style.item} ${item.second ? style.item_second : ""} `}
            key={index}
          >
            <div className={style.item__content}>
              <h3
                className={`${style.item__title} ${
                  item.second
                    ? inView
                      ? style.animation_rtl
                      : ""
                    : inView
                    ? style.animation_rtl
                    : ""
                }`}
              >
                {item.title}
              </h3>
              <span
                className={`${style.item__text} ${
                  inView ? style.animation_rtl_text : ""
                }`}
              >
                {item.text}
              </span>
              <div className={style.item__price}>
                <span
                  className={`${style.item_active_price} ${
                    inView ? style.animation__scale : ""
                  }`}
                >
                  {item.activePrice}
                </span>
                <div
                  className={`${style.item_unactive_price} ${
                    inView ? style.animation__scale_through : ""
                  }`}
                >
                  {item.unActivePrice}
                  <span
                    className={`${style.line__through} ${
                      inView ? style.animation__through : ""
                    }`}
                  ></span>
                </div>
              </div>
              <div className={style.buttons__wrapp}>
                <AnchorLink
                  className={`${style.button} ${
                    inView ? style.animation__btn__up : ""
                  }`}
                  href="#sale"
                  offset="200"
                >
                  {item.button_text}
                </AnchorLink>
                <span
                  className={`${style.item_learn_more} ${
                    inView ? style.animation__learn_more__up : ""
                  }`}
                  onClick={() => handleOpenModal(index)}
                >
                  {item.learn_more_text}
                </span>
              </div>
            </div>
            <div className={style.item__image}>
              <Image
                src={item.image}
                alt="Image"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className={style.item__image_lap}>
              <Image
                src={item.image_lap}
                alt="Image_lap"
                layout="fill"
                objectFit="contain"
              />
            </div>
            {isModal && (
              <div
                className={style.modal}
                onClick={(e) => handleCloseModal(e, index)}
                ref={modalRef}
              >
                <div className={style.content}>
                  <h3 className={style.modal__title}>
                    {props.modalsData[modalIndex].title}
                  </h3>
                  <div className={style.sets__grid}>
                    {props.modalsData[modalIndex].sets_info.map(
                      (item, index) => (
                        <div className={style.set__item} key={index}>
                          <span>{item.count}</span>
                          <span>{item.text}</span>
                        </div>
                      )
                    )}
                  </div>
                  <div className={style.modal__price}>
                    <span className={style.modal_active_price}>
                      {props.modalsData[modalIndex].activePrice}
                    </span>
                    <span className={style.modal_unactive_price}>
                      {props.modalsData[modalIndex].unActivePrice}
                    </span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="49"
                    height="49"
                    viewBox="0 0 49 49"
                    fill="none"
                    className={style.close__modal_btn}
                    onClick={() => setIsModal(false)}
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="48"
                      height="48"
                      rx="24"
                      stroke="#8E8E8E"
                    />
                    <path
                      d="M16 16L33 33M16 33L33 16"
                      stroke="#8E8E8E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SaleKitsList;
