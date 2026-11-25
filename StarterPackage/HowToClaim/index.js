import style from "./style.module.scss";

export default function HowToClaim(props) {
  return (
    <section className={style.section} id="how_to_claim">
      <div className={style.section_inner}>
        <div className={style.promo_box}>
          <h3 className={style.promo_title}>
            Buy 10. <span>Get 2 Free.</span>
          </h3>
          <p className={style.promo_text}>
            Valid for orders placed before 31 December 2026.
          </p>
          <button className={style.button} onClick={props.onClick}>
            {props.buttonText || "Request your offer"}
          </button>
        </div>
      </div>
    </section>
  );
}
