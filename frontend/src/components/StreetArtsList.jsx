import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function StreetArtList() {
  const [streetArts, setStreetArts] = useState([]);
  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
      }/street-arts`
    )
      .then((response) => response.json())
      .then((data) => {
        setStreetArts(data);
      });
  }, []);

  return (
    <div className="gallery">
      {streetArts.map((streetArt) => (
        <figure key={streetArt.id}>
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}${streetArt.image}`}
            alt="streetart"
          />

          <figcaption>
            {streetArt.name && <p>{streetArt.name}</p>}
            {streetArt.artistName && (
              <Link to={`/artists/${streetArt.id_artist}`}>
                {streetArt.artistName}
              </Link>
            )}
            <p>{streetArt.score} points</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
