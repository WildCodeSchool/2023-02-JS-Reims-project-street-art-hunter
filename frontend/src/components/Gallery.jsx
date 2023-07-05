import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Gallery() {
  const { token } = useAuth();
  const [gallery, setGallery] = useState([]);
  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL ?? `http://localhost:5000`
      }/users/gallery`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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
          <img
            src={`${
              import.meta.env.VITE_BACKEND_URL ?? `http://localhost:5000`
            }${picture.image}`}
            alt=""
          />
          <figcaption>
            {picture.name && <p>{picture.name}</p>}
            {picture.creation_date}
            <p>{picture.score} point</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
