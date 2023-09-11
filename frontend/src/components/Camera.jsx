import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGeolocated } from "react-geolocated";
import Webcam from "react-webcam";
import { useAuth } from "../contexts/AuthContext";

import { Valide, NewStreetArt, Posseder } from "./PopUp";

function Camera() {
  const nav = useNavigate();
  const { setToken, setRole } = useAuth();
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [videoConstraint] = useState("environment");
  const [sovData, setSovData] = useState();
  const [valide, setValide] = useState(false);
  const [newStreetArt, setNewStreetArt] = useState(false);
  const [posseder, setPosseder] = useState(false);

  const { token } = useAuth();
  const navigate = useNavigate();
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  const retake = () => {
    if (imgSrc) {
      setImgSrc(null);
    } else {
      navigate("/menu");
    }
  };
  const capture = () => {
    if (imgSrc) {
      fetch(imgSrc)
        .then((response) => response.blob())
        .then((blob) => {
          const formData = new FormData();
          const data = new FormData();
          formData.append(
            "gallery",
            new File([blob], "tmp", { type: blob.type })
          );
          data.append(
            "streetArt",
            new File([blob], "tmp", { type: blob.type })
          );
          formData.append("x", coords.latitude);
          formData.append("y", coords.longitude);
          data.append("x", coords.latitude);
          data.append("y", coords.longitude);
          setSovData(data);
          fetch(
            `${
              import.meta.env.VITE_BACKEND_URL ?? "http://localhost:6000"
            }/gallery`,
            {
              method: "post",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            }
          )
            .then((response) => {
              return response.json();
            })
            .then((res) => {
              if (res.text === "Created") {
                setValide(true);
              } else if (res.text === "notExist") {
                setNewStreetArt(true);
              } else if (res.text === "posséder") {
                setPosseder(true);
              }
              retake();
            });
        });
    } else {
      setImgSrc(webcamRef.current.getScreenshot());
    }
  };
  const NewArt = () => {
    setNewStreetArt(false);
    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL ?? "http://localhost:6000"
      }/street-arts`,
      {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: sovData,
      }
    )
      .then((response) => {
        return response.text();
      })
      .then((res) => {
        if (res === "Created") {
          setValide(true);
        }
      });
  };
  return (
    <div>
      {valide && <Valide setValide={setValide} />}
      {newStreetArt && (
        <NewStreetArt setNewStreetArt={setNewStreetArt} NewArt={NewArt} />
      )}
      {posseder && <Posseder setPosseder={setPosseder} />}
      <div className="container">
        {imgSrc ? (
          <div className="img-container">
            <img src={imgSrc} alt="webcam" />
            <button type="button" className="left" onClick={capture}>
              valider
            </button>
            <button type="button" className="right" onClick={retake}>
              refu
            </button>
          </div>
        ) : (
          <div className="video-container">
            <Webcam
              height="auto"
              width="auto"
              ref={webcamRef}
              screenshotFormat="image/webp"
              videoConstraints={{ facingMode: videoConstraint }}
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Red_round_button.svg/1200px-Red_round_button.svg.png"
              alt=""
              // onClick={capture}
            />
          </div>
        )}
      </div>
      <button type="button" className="retoure" onClick={() => nav("/menu")}>
        Menu
      </button>
      <button
        type="button"
        className="deconnexion"
        onClick={() => {
          sessionStorage.removeItem("token");
          setToken(null);
          sessionStorage.removeItem("role");
          setRole(null);
          nav("/");
        }}
      >
        Deconnexion
      </button>
    </div>
  );
}

export default Camera;
