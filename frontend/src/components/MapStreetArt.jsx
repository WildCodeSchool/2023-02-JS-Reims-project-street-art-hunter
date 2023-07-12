import { useParams } from "react-router-dom";
import { Map, Marker } from "pigeon-maps";

export default function MapStreetArt() {
  const { longitude, latitude } = useParams();

  const longitudeLatitude = [parseFloat(longitude), parseFloat(latitude)];

  return (
    <Map height={400} defaultCenter={longitudeLatitude} defaultZoom={14}>
      <Marker width={50} anchor={longitudeLatitude} />
    </Map>
  );
}
