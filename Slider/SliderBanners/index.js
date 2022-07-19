import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useSwipeable } from "react-swipeable"
import { FillButton } from "../../../lt-modules/Buttons"
import style from "./style.module.scss"

export default function SliderBanners(props) {
  const [ArrayNumber, changeArrayNumber] = useState(0)
  const [firstPicNumber, changeFirstPicNumber] = useState(0)
  const [secondPicNumber, changeSecondPicNumber] = useState(1)
  const [thirdPicNumber, changeThirdPicNumber] = useState(2)

  function prev() {
    changeFirstPicNumber(firstPicNumber == 0 ? data.length - 1 : firstPicNumber - 1)
    changeSecondPicNumber(secondPicNumber == 0 ? data.length - 1 : secondPicNumber - 1)
    changeThirdPicNumber(thirdPicNumber == 0 ? data.length - 1 : thirdPicNumber - 1)
  }
  function next() {
    changeFirstPicNumber(firstPicNumber == data.length - 1 ? 0 : firstPicNumber + 1)
    changeSecondPicNumber(secondPicNumber == data.length - 1 ? 0 : secondPicNumber + 1)
    changeThirdPicNumber(thirdPicNumber == data.length - 1 ? 0 : thirdPicNumber + 1)
  }
  function changeSliderData(index) {
    changeArrayNumber(index)
    changeFirstPicNumber(0)
    changeSecondPicNumber(1)
    changeThirdPicNumber(2)
  }

  const data = props.data[ArrayNumber].data

  const swipeHandlers = useSwipeable({
    onSwipedRight: () => prev(),
    onSwipedLeft: () => next(),
    trackMouse: true
  });
  return (
    <>
      <div className={style.slider_changer_out} >
        <div className={`${style.slider_changer} fade-up-animation`}>
          {props.data.map((item, index) => (
            <p
              onClick={() => { changeSliderData(index) }}
              className={`${style.slider_changer_text} 
                ${index == ArrayNumber ? style.active : null}`}
              key={index}
            >
              {item.name}
            </p>
          ))}
        </div>
      </div>
      <div className={style.slider} key={ArrayNumber} {...swipeHandlers}>
        <div className={`${style.image_cell} ${style.pointer}`} onClick={prev}>
          <CellAdder
            key={firstPicNumber}
            image={data[firstPicNumber].image}
            text={props.buttonText}
            objectPosition="100% 100%"
          />
        </div>
        <div
          className={`${style.image_cell} ${style.center}`}
        >
          <div className={style.button_prev}>
            <PrevArrow
              onClick={prev}
            />
          </div>
          <CellAdder
            key={secondPicNumber}
            image={data[secondPicNumber].image}
            text={props.buttonText}
            link={data[secondPicNumber].link}
            visible
          />
          <div className={style.button_next}>
            <NextArrow
              onClick={next}
            />
          </div>
        </div>
        <div className={`${style.image_cell} ${style.pointer}`} onClick={next}>
          <div className={style.ontop}></div>
          <CellAdder
            key={thirdPicNumber}
            image={data[thirdPicNumber].image}
            text={props.buttonText}
            objectPosition="0 0"
          />
        </div>
      </div>
    </>
  )
}

function CellAdder(props) {
  return (
    props.visible ?
      <Link href={props.link}>
        <a className={`fade-up-animation`}>
          <Image
            src={props.image}
            layout="responsive"
            width={972}
            height={530}
            quality={92}
            priority={true}
          />
          <div
            className={`
              ${style.cell_button} fade-up-animation animated-second
            `}
          >
            <FillButton text={props.text} />
          </div>
        </a>
      </Link >
      :
      <div className="fade-up-animation animated-second">
        <Image
          src={props.image}
          layout="fill"
          objectFit="cover"
          objectPosition={props.objectPosition}
          priority={true}
        />
      </div>
  )
}

function PrevArrow(props) {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      className={`${style.svg_button} ${style.left}`}
      onClick={props.onClick}
    >
      <circle
        className={style.circle}
        cx="25"
        cy="25"
        r="25"
        transform="rotate(-180 25 25)"
        fill="#C4C4C4"
        fillOpacity="0.1"
      />
      <path
        className={style.arrow}
        d="M27.0002 31L28.4102 29.59L23.8302 25L28.4102 20.41L27.0002 19L21.0002 25L27.0002 31Z"
        fill="white"
      />
    </svg>
  )
}
function NextArrow(props) {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      className={`${style.svg_button} ${style.right}`}
      onClick={props.onClick}
    >
      <circle
        className={style.circle}
        cx="25"
        cy="25"
        r="25"
        fill="#C4C4C4"
        fillOpacity="0.1"
      />
      <path
        className={style.arrow}
        d="M22.9998 19L21.5898 20.41L26.1698 25L21.5898 29.59L22.9998 31L28.9998 25L22.9998 19Z"
        fill="white"
      />
    </svg >
  )
}