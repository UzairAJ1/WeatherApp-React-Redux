import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarkerImg from "../assets/512px-Map_marker.svg.png";

const Display_data = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.weather);
  console.log("Coords:", weatherData);
  console.log("lat:", weatherData.data.coord.lon);
  const customIcon = new L.Icon({
    iconUrl: MarkerImg,
    iconSize: [30, 50],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
  });
  return (
    <>
      <div className="text-white mt-6 w-full">
        <h1 className="text-xl font-bold">Weather Data</h1>
        <div>Location : {weatherData.data.name}</div>
        <div>ID : {weatherData.data.id}</div>
        <div>TimeZone : {weatherData.data.timezone}</div>
        <div>{weatherData.data.sys.country}</div>
        <div>Temp : {weatherData.data.main.temp}</div>
        <div>{weatherData.data.weather.main}</div>

        {weatherData.data.weather.map((data, index) => (
          <>
            <div className="text-white" key={index}>
              Weather: {data.main}
            </div>
            <div className="text-white">Description : {data.description}</div>
          </>
        ))}

        <div className="w-full h-[600px] ">
          <MapContainer
            style={{ height: 500 }}
            center={[weatherData.data.coord.lat, weatherData.data.coord.lon]}
            zoom={7}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[
                weatherData.data.coord.lat,
                weatherData.data.coord.lon,
              ]}
              icon={customIcon}
            >
              <Popup>
                Location
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default Display_data;
