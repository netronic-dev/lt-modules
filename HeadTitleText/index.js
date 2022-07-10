import style from './style.module.scss'

const styles = {
  "white": style.block_white,
  "light": style.block_light,
  "dark": style.block_dark,
  "productCard": style.block_product_card
}

export default function HeadTitleText(props) {
  return (
    <section className={styles[props.style]}>
      <h1 className={style.title}>{props.title}</h1>
      <p className={style.text}>{props.text}</p>
    </section>
  )
}
