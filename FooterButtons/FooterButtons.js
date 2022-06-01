import { useState } from "react";
import style from "./style.module.scss";
import { PopUpCall, PopUpEmail } from "../InputForms/PopUpForms/PopUpForms";
import { LPPopUpBp, LPPopUpCall, LPPopUpEmail } from "../InputForms/LpForms/LpForms";
import { Fade } from "react-awesome-reveal";
import { useInView } from "react-hook-inview";

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
    unobserveOnEnter: true
  })
  const [isInputFormOpen, setInputFormOpen] = useState(false);
  function onInputFormOpen() {
    setInputFormOpen(!isInputFormOpen);
    isInputFormOpen === true
      ? (document.body.className = "")
      : (document.body.className = "popUp");
  }
  return (
    <>
      {isInputFormOpen === true ?
        props.call ?
          (<PopUpCall closeClick={onInputFormOpen} en={props.en} />)
          :
          props.callLP ?
            (<LPPopUpCall closeClick={onInputFormOpen} en={props.en} />)
            :
            props.catalogLP ?
              (<LPPopUpEmail closeClick={onInputFormOpen} en={props.en} />)
              :
              props.business ?
                (<LPPopUpBp closeClick={onInputFormOpen} en={props.en} />)
                :
                props.catalog ?
                  (<PopUpEmail closeClick={onInputFormOpen} en={props.en} />)
                  :
                  (<PopUpEmail closeClick={onInputFormOpen} en={props.en} />)
        : (
          <></>
        )}
      <div className={style.footer_buttons__out}>
        <div
          ref={ref}
          key={isVisible ? 1 : 0}
          className={`${themes[props.theme ? props.theme : "normal"]}
            zoom-animation
      `}>
          <div className={style.left_side}>
            <img src={logoses[props.logoName]} alt={props.logoName} />
            <div className={style.text_block}>
              <p className={style.top}>{props.textTop}</p>
              <p className={style.bottom}>{props.textBottom}</p>
            </div>
          </div>
          <div className={style.right_side}>
            <Fade delay={500} triggerOnce>
              <button onClick={onInputFormOpen} className={style.button}>
                {props.buttonText}
              </button>
            </Fade>
          </div>
        </div>
      </div>
    </>
  );
}
