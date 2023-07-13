import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGeolocated } from "react-geolocated";
import Webcam from "react-webcam";
import { useAuth } from "../contexts/AuthContext";

import GameBoy from "./GameBoy";
import { Valide, NewStreetArt, Posseder } from "./PopUp";

function Camera() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [label1, setLabel1] = useState("Prendre la photo");
  const [label2, setLabel2] = useState("Retour");
  const [videoConstraint, setVideoConstraint] = useState("environment");
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
      setLabel1("Prendre la photo");
      setLabel2("Retour");
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
      setLabel1("Confirmer");
      setLabel2("Annuler");
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
    <GameBoy
      button1Controller={capture}
      button2Controller={retake}
      buttonLabel1={label1}
      buttonLabel2={label2}
      buttonLabelup="Caméra arrière"
      ButtonColor1={label1 === "Confirm" ? "green" : "red"}
      upController={() => {
        setVideoConstraint("environment");
      }}
      buttonLabeldown="Caméra frontale"
      downController={() => {
        setVideoConstraint("user");
      }}
    >
      {valide && <Valide setValide={setValide} />}
      {newStreetArt && (
        <NewStreetArt setNewStreetArt={setNewStreetArt} NewArt={NewArt} />
      )}
      {posseder && <Posseder setPosseder={setPosseder} />}
      <div className="container">
        {imgSrc ? (
          <div className="img-container">
            <img src={imgSrc} alt="webcam" />
          </div>
        ) : (
          <div className="video-container">
            <Webcam
              height="auto"
              width="auto"
              ref={webcamRef}
              screenshotFormat="image/webp"
              videoConstraints={{ facingMode: videoConstraint }}
              mirrored
            />
          </div>
        )}
      </div>
    </GameBoy>
  );
}

export default Camera;
