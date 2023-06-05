import { useEffect, useState } from "react";

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  useEffect(
    () =>
      setGallery([
        {
          id: 1,
          name: "test1",
          image: "src/assets/up.png",
          longitude: 1,
          latitude: 1,
          is_valid: 1,
          creation_date: "2023-06-05 11:42:56",
        },
        {
          id: 2,
          name: null,
          image: "",
          longitude: 1,
          latitude: 1,
          is_valid: 1,
          creation_date: "2023-06-05 11:42:56",
        },
        {
          id: 3,
          name: "test3",
          image: "",
          longitude: 1,
          latitude: 1,
          is_valid: 1,
          creation_date: "2023-06-05 11:42:56",
        },
        {
          id: 4,
          name: "test4",
          image: "",
          longitude: 1,
          latitude: 1,
          is_valid: 1,
          creation_date: "2023-06-05 11:42:56",
        },
        {
          id: 5,
          name: null,
          image: "",
          longitude: 1,
          latitude: 1,
          is_valid: 1,
          creation_date: "2023-06-05 11:42:56",
        },
      ]),
    []
  );
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
