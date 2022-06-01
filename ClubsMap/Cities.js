import Link from "next/link";
import style from "./style.module.scss";

export function CitiesBlock(props) {
  return (
    <div className={style.city_cell}>
      <h3>{props.title}</h3>
      {props.data.map((data, index) => (
        <CitiesElement
          key={index + data.name}
          link={data.url}
          text={data.name}
        />
      ))}
    </div>
  );
}

function CitiesElement(props) {
  return (
    <Link href={props.link}>
      <a>
        <div className={style.city_item}>
          <p>{props.text}</p>
        </div>
      </a>
    </Link>
  );
}
