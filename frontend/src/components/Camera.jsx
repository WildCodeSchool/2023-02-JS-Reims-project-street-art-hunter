import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGeolocated } from "react-geolocated";
import Webcam from "react-webcam";
import { useAuth } from "../contexts/AuthContext";

import GameBoy from "./GameBoy";

function Camera() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [label1, setLabel1] = useState("Screen");
  const [label2, setLabel2] = useState("Return");
  const [videoConstraint, setVideoConstraint] = useState("environment");

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
      setLabel1("Screen");
      setLabel2("Return");
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
          formData.append(
            "gallery",
            new File([blob], "tmp", { type: blob.type })
          );
          formData.append("x", coords.latitude);
          formData.append("y", coords.longitude);
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
          ).then((response) => {
            if (response.ok) {
              alert("ok");
            } else {
              alert("nop");
            }
            retake();
          });
        });
    } else {
      setImgSrc(webcamRef.current.getScreenshot());
      setLabel1("Confirm");
      setLabel2("cancel");
    }
  };
  return (
    <GameBoy
      button1Controller={capture}
      button2Controller={retake}
      buttonLabel1={label1}
      buttonLabel2={label2}
      buttonLabelup="Facing-Out camera"
      ButtonColor1={label1 === "Confirm" ? "green" : "red"}
      upController={() => {
        setVideoConstraint("environment");
      }}
      buttonLabeldown="forward facing camera"
      downController={() => {
        setVideoConstraint("user");
      }}
    >
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
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: videoConstraint }}
              mirrored={videoConstraint === "user"}
            />
          </div>
        )}
      </div>
    </GameBoy>
  );
}

export default Camera;
