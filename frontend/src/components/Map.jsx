import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { locationIcon } from "../utils/mapIcon";

const Map = ({ lat, lng }) => {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      scrollWheelZoom={false}
      className="map-container"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lng]} icon={locationIcon}>
        <Popup className="popup-container">
          <strong>{`[${lat}, ${lng}]`}</strong> <br />
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
