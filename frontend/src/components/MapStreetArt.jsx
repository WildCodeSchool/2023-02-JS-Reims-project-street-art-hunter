import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

export default function MapStreetArt() {
  const url = document.location.href;
  let longitudeLatitude = url.match(/\d{1,}\.\d+/g);
  if (longitudeLatitude.length !== 2) {
    longitudeLatitude = [0, 0];
  } else {
    for (let i = 0; i < longitudeLatitude.length; i += 1) {
      longitudeLatitude[i] = parseFloat(longitudeLatitude[i]);
    }
  }

  return (
    <MapContainer
      center={longitudeLatitude}
      zoom={15}
      scrollWheelZoom={false}
      style={{ flexGrow: 1, minHeight: "initial" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={longitudeLatitude} />
    </MapContainer>
  );
}
