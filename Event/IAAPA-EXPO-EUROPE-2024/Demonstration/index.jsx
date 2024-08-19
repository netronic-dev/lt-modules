import style from "./style.module.scss";

import dynamic from "next/dynamic";

const Form = dynamic(() => import("./Form"), { ssr: false });

const Page = (props) => {
  console.log(props.thank_you_page_url, "thank_you_page_url");
  console.log(props.destinationURL, "props.destinationURL");
  return (
    <section className={style.main} id="register">
      <h2 className={style.title}>{props.title}</h2>
      <p className={style.text}>{props.text}</p>
      <Form
        methodsData={props.methodsData}
        equipData={props.equipData}
        budgetData={props.budgetData}
        typeOfBusinessData={props.typeOfBusinessData}
        buttonText={props.buttonText}
        agreement__text={props.agreementText}
        agreement__text_req={props.agreement__text_req}
        destinationURL={props.destinationURL}
        orderName={props.orderName}
        thank_you_page_url={props.thank_you_page_url}
      />
    </section>
  );
};

export default Page;
