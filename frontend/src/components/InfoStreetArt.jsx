import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MapStreetArt from "./MapStreetArt";

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
        setStreetArt(data);
        console.info(data);
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
          className="img-info-street-art"
        />
        <figcaption className="description-street-art">
          {streetArt.name && <p>{streetArt.name}</p>}
          {streetArt.creation_date}
          <p>Score : {streetArt.score} point</p>
          {streetArt.creation_date && (
            <p>Date de creation : {streetArt.creation_date}</p>
          )}
          {streetArt.artistName && (
            <p>
              Artiste :{" "}
              <Link to={`/gallery/artists/${streetArt.id_artist}`}>
                {streetArt.artistName}
              </Link>
            </p>
          )}
          <p>Géolocalisation :</p>
        </figcaption>
        <section className="map-container">
          <MapStreetArt className="map-street-art" />
        </section>
      </figure>
    </div>
  );
}

/*  */
