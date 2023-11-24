import { Map, Overlay, ZoomControl } from "pigeon-maps";

import { osm } from "pigeon-maps/providers";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function MapGlobal() {
  const nav = useNavigate();
  const { token } = useAuth();
  const [listStreetArt, setListStreetArt] = useState([]);
  const [longitudeLatitude, setLongitudeLatitude] = useState([
    49.24098, 4.01945,
  ]);

  function setCenterPos(arts) {
    let longMoy = 0;
    let latMoy = 0;
    for (let i = 0; i < arts.length; i += 1) {
      longMoy += arts[i].longitude;
      latMoy += arts[i].latitude;
    }
    longMoy /= arts.length;
    latMoy /= arts.length;
    return [longMoy, latMoy];
  }
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
        setListStreetArt(data);
        setLongitudeLatitude(setCenterPos(data));
      });
  }, []);
  return (
    <div className="map-global-container">
      <Map
        provider={osm}
        defaultCenter={longitudeLatitude}
        defaultZoom={12}
        minZoom={8}
      >
        <ZoomControl />
        {listStreetArt &&
          listStreetArt.map((streetart) => (
            <Overlay anchor={[streetart.longitude, streetart.latitude]}>
              <img
                src={`${
                  import.meta.env.VITE_BACKEND_URL ?? `http://localhost:5000`
                }${streetart.image}`}
                width={90}
                height={60}
                alt=""
              />
            </Overlay>
          ))}
      </Map>
      <button type="button" className="retoure" onClick={() => nav("/menu")}>
        retoure au menu
      </button>
    </div>
  );
}
