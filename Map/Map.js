import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantize } from "d3-scale";
import { csv } from "d3-fetch";
import { useEffect, useState } from "react";
import style from "./style.module.scss"
import { useInView } from "react-hook-inview";

const geoUrl = "/map.json";

const colorScale = scaleQuantize()
  .domain([1, 4])
  .range([
    "#0090FF",
    "#0090FF",
    "#0090FF",
    "#ffffff"
  ]);

export default function Map(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    csv(`/countries.csv`).then((data) => {
      setData(data);
    });
  }, []);

  const [ref, isVisible] = useInView()

  return (
    <div className={style.map} ref={ref}>
      <ComposableMap
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const cur = data.find(s => s.id === geo.id);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}

                  style={{
                    default: {
                      outline: "none",
                      stroke: "#EDEEF0",
                      strokeWidth: "1",
                    },
                    active: {
                      fill: "#ffffff",
                      outline: "none"
                    },
                    hover: {
                      fill: "#0091ffcb",
                      outline: "none",
                      stroke: "#EDEEF0",
                      strokeWidth: "2"
                    },
                    pressed: {
                      fill: "#0090FF",
                      outline: "none"
                    },

                  }}
                  fill={colorScale(cur ? cur.unemployment_rate : "#EEE")}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap >
    </div>
  )
}