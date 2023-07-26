import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from 'leaflet';
import customMarkerIconPng from "./images/marker-icon-2x.png";

function MapPoint({ width, height, data }) {

  const customIcon = new Icon({
    iconUrl: customMarkerIconPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });


  return (
    <div className="chart-container">
      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{ width: width, height: height }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {data.map((country, index) => (
          <Marker key={index} position={[country.lat, country.lon]} icon={customIcon}>
            <Popup>{country.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapPoint;
