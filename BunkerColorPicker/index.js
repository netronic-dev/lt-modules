import style from "./style.module.scss"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
import { nanoid } from "nanoid";

export default function BunkerColorPicker(props) {

  const [firstColor, setFirstColor] = useState(props.colors[0])
  const [secondColor, setSecondColor] = useState(props.colors[1])

  return (
    <section className={style.section}>
      <div className={style.wrapper}>
        <div className={style.content_cell}>
          <h1 className={style.title}>
            {props.title}
          </h1>
          <div className={style.color_pickers}>
            <div
              className={style.color_picker_1}
            >
              <p className={style.text}>
                {props.subtitle_1}
              </p>
              <DropDown
                activeColor={firstColor ? firstColor.name : ""}
                colors={props.colors}
                setNewColor={(index) => setFirstColor(index)}
              />
            </div>
            <div className={style.color_picker_1}>
              <p className={style.text}>
                {props.subtitle_2}
              </p>
              <DropDown
                activeColor={secondColor ? secondColor.name : ""}
                colors={props.colors}
                setNewColor={(index) => setSecondColor(index)}
              />
            </div>
          </div>
        </div>
        <div className={style.image_cell}>
          <VectorImage
            firstColor={firstColor ? firstColor.color : "ef8d2b"}
            secondColor={secondColor ? secondColor.color : "141412"}
          />
        </div>
      </div>
    </section>
  );
}

