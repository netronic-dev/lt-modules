import Image from "next/image";
import { FunctionComponent, ReactElement, ReactNode } from "react";
import CTA from "../CTA";
import style from "./style.module.scss";

interface CardsProps {
  title?: ReactNode;
  data?: Cell[];
  cta_text: ReactNode | string;
  cta_buttonText: string;
  cta_button_onClick: () => void;
  text?: string;
}

const Cards: FunctionComponent<CardsProps> = (props) => {
  return (
    <section className={style.section}>
      <div className={style.wrapper}>
        {props.title && <h2 className={style.title}>{props.title}</h2>}
        {props.text ? <p className={style.text}>{props.text}</p> : null}
        {props.data && (
          <div className={style.grid}>
            {props.data.map((item, index) => (
              <Cell
                key={index}
                title={item.title}
                text={item.text}
                image={item.image}
              />
            ))}
          </div>
        )}
      </div>
      <CTA
        text={props.cta_text}
        buttonText={props.cta_buttonText}
        onClick={props.cta_button_onClick}
      />
    </section>
  );
};

interface Cell {
  image?: string;
  title?: ReactElement;
  text?: ReactNode | string;
}

const Cell: FunctionComponent<Cell> = (props) => {
  return (
    <div className={style.cell}>
      <div className={style.cell_image}>
        {props.image && (
          <Image
            src={props.image}
            layout="fill"
            objectFit="cover"
            quality={100}
            alt="cell image"
          />
        )}
      </div>
      <div className={style.cell_content}>
        {props.title && <h3 className={style.cell_title}>{props.title}</h3>}
        {props.text && <p className={style.cell_text}>{props.text}</p>}
      </div>
    </div>
  );
};

export default Cards;
