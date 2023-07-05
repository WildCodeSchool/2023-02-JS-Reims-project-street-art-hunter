import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useAuth } from "../contexts/AuthContext";

export default function InfoStreetArt() {
  const { token } = useAuth();
  const [streetArt, setStreetArt] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL ?? `http://localhost:5000`
      }/street-arts/${id}`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.info(data);
        setStreetArt(data);
      });
  }, []);
  return (
    <div className="show-art">
      <figure>
        <img
          src={`${import.meta.env.VITE_BACKEND_URL ?? `http://localhost:5000`}${
            streetArt.image
          }`}
          alt=""
        />
        <figcaption>
          {streetArt.name && <p>{streetArt.name}</p>}
          {streetArt.creation_date}
          <p>{streetArt.score} point</p>
          <p>Latitude : {streetArt.latitude}</p>
          <p>Longitude : {streetArt.longitude}</p>
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]} />
          </MapContainer>
        </figcaption>
      </figure>
    </div>
  );
}