function DropDown(props) {

  const colorsData = props.colors

  const [isListActive, setListActivity] = useState(false)


  return (
    <div
      onClick={() => setListActivity(!isListActive)}
      className={`
        ${style.dropdown}
        ${isListActive ? style.dropdown_active : ""}
      `}
    >
      <p className={style.dropdown_title}>
        {props.activeColor ? props.activeColor : ""} {arrow}
      </p>
      <ul className={style.dropdown_list}>
        {colorsData.map((item, index) => (
          <li
            onMouseEnter={() => props.setNewColor(
              colorsData[index]
            )}
            key={nanoid()}
            className={`
              ${style.dropdown_list_item}
              ${props.activeColor === item.name ? style.dropdown_list_item_active : ""}
              `}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div >
  )
}

const arrow = (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    className={style.arrow}
  >
    <path
      d="M17.1291 15.4668L12.5391 10.8868L7.94906 15.4668L6.53906 14.0568L12.5391 8.0568L18.5391 14.0568L17.1291 15.4668Z"
      fill="#040E18"
    />
  </svg>

)

const VectorImage = (props) => {
  return (
    <svg
      version="1.1"
      id="Слой_1"
      x="0px"
      y="0px"
      viewBox="0 0 1378 1192"
      style={{ enableBackground: "new 0 0 1378 1192" }}
      className={style.vector}
    >
      <path
        class="st0"
        fill={`#${props.firstColor}`}
        d="M166,1096.6c0,0,4,4.7,13,6.1l461.9-3.3l567.1,3.3c0.2,0,0.3,0,0.5-0.1l10.6,0c3.7,0,6.9-2.8,7.1-6.5
	c0-0.1,0-0.1,0-0.2v-2.7l-3.3-405l0.7-327.7v-66l2.7-58l2.7-77.5l0-1.9c-4.9-14.1-22.9-13-22.9-13c0,0-11.4-0.2-11.5-0.2h-118.6
	H563.1l-391.7-3.3c-1.5,0-3,0.6-4.1,1.8l-4.5,4.8c0,0-0.1,0.1-0.1,0.1l-3.8,4.9c-0.5,0.7-0.8,1.5-0.8,2.3l8,633.4l-4,300.9
	C162.2,1088.9,161.1,1092.2,166,1096.6 M1088.9,972.6c-0.1,0-0.3,0-0.4,0l-26.4-1.3l-758.2,1.3l-0.2,0c-6.7,0-7.4-3.5-7.4-3.5V442.7
	l0-0.2h6.1l0.4-11.3l-2.8-3.8l-4.6-10.5l-4.8-139.8c0-0.6,0.4-1.1,1-1.1c2.3,0,7.7,0,7.7,0c0,0,789.7-3.3,789.9-3.3c0,0,1.8,0.3,3,1
	c1.1,0.7,3.1,1.8,3.4,5.3l0,2l-2.6,136.3l-3.7,10.1l-2.8,3.8l0.4,11.3h5.5l-0.3,14l4,484.6c0,0.1,0,0.1,0,0.2l2.6,21.6
	C1098.7,963.1,1098.2,970.5,1088.9,972.6z"
      />
      <linearGradient
        id="SVGID_1_"
        gradientUnits="userSpaceOnUse"
        x1="500.1854"
        y1="854.743"
        x2="1347.6825"
        y2="-156.2536"
      >
        <stop
          offset="0.2054"
          style={{ stopColor: "#000000" }}
        />
        <stop
          offset="1"
          style={{ stopColor: "#000000", stopOpacity: "0" }}
        />
      </linearGradient>
      <path
        class="st1"
        fill="url(#SVGID_1_)"
        opacity="0.15"
        d="M1214.4,145.2l-61.2,63.8c-4.3,4.5-10.3,7.1-16.6,7.1H255.3c-9.1,0-17.8-3.7-24.1-10.2l-62.4-64.5l-3.1,3.1
    c-1.9,1.9-3.6,3.9-5.1,6.1l-1.2,1.7l-1.2,1.7l0,0.1l0.1,0L167,685l-4.9,401.1l0.1,2.9c0,0-0.5,7.4,11.4,12.3c1,0.4,4.8,1.4,5.8,1.4
    l477-3.3l558.3,3.3h4.5c4,0,7.3-3.4,7.1-7.4l-0.1-3.5h0l0,0l0-5.1l-3.5-527.9l0.7-259.8l5.3-135.2v0c0.4-6,1-10.2-8.4-16.3
    L1214.4,145.2z M1129.6,1023.4l-864-3.5c-4,0-6-4.9-3.2-7.7l39.8-39.6l-1.1-0.1c-1.4-0.1-2.8-0.6-3.9-1.6c-0.6-0.6-1.1-1.2-1.1-1.8
    v-3.6l-74.4,66.9c-1.4,1.2-3.6,0.2-3.5-1.6v0v-806c0-4.5,5.4-6.7,8.5-3.6l63.9,62.6l0-6.5c0-0.8,0.7-1.5,1.5-1.5l7,0.1l-11.9-12.3
    c-3.8-3.9-1-10.4,4.4-10.4h808.1c3.7,0,5.5,4.6,2.8,7.1l-13.5,12.3l1.4,0.3c3,0.7,5.1,3.5,5,6.6l-0.1,7.5l65.9-65.4
    c3.8-3.7,10.2-1.1,10.2,4.2v792.2c0,5.9-7.1,8.9-11.4,4.8l-61.3-59l-0.3,0.8c-1.5,4-5,7-9.3,7.7l43.5,43.7
    C1135.3,1018.9,1133.4,1023.5,1129.6,1023.4z"
      />
      <g
        class="st2"
        opacity="0.5"
      >
        <linearGradient
          id="SVGID_2_"
          gradientUnits="userSpaceOnUse"
          x1="768.7704"
          y1="438.619"
          x2="502.4414"
          y2="-202.0505"
        >
          <stop
            offset="0.2054"
            style={{ stopColor: "#FFFFFF" }}
          />
          <stop
            offset="1" style={{ stopColor: "#FFFFFF", stopOpacity: "0" }} />
        </linearGradient>
        <path
          class="st3"
          fill="url(#SVGID_2_)"
          opacity="0.5"
          d="M1089,272.7L299.2,276l-13.1-13.5c-3.3-3.4-0.9-9.2,3.9-9.2h808.6c4.1,0,6.1,5.1,3,7.9L1089,272.7z"
        /> <linearGradient
          id="SVGID_3_"
          gradientUnits="userSpaceOnUse"
          x1="797.2546"
          y1="427.2279"
          x2="527.2681"
          y2="-222.2396" >
          <stop
            offset="0.2054"
            style={{ stopColor: "#FFFFFF" }}
          />
          <stop
            offset="1"
            style={{ stopColor: "#FFFFFF", stopOpacity: "0" }}
          />
        </linearGradient>
        <path
          class="st4"
          fill="url(#SVGID_3_)"
          opacity="0.5"
          d="M378,169c0,0,50-15.2,204-15c104,0.1,391,1,429,20s-136,21-362,21S345,187,378,169z"
        />
        <linearGradient
          id="SVGID_4_"
          gradientUnits="userSpaceOnUse"
          x1="323.1534"
          y1="624.3138"
          x2="53.1669"
          y2="-25.1537"
        >
          <stop
            offset="0.2054"
            style={{ stopColor: "#FFFFFF" }}
          />
          <stop
            offset="1"
            style={{ stopColor: "#FFFFFF", stopOpacity: "0" }}
          />
        </linearGradient>
        <path
          class="st5"
          fill="url(#SVGID_4_)"
          opacity="0.5"
          d="M248.8,242.5c0,0,10.3,392.6,10.3,450c0,0,8,23.4,8-92.1s0-115.5,0-115.5l-4.2-228.5L248.8,242.5z"
        />
        <linearGradient
          id="SVGID_5_"
          gradientUnits="userSpaceOnUse"
          x1="1133.963"
          y1="287.2567"
          x2="863.9766"
          y2="-362.2108"
        >
          <stop
            offset="0.2054"
            style={{ stopColor: "#FFFFFF" }}
          />
          <stop
            offset="1"
            style={{ stopColor: "#FFFFFF", stopOpacity: "0" }}
          />
        </linearGradient>
        <path
          class="st6"
          fill="url(#SVGID_5_)"
          opacity="0.5"
          d="M1186,205v449.8c0,0,11.7,66.9,9.9-101.9C1194,384,1198,195,1198,195L1186,205z"
        />
        <linearGradient
          id="SVGID_6_"
          gradientUnits="userSpaceOnUse"
          x1="507.4656"
          y1="547.6945"
          x2="237.4791"
          y2="-101.773"
        >
          <stop
            offset="0.2054"
            style={{ stopColor: "#FFFFFF" }}
          />
          <stop
            offset="1"
            style={{ stopColor: "#FFFFFF", stopOpacity: "0" }}
          />
        </linearGradient>
        <path
          class="st7"
          fill="url(#SVGID_6_)"
          d="M420,997.8c0,0,63-5.8,263-5.8s278-2.4,290,5.8c12,8.2-172,9.8-305,10C535,1008,393,1005.6,420,997.8z"
        />
      </g>
      <polygon
        class="st8"
        fill="#191718"
        points="259.1,1068.3 261.4,1066 306.4,1066 310.9,1069.5 312.4,1085 307.9,1087.5 264.9,1087.5 260.4,1085 "
      />
      <path
        class="st9"
        fill="#2D2D2D"
        d="M179.8,606v15.4l1.3,6.6l-0.6,8.3v17.2c0,0.7,0.6,1.3,1.3,1.3H197c0,0,3-0.5,3-1.3s0-47.5,0-47.5l-3-2.8h-15.3
	L179.8,606z"
      />
      <linearGradient
        id="SVGID_7_"
        gradientUnits="userSpaceOnUse"
        x1="191.5564"
        y1="630.3227"
        x2="197.4694"
        y2="630.2629"
      >
        <stop
          offset="0.2054"
          style={{ stopColor: "#000000" }}
        />
        <stop
          offset="1"
          style={{ stopColor: "#000000", stopOpacity: "0" }}
        />
      </linearGradient>
      <polygon
        class="st10"
        fill="url(#SVGID_7_)"
        points="186.4,610.5 187.4,625.8 186.6,631 188.3,637 186.4,650.3 200,634.3 200,623.5 "
      />
      <path
        class="st11"
        fill="#191919"
        d="M186.4,610.5v7.3l-4.3,8.5c0,0-2.5,3,0,6.8l4.3,6.8v10.5h7.5v-10.8l-4-7c0,0-0.8-3,1.3-6.5s2.8-7.5,2.8-7.5v-8
	H186.4z"
      />
      <path
        class="st9"
        fill="#2D2D2D"
        d="M175.8,243.5V259l1.3,6.6l-0.6,8.3v16.4c0,1.2,0.9,2.1,2.1,2.1H193c0,0,3-0.5,3-1.3s0-47.5,0-47.5l-3-2.8h-15.3
	L175.8,243.5z"
      />
      <linearGradient
        id="SVGID_8_"
        gradientUnits="userSpaceOnUse"
        x1="187.5564"
        y1="267.8702"
        x2="193.4694"
        y2="267.8105"
      >
        <stop
          offset="0.2054"
          style={{ stopColor: "#000000" }}
        />
        <stop
          offset="1"
          style={{ stopColor: "#000000", stopOpacity: "0" }}
        />
      </linearGradient>
      <polygon
        class="st12"
        fill="url(#SVGID_8_)"
        points="182.4,248 183.4,263.3 182.6,268.5 184.3,274.5 182.4,287.8 196,271.8 196,261 "
      />
      <path
        class="st11"
        fill="#191919"
        d="M182.4,248v7.3l-4.3,8.5c0,0-2.5,3,0,6.8l4.3,6.8v10.5h7.5V277l-4-7c0,0-0.8-3,1.3-6.5s2.8-7.5,2.8-7.5v-8
	H182.4z"
      />
      <path
        class="st9"
        fill="#2D2D2D"
        d="M175.8,963.5V979l1.3,6.6l-0.6,8.3v16c0,1.4,1.1,2.5,2.5,2.5H193c0,0,3-0.5,3-1.3s0-47.5,0-47.5l-3-2.8h-15.3
	L175.8,963.5z"
      />
      <linearGradient
        id="SVGID_9_"
        gradientUnits="userSpaceOnUse"
        x1="187.5564"
        y1="987.8702"
        x2="193.4694"
        y2="987.8105"
      >
        <stop
          offset="0.2054"
          style={{ stopColor: "#000000" }}
        />
        <stop
          offset="1"
          style={{ stopColor: "#000000", stopOpacity: "0" }}
        />
      </linearGradient>
      <polygon
        class="st13"
        fill="url(#SVGID_9_)"
        points="182.4,968 183.4,983.3 182.6,988.5 184.3,994.5 182.4,1007.8 196,991.8 196,981 "
      />
      <path
        class="st11"
        fill="#191919"
        d="M182.4,968v7.3l-4.3,8.5c0,0-2.5,3,0,6.8l4.3,6.8v10.5h7.5V997l-4-7c0,0-0.8-3,1.3-6.5s2.8-7.5,2.8-7.5v-8
	H182.4z"
      />
      <path
        class="st9"
        fill="#2D2D2D"
        d="M1212.1,596v15.4l-1.3,6.6l0.6,8.3v13.9c0,2.6-2.1,4.6-4.6,4.6h-12c0,0-3-0.5-3-1.3s0-47.5,0-47.5l3-2.8h15.3
	L1212.1,596z"
      />
      <linearGradient
        id="SVGID_10_"
        gradientUnits="userSpaceOnUse"
        x1="-824.562"
        y1="620.3227"
        x2="-818.6489"
        y2="620.2629"
        gradientTransform="matrix(-1 0 0 1 375.75 0)"
      >
        <stop
          offset="0.2054"
          style={{ stopColor: "#000000" }}
        />
        <stop
          offset="1"
          style={{ stopColor: "#000000", stopOpacity: "0" }}
        />
      </linearGradient>
      <polygon
        class="st14"
        fill="url(#SVGID_10_)"
        points="1205.5,600.5 1204.5,615.8 1205.2,621 1203.6,627 1205.5,640.3 1191.9,624.3 1191.9,613.5 "
      />
      <path
        class="st11"
        fill="#191919"
        d="M1205.5,600.5v7.3l4.3,8.5c0,0,2.5,3,0,6.8l-4.3,6.8v10.5h-7.5v-10.8l4-7c0,0,0.8-3-1.3-6.5s-2.8-7.5-2.8-7.5
	v-8H1205.5z"
      />
      <path
        class="st9"
        fill="#2D2D2D"
        d="M1216.1,233.5V249l-1.3,6.6l0.6,8.3v14.9c0,2-1.6,3.6-3.6,3.6h-13c0,0-3-0.5-3-1.3s0-47.5,0-47.5l3-2.8h15.3
	L1216.1,233.5z"
      />
      <linearGradient
        id="SVGID_11_"
        gradientUnits="userSpaceOnUse"
        x1="-828.562"
        y1="257.8702"
        x2="-822.6489"
        y2="257.8105"
        gradientTransform="matrix(-1 0 0 1 375.75 0)"
      >
        <stop
          offset="0.2054"
          style={{ stopColor: "#000000" }}
        />
        <stop
          offset="1"
          style={{ stopColor: "#000000", stopOpacity: "0" }}
        />
      </linearGradient>
      <polygon
        class="st15"
        fill="url(#SVGID_11_)"
        points="1209.5,238 1208.5,253.3 1209.2,258.5 1207.6,264.5 1209.5,277.8 1195.9,261.8 1195.9,251 "
      />
      <path
        class="st11"
        fill="#191919"
        d="M1209.5,238v7.3l4.3,8.5c0,0,2.5,3,0,6.8l-4.3,6.8v10.5h-7.5V267l4-7c0,0,0.8-3-1.3-6.5
	c-2-3.5-2.8-7.5-2.8-7.5v-8H1209.5z"
      />
      <path
        class="st9"
        fill="#2D2D2D"
        d="M1216.1,953.5V969l-1.3,6.6l0.6,8.3v14.4c0,2.3-1.9,4.1-4.1,4.1h-12.5c0,0-3-0.5-3-1.3s0-47.5,0-47.5l3-2.8
	h15.3L1216.1,953.5z"
      />
      <linearGradient
        id="SVGID_12_"
        gradientUnits="userSpaceOnUse"
        x1="-828.562"
        y1="977.8702"
        x2="-822.6489"
        y2="977.8105"
        gradientTransform="matrix(-1 0 0 1 375.75 0)"
      >
        <stop
          offset="0.2054"
          style={{ stopColor: "#000000" }}
        />
        <stop
          offset="1"
          style={{ stopColor: "#000000", stopOpacity: "0" }}
        />
      </linearGradient>
      <polygon
        class="st16"
        fill="url(#SVGID_12_)"
        points="1209.5,958 1208.5,973.3 1209.2,978.5 1207.6,984.5 1209.5,997.8 1195.9,981.8 1195.9,971 "
      />
      <path
        class="st11"
        fill="#191919"
        d="M1209.5,958v7.3l4.3,8.5c0,0,2.5,3,0,6.8l-4.3,6.8v10.5h-7.5V987l4-7c0,0,0.8-3-1.3-6.5s-2.8-7.5-2.8-7.5v-8
	H1209.5z"
      />
      <path
        class="st17"
        fill="none"
        stroke="#212021"
        strokeWidth="3"
        strokeMiterlimit="10"
        d="M278.9,1077.5c0.5-1.1-12.4-13.3-22.5-16.5s-21.8-1.8-33.3,9.3c0,0-8.4,9.3,1.4,15.4c0,0,9.4,5.9,25.8,1.9
    l26-6.3"
      />
      <path
        class="st9"
        fill="#2D2D2D"
        d="M274.3,1075.3c0,0,0.5,2,6.8,2.5s10.5,0.3,15-2.5v7c0,0-3.4,1.6-10.9,1.5c-1,0-1.9,0.1-2.9,0.1
	c-2.3-0.1-6.6-0.5-8-1.3V1075.3z"
      />
      <polygon
        class="st8"
        fill="#191718"
        points="1086.6,1068.3 1088.9,1066 1133.9,1066 1138.4,1069.5 1139.9,1085 1135.4,1087.5 1092.4,1087.5 
	1087.9,1085 "
      />
      <path
        class="st17"
        d="M1106.4,1077.5c0.5-1.1-12.4-13.3-22.5-16.5s-21.8-1.8-33.3,9.3c0,0-8.4,9.3,1.4,15.4c0,0,9.4,5.9,25.8,1.9
	l26-6.3"
      />
      <path
        class="st9"
        fill="#2D2D2D"
        d="M1101.7,1075.3c0,0,0.5,2,6.8,2.5s10.5,0.3,15-2.5v7c0,0-3.4,1.6-10.9,1.5c-1,0-1.9,0.1-2.9,0.1
	c-2.3-0.1-6.6-0.5-8-1.3V1075.3z"
      />
      <path
        class="st18"
        fill={`#${props.secondColor}`}
        d="M302.7,431.3l260,2.7l523.8-2.7l0.4,11.3h6.1l3.4,500.2c0,0-19-8.6-32.3,8c0,0-6,8.5-2,20.5l-739.2,1.3
	c0,0,5.6-15.7-7-26.4c0,0-7.5-6.9-19.6-2.4l-0.8-501.2l6.9-0.2L302.7,431.3z"
      />
      <path
        class="st19"
        opacity="0.52"
        fill="#19191B"
        d="M322.8,972.7c0,0,2.3-6.8,0.5-14.7l738.5-2.7c0,0-3.1,8.1,0.2,16.1L322.8,972.7z"
      />
      <polygon
        class="st19"
        opacity="0.52"
        fill="#19191B"
        points="295.5,442.5 296.1,943.6 297.8,943 302.3,442.5 "
      />
      <polygon
        class="st19"
        opacity="0.52"
        fill="#19191B"
        points="1086.9,442.6 1094.2,942.1 1096.3,942.8 1092.9,442.6 "
      />
      <polygon
        class="st20"
        opacity="0.25"
        points="1092.9,442.6 1086.9,442.6 1086.5,431.3 1092.9,431.3 "
      />
      <rect
        x="295.4"
        y="431.2"
        transform="matrix(-1 -4.497881e-11 4.497881e-11 -1 597.6667 873.6675)"
        class="st20"
        opacity="0.25"
        width="6.9"
        height="11.3"
      />
    </svg >
  )
}