import style from "./style.module.scss";

export default function TableClickImg(props) {
  return (
    <div className={style.block}>
      <div className={style.inside}>
        <h3 className={style.title}>{props.titleH3}</h3>
        {props.tableData.map((tr) => (
          <Table
            key={tr.id}
            text={tr.text}
            value={tr.value}
            src={tr.image}
            alt={tr.alt}
            id={tr.id}
          />
        ))}
      </div>
    </div>
  );
}

function Table(props) {
  return (
    <div className={style.line_image}>
      <input type="checkbox" name="tab-group" id={props.id} />
      <label for={props.id} className={style.tab_title}>
        <ul className={style.line}>
          <li>{props.text}</li>
          <li>{props.value}</li>
        </ul>
      </label>
      <span className={style.tab_content}>
        <img
          src={props.src}
          alt={props.alt}
          className={style.image_showed} />
      </span>
    </div>
  );
}
