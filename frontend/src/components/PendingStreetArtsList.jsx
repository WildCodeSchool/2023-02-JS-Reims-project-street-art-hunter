import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PendingStreetArtList() {
  const [streetArts, setStreetArts] = useState([]);
  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
      }/street-arts-pending`
    )
      .then((response) => response.json())
      .then((data) => {
        setStreetArts(data);
      });
  }, []);

  return (
    <>
      <Link to="/street-arts" className="validationButton">
        Allez aux street arts de référence
      </Link>
      <div className="gallery">
        {streetArts.map((streetArt) => (
          <figure key={streetArt.id}>
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${streetArt.image}`}
              alt="streetart"
            />
            <button type="button" className="validationButton">
              Valider ce street art
            </button>
            <button type="button" className="validationButton">
              Refuser ce street art
            </button>
          </figure>
        ))}
      </div>
    </>
  );
}
