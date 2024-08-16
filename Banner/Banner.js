import Image from "next/image";
import { useRouter } from "next/router";

import style from "./style_copy.module.scss";
import bgVerticalLine from "../../public/new LTO/left vertical line.png";
import bgHeroes from "../../public/new LTO/bg heroes.png";
import bgFigure from "../../public/new LTO/bg figure.png";
import bgPolygon from "../../public/new LTO/bg polygon.png";

const Banner = (props) => {
  const router = useRouter();

  return (
    <div className={`${style.banner} fade-down-animation`}>

    </div>
  );
};

export default Banner;
