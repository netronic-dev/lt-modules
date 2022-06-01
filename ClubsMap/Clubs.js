import Link from "next/link";
import { PageLayout } from "../../Layouts/PageLayout";
import style from "./style.module.scss";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { clubsData } from "../../Data/clubsData";
import { clubsDataEn } from "../../DataEn/clubsDataEn";
import Head from "next/head";
import { BreadCrumbs } from "../BreadCrumbs/BreadCrumbs";
import { bcClubsMapIN } from "../../Data/breadCrumbData"
import { bcClubsMapINEn } from "../../DataEn/breadCrumbDataEn"
import { PageLayoutEn } from "../../Layouts/PageLayoutEn";
import { TileToTile } from "../TileToTile/TileToTile";
import { useState } from "react";
import ReactTooltip from "react-tooltip";

export function Clubs(props) {

  const data = props.en ? clubsDataEn : clubsData

  let findResult

  if (props.en) {
    findResult = data.find((item) => item.name == props.name);
  } else {
    findResult = data.find((item) => item.name == props.city);
  }
  const url = props.en ? `https://lasertag.ru/o-nas/lazertag-klubu-rossii/${props.pageUrl}` : `https://lasertag.net/about-us/map/${props.pageUrl}`

  const Layout = props.en ? PageLayoutEn : PageLayout

  return (
    <div className={style.page}>
      <Head>
        <title>
          {props.en ? `Laser tag clubs in ${props.name}. Play laser tag and buy equipment. `
            :
            `Лазертаг и пейнтбол в ${props.city} | Forpost | Форпост`}
        </title>
        <meta
          name="description"
          content={props.en ?
            `Where to play laser tag in ${props.name}. Laser tag clubs and arenas near me in ${props.name}. Contacts, addresses and telephones of paintball and laser tag centers in ${props.name}.`
            :
            `Где поиграть в лазертаг в ${props.city}.Контакты, адреса и телефоны пейнтбол и лазертаг-центров в ${props.city} `}
        />
        <link
          rel="canonical"
          href={url}
        />
      </Head >
      <Layout>
        {props.en ? null :
          <div className={style.map}>
            <img src="/map.jpg" alt="Map" />
          </div>
        }
        <BreadCrumbs
          breadcrumbData={props.en ? bcClubsMapINEn(props.name) : bcClubsMapIN(props.city)}
          color="white"
        />
        <div className={style.clubs}>
          <h1 className={style.title}>{props.en ? `Laser tag clubs in ${props.name}` : `Карта клубов ${props.city}`}</h1>
          <Link href={props.en ? "/about-us/map" : "/o-nas/lazertag-klubu-rossii/"}>
            <a>
              <div className={style.bordered_block}>
                <h2>{props.en ? "Clubs" : "Клубы"}</h2>
                <button>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      className={style.cross}
                      d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                      fill="#8E8E8E"
                    />
                  </svg>
                </button>
              </div>
            </a>
          </Link>
          <div className={style.cards_grid}>
            {findResult.items.map((data, index) => (
              <Card
                en={props.en}
                key={index}
                clubType={data.type}
                clubName={data.name}
                address={data.address}
                address_1={data.address_1}
                phone={data.phone}
                phone_1={data.phone_1}
                phone_2={data.phone_2}
                email={data.email}
                site={data.site}
                vk={data.vk}
                instagram={data.instagram}
                viber={data.viber}
                whatsapp={data.whatsapp}
                youtube={data.youtube}
                telegram={data.telegram}
                facebook={data.facebook}
              />
            ))}
          </div>
          <div className={style.tile_to_tile}>
            <h2 className={style.tile_to_tile__title}>
              {props.en ? "" :
                "Если вы ищете оборудование для открытия бизнеса переходите в разделы:"}
            </h2>
            <TileToTile
              en={props.en ? true : false}
              linkFirst={props.en ? "/outdoor-laser-tag" :
                "/vnearennoe-lasertag-oborudovanie"
              }

              linkSecond={props.en ? "/indoor-laser-tag-equipment" : "/arennoe-lasertag-oborudovanie"}

              title={props.en ? "Outdoor equipment" : "Внеаренное оборудование"}

              text={props.en ? null : "Ударопрочные игровые комплекты.          Режим Battle Royale."}

              titleTwo={props.en ? "Indoor equipment" : "Аренное оборудование"}

              textTwo={props.en ? null : "Более 30 игровых режимов и персонажей."}

              bgOne="/index/Outdoor-oborudovanie.jpg"
              styleFirst="White"
              bgTwo="/index/Indoor-oborudovanie.jpg"
              styleSecond="White"
            />
          </div>
          <div className={style.city_text}>{props.text}</div>
        </div>
      </Layout>
    </div >
  );
}

