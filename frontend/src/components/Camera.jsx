import { useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

import GameBoy from "./GameBoy";

function Camera() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [label1, setLabel1] = useState("Screen");
  const [label2, setLabel2] = useState("Return");

  const navigate = useNavigate();

  const capture = useCallback(() => {
    setImgSrc(webcamRef.current.getScreenshot());
    setLabel1("Confirm");
    setLabel2("cancel");
  }, [webcamRef]);

  const retake = () => {
    if (imgSrc) {
      setImgSrc(null);
      setLabel1("Screen");
      setLabel2("Return");
    } else {
      navigate("/");
    }
  };

  return (
    <GameBoy
      button1Controller={capture}
      button2Controller={retake}
      buttonLabel1={label1}
      buttonLabel2={label2}
      ButtonColor1={label1 === "Confirm" ? "green" : "red"}
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
              mirrored
            />
          </div>
        )}
      </div>
    </GameBoy>
  );
}

export default Camera;
