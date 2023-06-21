import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Artist() {
  const { id } = useParams();
  const [artist, setArtist] = useState([]);
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
    <div>
      <figure key={artist.id}>
        <figcaption>
          <p>{artist.name}</p>
          <p>{artist.bio}</p>
        </figcaption>
      </figure>
    </div>
  );
}
