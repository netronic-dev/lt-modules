import { ComposableMap, Geographies, Geography, Graticule, Marker } from "react-simple-maps";
import { csv } from "d3-fetch";
import { useEffect, useState } from "react";
import style from "./style.module.scss";
import { clubsCountriesData, clubsDataEn } from "../../DataEn/clubsDataEn";
import { useRouter } from "next/router";

export function MapClubsRu(props) {

  const [data, setData] = useState([]);

  useEffect(() => {
    csv(`/countries-sales.csv`).then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div className={style.map}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          rotate: [-95.0, -62.0, 0],
          scale: 600
        }}
      >
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

export function MapClubsEn(props) {
  const router = useRouter();
  const [data, setData] = useState([]);

  let linksData = []
  clubsCountriesData.forEach(item => item.items ? item.items.forEach(
    itemItem => linksData = [...linksData, itemItem]
  ) : null)
  useEffect(() => {
    setData(clubsDataEn);
  }, []);
  return (
    <div className={style.map_clubs}>
      <ComposableMap
        data-tip=""
        width={800}
        height={350}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const cur = data.find(item => item.name === geo.properties.NAME);
              const curCountry = linksData.find(item => item.name === geo.properties.NAME);
              if (cur) {
                return (
                  <>
                    <Geography
                      key={geo.index}
                      geography={geo}
                      onClick={() => { router.push(curCountry.link) }}
                      onMouseEnter={() => {
                        props.setTooltipContent(`${geo.properties.NAME}${" — " + cur.items.length + " club(s)"}`);
                      }}
                      onMouseLeave={() => {
                        props.setTooltipContent("");
                      }}
                      style={{
                        default: {
                          outline: "none",
                          stroke: "#000000",
                          strokeWidth: "0.2",
                        },
                        active: {
                          fill: "#ffffff",
                          outline: "none"
                        },
                        hover: {
                          fill: "#0091ffcb",
                          outline: "none",
                          stroke: "#EDEEF0",
                          cursor: "pointer",
                          strokeWidth: "0.5",
                        },
                        pressed: {
                          fill: "#0090FF",
                          outline: "none"
                        },
                      }}
                      fill="#0090FF"
                    />
                  </>
                );
              }
              else {
                return (
                  <>
                    <Geography
                      key={geo.index}
                      geography={geo}
                      onMouseEnter={() => {
                        props.setTooltipContent(`${geo.properties.NAME}`);
                      }}
                      onMouseLeave={() => {
                        props.setTooltipContent("");
                      }}
                      style={{
                        default: {
                          outline: "none",
                          stroke: "#000000",
                          strokeWidth: "0.2",
                        },
                        pressed: {
                          outline: "none"
                        },
                        active: {
                          fill: "#ffffff",
                          outline: "none"
                        },
                        hover: {
                          fill: "#DEDEDE",
                          outline: "none",
                          strokeWidth: "0.1",
                        },
                      }}
                      fill="#fff"
                    />
                  </>
                );
              }
            })
          }
        </Geographies>
      </ComposableMap >
    </div>
  )
}

const geoUrl =
  "/map.json";

const markers = [
  { markerOffset: -15, name: "Город тут", coordinates: [50.1193, 56.4897] },
];