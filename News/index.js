import Link from "next/link";
import style from "./style.module.scss";
import Image from "next/image";
import { useInView } from "react-hook-inview";
import { InView } from "react-intersection-observer";
import { useGAEvents } from "../../context/GAEventsProvider";

const theme = {
  news: {
    default: style.news_item_dark,
    light: style.news_item_light,
  },
  newsBlock: {
    default: style.news_block_out_dark,
    light: style.news_block_out_light,
  },
};
export function News(props) {
  const [ref, isVisible] = useInView({
    unobserveOnEnter: true,
  });

  const GAEvents = useGAEvents();

  function sectionWasInView(sectionName) {
    GAEvents.sectionWasInView(sectionName);
  }

  return (
    <InView
      as="div"
      onChange={(inView, entry) =>
        inView && sectionWasInView(`Blog Card ${props.title || ""}`)
      }
    >
      <Link href={props.path ? props.path : "/"}>
        <a
          onClick={() => GAEvents.buttonClick("Blog Card", "Click", props.path)}
        >
          <div
            className={`${style.news_item} ${
              theme.news[props.theme ? props.theme : "default"]
            }
                        `}
            ref={ref}
          >
            <div className={`${style.news_item__image}`}>
              <Image
                src={props.image}
                alt={props.alt}
                layout="fill"
                objectFit="cover"
                priority={true}
              />
            </div>
            <div className={style.news_content}>
              <p className={style.news_date}>{props.date}</p>
              <p className={style.news_title}>{props.title}</p>
              <p className={style.news_text}>{props.text}</p>
            </div>
          </div>
        </a>
      </Link>
    </InView>
  );
}

export function NewsBlock(props) {
  const data = props.data ? props.data.slice(0, 3) : [];

  const [ref, isVisible] = useInView({
    unobserveOnEnter: true,
  });

  if (!props.data) return <></>;

  return (
    <div
      className={`${style.news_block_out} ${
        theme.newsBlock[props.theme || "default"]
      }`}
      ref={ref}
    >
      <div className={style.news_block_header}>
        <h2
          className={`
            ${style.title}
            fade-up-animation`}
          key={isVisible ? "news_title_vis" : "news_title"}
        >
          {props.title}
        </h2>
        <Link href={props.buttonBlogLink || "/"}>
          <a aria-label="Read more news">
            <button className={style.button_link} aria-label="Read more news">
              {props.readMoreButtonText} {arrow}
            </button>
          </a>
        </Link>
      </div>
      <div className={style.news_block}>
        {data[0] ? (
          <News
            theme={props.theme}
            image={data[0].image}
            alt={data[0].title}
            date={data[0].date}
            title={data[0].title}
            text={data[0].text}
            path={data[0].path}
            index={1}
          />
        ) : (
          ""
        )}
        {data[1] ? (
          <News
            theme={props.theme}
            image={data[1].image}
            alt={data[1].title}
            date={data[1].date}
            title={data[1].title}
            text={data[1].text}
            path={data[1].path}
            index={2}
          />
        ) : (
          ""
        )}
        {data[2] ? (
          <News
            theme={props.theme}
            image={data[2].image}
            alt={data[2].title}
            date={data[2].date}
            title={data[2].title}
            text={data[2].text}
            path={data[2].path}
            index={3}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

const arrow = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={style.arrow}
  >
    <path
      className={style.arrow_path}
      d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z"
      fill="#0090FF"
    />
  </svg>
);
