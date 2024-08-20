import style from "./style.module.scss";

export default function Agreement(props) {
  return (
    <div className={style.agreement_cont}>
      {props.text_req ? (
        <div className={style.agreement__req}>
          <span className={style.agreement__req_span}>*_</span>
          <p className={style.agreement__req_text}>{props.text_req}</p>
        </div>
      ) : (
        ""
      )}
      <div className={`${style.agreement} ${props.style}`}>
        <div
          className={`${style.agreement__checkbox} ${
            props.active && style.agreement__checkbox_active
          } ${props.checkbox_style} ${props.error && style.error}`}
          onClick={props.onClick}
        >
          {props.active && <div className={style.agreement_dot}></div>}
        </div>
        <p
          className={`${
            props.text_req
              ? style.agreement__text_with_req
              : style.agreement__text
          }`}
        >
          {props.text}
        </p>
        {props.error && (
          <p className={style.error_rounded_flat}>{props.error}</p>
        )}
      </div>
    </div>
  );
}
