import { useEffect, useState } from "react";

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const id = 1;
  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL ?? `http://localhost:5000`
      }/users/${id}/gallery`
    )
      .then((res) => res.json())
      .then((data) => {
        setGallery(data);
      });
  }, []);
  return (
    <div className="gallery">
      {gallery.map((picture) => (
        <figure key={picture.id}>
          <img src={picture.image} alt="" />
          <figcaption>
            {picture.name && <p>{picture.name}</p>}
            {picture.creation_date}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
