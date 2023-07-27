import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    <>
      <h1>Ma galerie</h1>
      <div className="gallery">
        {gallery.map((picture) => {
          const newdate = picture.creation_date.split("T");
          newdate[0] = newdate[0].split("-").reverse().join("-");
          newdate[1] = newdate[1].slice(0, 8);
          return (
            <Link
              to={`/gallery/${picture.id_street_art}/${picture.longitude}/${picture.latitude}`}
              key={picture.id}
            >
              <figure>
                <img
                  src={`${
                    import.meta.env.VITE_BACKEND_URL ?? `http://localhost:5000`
                  }${picture.image}`}
                  alt=""
                />
                <figcaption>
                  {picture.name && <p>{picture.name}</p>}
                  <p>Date : {newdate[0]}</p>
                  <p>Heure : {newdate[1]}</p>
                  <p className="pScore">{picture.score} point</p>
                </figcaption>
              </figure>
            </Link>
          );
        })}
      </div>
    </>
  );
}
