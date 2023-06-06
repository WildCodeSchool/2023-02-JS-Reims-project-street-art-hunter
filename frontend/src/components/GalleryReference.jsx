import { useEffect, useState } from "react";

export default function GalleryReference() {
  const [streetArts, setStreetArts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/street-arts")
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
            alt="picture of street art"
          />

          <figcaption>{streetArt.name && <p>{streetArt.name}</p>}</figcaption>
        </figure>
      ))}
    </div>
  );
}
