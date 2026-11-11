import style from "./style.module.scss";
// import WordSlider from "../WordSlider";

export default function HowToClaim(props) {
  const steps = [
    {
      step: "01",
      title: "Contact us",
      text: "Reach your NETRONIC manager or send a request during the promo window.",
    },
    {
      step: "02",
      title: "Choose Indoor, Outdoor, or Mobile laser tag sets",
      text: "Order 10 sets. Gift sets are added on top.",
    },
    {
      step: "03",
      title: "Sign by November 30",
      text: "Your contract must be signed within the offer period.",
    },
  ];

  return (
    <section className={style.section} id="how_to_claim">
      <div className={style.section_inner}>
        <div className={style.content}>
          <h2 className={style.subtitle}>{props.subtitle || "How to claim"}</h2>
        </div>
        <div className={style.steps_container}>
          {steps.map((item, index) => (
            <div key={index} className={style.step_wrapper}>
              <div className={style.step_card}>
                <span className={style.step_number}>{item.step}</span>
                <h3 className={style.step_title}>{item.title}</h3>
                <p className={style.step_text}>{item.text}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={style.step_arrow}>↓</div>
              )}
            </div>
          ))}
        </div>

        <div className={style.promo_box}>
          <h3 className={style.promo_title}>
            Buy 10. <span>Get 2 Free.</span>
          </h3>
          <p className={style.promo_text}>
            Valid November 17–30, 2026. Black Friday comes once a year — make it
            count for your arena.
          </p>
          <button className={style.button} onClick={props.onClick}>
            {props.buttonText || "Request your offer"}
          </button>
        </div>
      </div>
      {/* <WordSlider
        className={style.words_slider}
        text={
          <>
            Black
            <br /> Friday
          </>
        }
      /> */}
    </section>
  );
}
