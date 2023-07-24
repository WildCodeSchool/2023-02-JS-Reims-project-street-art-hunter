import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PendingStreetArtList() {
  const [streetArts, setStreetArts] = useState([]);
  const { token } = useAuth();

  const fetchGallery = () => {
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
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const validate = (event, id) => {
    event.preventDefault();
    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
      }/gallery/${id}`,
      {
        method: "put",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      }
    ).then((response) => {
      if (response.ok) fetchGallery();
    });
  };

  const deleteGallery = (event, id) => {
    event.preventDefault();
    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
      }/gallery/${id}`,
      {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      }
    ).then((response) => {
      if (response.ok) fetchGallery();
    });
  };

  return (
    <>
      <Link to="/street-arts">Allez aux street arts de référence</Link>
      <div className="gallery">
        {streetArts.map((streetArt) => (
          <figure key={streetArt.id}>
            <Link
              to={`/street-arts/${streetArt.id}/${streetArt.longitude}/${streetArt.latitude}`}
            >
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${streetArt.image}`}
                alt="streetart"
              />
            </Link>
            <form onSubmit={(event) => validate(event, streetArt.id)}>
              <button type="submit" className="validationButton">
                Valider ce street art
              </button>
            </form>
            <form onSubmit={(event) => deleteGallery(event, streetArt.id)}>
              <button type="submit" className="validationButton">
                Refuser ce street art
              </button>
            </form>
          </figure>
        ))}
      </div>
    </>
  );
}
