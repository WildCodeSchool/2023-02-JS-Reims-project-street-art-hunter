import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useParams } from "react-router-dom";

export default function MapStreetArt() {
  const { longitude, latitude } = useParams();
  const longitudeLatitude = [longitude, latitude];

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
