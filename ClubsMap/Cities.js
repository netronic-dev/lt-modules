import Link from "next/link";
import { useGAEvents } from "../../context/GAEventsProvider";
import style from "./style.module.scss";

export function CitiesBlock(props) {
  const GAEvents = useGAEvents()

  return (
    <div className={style.city_cell}>
      <h3>{props.title}</h3>
      {props.data.map((data, index) => (
        <CitiesElement
          key={index + data.name}
          link={data.url}
          text={data.name}
          onClick={() =>
            GAEvents.buttonClick("Laser-tag clubs map", "Link Click", data.url)
          }
        />
      ))}
    </div>
  );
}

function CitiesElement(props) {
  return (
    <Link href={props.link}>
      <a onClick={props.onClick}>
        <div className={style.city_item}>
          <p>{props.text}</p>
        </div>
      </a>
    </Link>
  );
}