function Card(props) {
  return (
    <div className={style.card}>
      <p className={style.club_type}>{props.clubType}</p>
      <p className={style.club_name}>{props.clubName}</p>
      <div className={style.content}>
        {props.address === undefined ? (
          <></>
        ) : (
          <Category
            title={props.en ? "Address" : "Адрес"}
            text={
              <>
                {props.address}
                <br />
                {props.address_1 === undefined ? "" : props.address_1}
                <br />
                {props.address_2 === undefined ? "" : props.address_2}
              </>
            }
          />
        )}
        {props.phone === undefined ? (
          <></>
        ) : (
          <Category
            title={props.en ? "Phone" : "Телефон"}
            text={
              <>
                {props.phone}
                <br />
                {props.phone_1 === undefined ? "" : props.phone_1}
                <br />
                {props.phone_2 === undefined ? "" : " " + props.phone_2 + " "}
              </>
            }
          />
        )}
        {props.email === undefined ? (
          <></>
        ) : (
          <CategoryStyle title="Email" text={props.email} />
        )}
        {props.site === undefined ? (
          <></>
        ) : (
          <CategoryStyle title="Web" text={props.site} />
        )}
        {props.vk === undefined ? (
          <></>
        ) : (
          <CategoryStyle text={props.vk} title="Vk" />
        )}
        {props.instagram === undefined ? (
          <></>
        ) : (
          <CategoryStyle text={props.instagram} title="Instagram" />
        )}
        {props.viber === undefined ? (
          <></>
        ) : (
          <CategoryStyle text={props.viber} title="Viber" />
        )}
        {props.youtube === undefined ? (
          <></>
        ) : (
          <CategoryStyle text={props.youtube} title="Youtube" />
        )}
        {props.whatsapp === undefined ? (
          <></>
        ) : (
          <CategoryStyle text={props.whatsapp} title="Whatsapp" />
        )}
        {props.facebook === undefined ? (
          <></>
        ) : (
          <CategoryStyle text={props.facebook} title="Facebook" />
        )}
        {props.telegram === undefined ? (
          <></>
        ) : (
          <CategoryStyle text={props.telegram} title="Telegram" />
        )}
      </div>
    </div>
  );
}

function Category(props) {
  return (
    <div className={style.category_block}>
      <p className={style.club_category}>{props.title}</p>
      <p className={style.club_text}>{props.text}</p>
    </div>
  );
}

function CategoryStyle(props) {
  const [isCopied, setCopied] = useState(false)

  function onCopiedChange() {
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 5000)
  }

  return (
    <>
      {/* <CopyToClipboard text={props.text}>
      </CopyToClipboard> */}
      <div className={style.category_block_blue} onClick={onCopiedChange}>
        <p className={style.club_category}>{props.title}</p>
        <p className={style.club_text}>{props.text}</p>
      </div>
    </>
  );
}

const copyIcon = (
  <svg height="100px" viewBox="-21 0 512 512" width="100px">
    <path d="m325.332031 512h-266.664062c-32.363281 0-58.667969-26.304688-58.667969-58.667969v-288c0-32.363281 26.304688-58.664062 58.667969-58.664062h10.664062c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16h-10.664062c-14.699219 0-26.667969 11.964843-26.667969 26.664062v288c0 14.699219 11.96875 26.667969 26.667969 26.667969h266.664062c14.699219 0 26.667969-11.96875 26.667969-26.667969v-10.664062c0-8.832031 7.167969-16 16-16s16 7.167969 16 16v10.664062c0 32.363281-26.304688 58.667969-58.667969 58.667969zm0 0" />
    <path d="m410.667969 384h-224c-32.363281 0-58.667969-26.304688-58.667969-58.667969v-266.664062c0-32.363281 26.304688-58.667969 58.667969-58.667969h224c32.363281 0 58.664062 26.304688 58.664062 58.667969v266.664062c0 32.363281-26.300781 58.667969-58.664062 58.667969zm-224-352c-14.699219 0-26.667969 11.96875-26.667969 26.667969v266.664062c0 14.699219 11.96875 26.667969 26.667969 26.667969h224c14.699219 0 26.664062-11.96875 26.664062-26.667969v-266.664062c0-14.699219-11.964843-26.667969-26.664062-26.667969zm0 0" />
  </svg>
);
