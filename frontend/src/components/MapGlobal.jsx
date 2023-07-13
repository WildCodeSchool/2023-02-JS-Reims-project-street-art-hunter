import { Map, Overlay } from "pigeon-maps";

import { stamenToner } from "pigeon-maps/providers";
import { useEffect, useState } from "react";

import { useAuth } from "../contexts/AuthContext";

export default function MapGlobal() {
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
        provider={stamenToner}
        defaultCenter={longitudeLatitude}
        defaultZoom={12}
      >
        {listStreetArt &&
          listStreetArt.map((streetart) => (
            <Overlay
              anchor={[streetart.longitude, streetart.latitude]}
              offset={[120, 79]}
            >
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
    </div>
  );
}
