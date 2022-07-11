import style from "./style.module.scss";
import { TitleText, TextTitle } from "../TitleText";
import Link from "next/link";
import Image from "next/image"

const theme = {
  "White": "white_tile",
  "Black": "black_tile",
};

export function TileFullWidth(props) {
  return (
    <>
      <Link href={props.link}>
        <a>
          <div className={`${style.tile} ${theme[props.style]}`}>
            <div className={style.tile_bg}>
              {props.bgResponsive ?
                (<>
                  <div
                    className={style.main}
                    style={{ backgroundColor: props.bgColor }}
                  >
                    <Image
                      alt={props.title}
                      src={props.bg}
                      layout="fill"
                      objectFit={props.contain ? "contain" : "cover"}
                      priority={true}
                      quality={90}
                    />
                  </div>
                  <div className={style.responsive}
                    style={{ backgroundColor: props.bgColor }}
                  >
                    <Image
                      alt={props.title}
                      src={props.bgResponsive}
                      layout="fill"
                      objectFit={props.contain ? "contain" : "cover"}
                      priority={true}
                      quality={90}
                    />
                  </div>
                </>
                ) :
                (<Image
                  alt={props.title}
                  src={props.bg}
                  layout="fill"
                  objectFit="cover"
                  priority={true}
                  quality={90}
                />)}
            </div>
            <div
              className={style.text}
            >
              <TitleText
                title={props.title}
                text={props.text}
                theme={props.style}
                buttonText={props.buttonText}
                direction={props.direction}
              />
            </div>
          </div>
        </a>
      </Link>
    </>
  );
}

export function TileFullWidthReverse(props) {
  let LinkComponent = props.external ? "div" : Link
  return (
    <>
      <LinkComponent href={props.external ? null : props.link}>
        <a href={props.external ? props.link : null} target={props.external ? "_blank" : null}>
          <div className={`${style.tile} ${theme[props.style]}`}>
            <div className={style.tile_bg}
              style={{ backgroundColor: props.bgColor }}>
              {props.bgResponsive ?
                (<>
                  <div
                    className={style.main}
                    style={{ backgroundColor: props.bgColor }}
                  >
                    <Image
                      alt={props.title}
                      src={props.bg}
                      layout="fill"
                      objectFit={props.contain ? "contain" : "cover"}
                      priority={true}
                      quality={90}
                    />
                  </div>
                  <div className={style.responsive}
                    style={{ backgroundColor: props.bgColor }}
                  >
                    <Image
                      alt={props.title}
                      src={props.bgResponsive}
                      layout="fill"
                      objectFit={props.contain ? "contain" : "cover"}
                      priority={true}
                      quality={90}
                    />
                  </div>
                </>
                ) : (<Image
                  alt={props.title}
                  src={props.bg}
                  layout="fill"
                  objectFit="cover"
                  priority={true}
                  quality={90}
                />)}
            </div>
            <div className={style.text}>
              <TextTitle
                title={props.title}
                text={props.text}
                theme={props.style}
                description={props.description}
                direction={props.direction}
                buttonText={props.buttonText}
              />
            </div>
          </div>
        </a>
      </LinkComponent>
    </>
  );
}

