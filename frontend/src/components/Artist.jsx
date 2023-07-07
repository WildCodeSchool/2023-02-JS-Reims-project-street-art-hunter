import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Artist() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
      }/artists/${id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setArtist(data);
      });
  }, []);
  return (
    <div className="artistCards">
      <article>
        <header>
          <h2>{artist?.name}</h2>
        </header>
        {artist?.picture && (
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}${artist?.picture}`}
            alt="artist"
          />
        )}
        <div className="artistCardContent">
          <p>{artist?.bio}</p>
        </div>
      </article>
    </div>
  );
}
