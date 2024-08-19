import style from "./style.module.scss";

export default function Agreement(props) {
  console.log(props.text, "text");
  console.log(props.text_req, "text_req");
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
      </div>
    </div>
  );
}

// const agreementDot = (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="11"
//     height="11"
//     viewBox="0 0 12 11"
//     fill="none"
//   >
//     <circle cx="6.35986" cy="5.5" r="5.5" fill="#0090FF" />
//   </svg>
// );
