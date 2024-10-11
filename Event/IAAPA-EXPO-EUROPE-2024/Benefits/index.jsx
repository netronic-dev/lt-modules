import Image from "next/image";
import classNames from "classnames";
import style from "./style.module.scss";
import { Icon } from "../../../../components/Icon";
import { useModals } from "../../../../context/ModalsProvider";

const Benefits = (props) => {
  const modals = useModals();
  return (
    <section className={style.benefits}>
      <div className={style.container}>
        <div className={style.bg_logo}>
          <Image
            src={props.bg_logo}
            alt="background logo"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <p className={style.subtitle}>{props.subtitle}</p>
        <div className={style.titleBlock}>
          <h2 className={style.title}>{props.title}</h2>
        </div>
        <div className={style.videosBlock}>
          <h3 className={style.videosBlockTitle}>{props.videosBlockTitle}</h3>
          <ul className={style.videosList}>
            <li
              className={style.videosItem}
              style={{
                backgroundImage:
                  'url("/blog/iaapa-2024-orlando/benefitsVideoImgOne.webp")',
              }}
            >
              <a
                onClick={() => modals.VideoModalOpen("21gkLvALdHs")}
                target="_blank"
                aria-label="Play benefits video"
              >
                <Icon
                  name="icon-benefits-play"
                  className={style.playIcon}
                  width={63}
                  height={63}
                />
              </a>
              <div
                className={classNames(
                  style.videosItemTitleBox,
                  style.videosItemTitleBox__one
                )}
                style={{
                  backgroundImage:
                    'url("/blog/iaapa-2024-orlando/benefitsVideoBgImgOne.webp")',
                  width: "135px",
                }}
              >
                <h4 className={style.videosItemTitle}>Tiny World</h4>
              </div>
              <div className={style.benefitsHeroOne}>
                <Image
                  src="/blog/iaapa-2024-orlando/benefitsHeroOne.webp"
                  alt="benefitsHeroOne"
                  fill
                  sizes="100%"
                  width={160}
                  height={201}
                />
              </div>
            </li>
            <li
              className={style.videosItem}
              style={{
                backgroundImage:
                  'url("/blog/iaapa-2024-orlando/benefitsVideoImgTwo.webp")',
              }}
            >
              <a
                onClick={() => modals.VideoModalOpen("eip3-9jx19U")}
                className={style.playIcon}
                target="_blank"
                aria-label="Play benefits video two"
              >
                <Icon name="icon-benefits-play" width={63} height={63} />
              </a>
              <div
                className={classNames(
                  style.videosItemTitleBox,
                  style.videosItemTitleBox__two
                )}
                style={{
                  backgroundImage:
                    'url("/blog/iaapa-2024-orlando/benefitsVideoBgImgTwo.webp")',
                  width: "213px",
                }}
              >
                <h4 className={style.videosItemTitle}>Abandoned Hospital</h4>
              </div>
              <div className={style.benefitsHeroTwo}>
                <Image
                  src="/blog/iaapa-2024-orlando/benefitsHeroTwo.webp"
                  alt="benefitsHeroTwo"
                  fill
                  sizes="100%"
                  width={106}
                  height={205}
                />
              </div>
            </li>
          </ul>
        </div>
        <div className={style.benefits_grid}>
          <h3 className={style.benefits_subtitle}>{props.subtitleTwo}</h3>
          <ul className={style.upper_row}>
            {props.data.map((item, index) => {
              const sizeClassName = style[`sizeImage_${item.id}`];
              return (
                <li className={style.grid_cell} key={index}>
                  <div className={classNames(sizeClassName, style.icon_image)}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>

                  <div className={style.divider}></div>
                  <p className={style.text}>{item.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
