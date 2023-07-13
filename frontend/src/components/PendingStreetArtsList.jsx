import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PendingStreetArtList() {
  const [streetArts, setStreetArts] = useState([]);
  const { token } = useAuth();
  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
      }/street-arts-pending`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setStreetArts(data);
      });
  }, []);

  return (
    <>
      <Link to="/street-arts">Allez aux street arts de référence</Link>
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
