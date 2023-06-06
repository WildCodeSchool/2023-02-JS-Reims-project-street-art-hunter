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
  console.log(streetArts)
  return (
    <div className="gallery">
      {streetArts.map((streetArt) => (
        <figure key={streetArt.id}>
          <img src={streetArt.image
          ? `${import.meta.env.VITE_BACKEND_URL}${streetArt.image}`
          : streetArt.image} alt="" />
          
          <figcaption>
            {streetArt.id && <p>{streetArt.id}</p>}
            
          </figcaption>
          
        </figure>
      ))}
    </div>
  );
}
