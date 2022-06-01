import Link from "next/link";
import { useState } from "react";
import ReactTooltip from "react-tooltip";
import { bcClubsMap } from "../../Data/breadCrumbData";
import { bcClubsMapEn } from "../../DataEn/breadCrumbDataEn";
import { PageLayout } from "../../Layouts/PageLayout";
import { PageLayoutEn } from "../../Layouts/PageLayoutEn";
import { BreadCrumbs } from "../BreadCrumbs/BreadCrumbs";
import { MapClubsRu, MapClubsEn } from "../Map/MapClubs";
import style from "./style.module.scss";

export default function Cities(props) {
  const [content, setContent] = useState("");
  const Layout = props.en ? PageLayoutEn : PageLayout
  return (
    <div className={style.page}>
      <Layout>
        <BreadCrumbs color="grey" breadcrumbData={props.en ? bcClubsMapEn : bcClubsMap} />
        <div className={style.clubsMap}>
          <h1 className={style.title}>{props.en ? "Laser-tag clubs map" : "Карта клубов СНГ"}</h1>
          {/* <button
            className={style.addClub_button}
            onClick={props.changeInputsView}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="17" stroke="white" stroke-width="2" />
              <path
                d="M25 19.0001H19V25.0001H17V19.0001H11V17.0001H17V11.0001H19V17.0001H25V19.0001Z"
                fill="white"
              />
            </svg>
            <span>Добавить свой клуб</span>
          </button> */}
          <div className={style.cities_block}>
            <h2>{props.en ? "Countries" : "Города"}</h2>
            <div className={style.cities_grid}>
              {props.unitsData.map((data, index) => (
                <CitiesBlock
                  key={index + data.letter + "key"}
                  title={data.letter}
                  data={data.items}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={style.map}>
          {props.en ? <>
            {/* <MapClubsEn setTooltipContent={setContent} />
            <ReactTooltip className={style.tool_tip} place="top" effect="float">{content}</ReactTooltip> */}
          </> : <>
            {/* <MapClubsRu /> */}
            <picture>
              <img src="/map.jpg" />
            </picture>
          </>}

        </div>
      </Layout>
    </div>
  );
}

function CitiesBlock(props) {
  return (
    <div className={style.city_cell}>
      <h3>{props.title}</h3>
      {props.data.map((data, index) => (
        <CitiesElement
          key={index + data.name}
          link={data.link}
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
