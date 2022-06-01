import { ComposableMap, Geographies, Geography, Graticule, Marker } from "react-simple-maps";
import { csv } from "d3-fetch";
import { useEffect, useState } from "react";
import style from "./style.module.scss"
import { useInView } from "react-hook-inview";



export default function RuMap(props) {

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
        projection="geoMercator"
        projectionConfig={{
          rotate: [-95.0, -62.0, 0],
          scale: 600
        }}
      >
        <Graticule />
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      outline: "none",
                      stroke: "#000000",
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
                      strokeWidth: "1"
                    },
                    pressed: {
                      fill: "#0090FF",
                      outline: "none"
                    },

                  }}
                  fill="#fff"
                />
              );
            })
          }
        </Geographies>
        {markers.map(({ name, coordinates, markerOffset }) => (
          <Marker key={name} coordinates={coordinates}>
            <circle r={10} fill="#000000" stroke="#fff" strokeWidth={2} />
            <text
              textAnchor="middle"
              y={markerOffset}
              style={{ fontFamily: "Roboto", fill: "#ffffff" }}
            >
              {name}
            </text>
          </Marker>
        ))}
      </ComposableMap >
    </div>
  )
}

const geoUrl =
  "/map.json";

const markers = [
  { markerOffset: -15, name: "Город тут", coordinates: [50.1193, 56.4897] },

];