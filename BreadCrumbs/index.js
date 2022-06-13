import Link from "next/link";
import style from "./style.module.scss";

const styles = {
  "white": style.white,
  "anotherWhite": style.anotherWhite,
  "grey": style.grey,
  "black": style.black,
  "another_black": style.another_black,
  "blog": style.blog_black,
};

export function BreadCrumbs(props) {
  if (!props.breadcrumbData) {
    return <></>
  }
  return (
    <div className={styles[props.color ? props.color : "grey"]}>
      <ul className={style.list}>
        {props.breadcrumbData.map((item, index) => (
          index ? index == props.breadcrumbData.length - 1 ?
            (<BreadElement
              noLink
              key={index}
              text={item.name}
              link={item.item}
              index={index}
            />) :
            (<BreadElement
              key={index}
              text={item.name}
              link={item.item}
              index={index}
            />) :
            (<BreadElement
              noLine
              key={index}
              text={item.name}
              link={item.item}
              index={index}
            />)
        ))}
      </ul>
    </div>
  );
}

function BreadElement(props) {
  return (
    <li
      className={`${style.item} fade-down-animation`}
      style={{ animationDelay: ((props.index + 1) * 100) + "ms" }}
    >
      {props.noLine ? "" : <span className={style.line}>/</span>}
      {props.noLink ? (<span className={style.text}>{props.text}</span>) :
        <Link href={props.link}>
          <a>
            <span className={style.link}>{props.text}</span>
          </a>
        </Link>}
    </li>
  );
}
