import { useParams } from "react-router-dom";
import { Map, Marker, ZoomControl } from "pigeon-maps";

import { stamenToner } from "pigeon-maps/providers";

export default function MapStreetArt() {
  const { longitude, latitude } = useParams();

  const longitudeLatitude = [parseFloat(longitude), parseFloat(latitude)];

  return (
    <Map
      provider={stamenToner}
      height={400}
      defaultCenter={longitudeLatitude}
      defaultZoom={14}
      minZoom={8}
    >
      <ZoomControl />
      <Marker width={50} anchor={longitudeLatitude} />
    </Map>
  );
}
