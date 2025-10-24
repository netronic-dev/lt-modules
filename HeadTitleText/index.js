import style from "./style.module.scss";

const styles = {
  white: style.block_white,
  white_new: style.block_white_new,
  light: style.block_light,
  dark: style.block_dark,
  productCard: style.block_product_card,
};

export default function HeadTitleText(props) {
  return (
    <section className={styles[props.style]}>
      <h1 className={style.title}>{props.title}</h1>
      {props.text && <p className={style.text}>{props.text}</p>}
    </section>
  );
}
