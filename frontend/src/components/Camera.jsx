import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { useRef, useState, useCallback } from "react";

import GameBoy from "./GameBoy";

function Camera() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const navigate = useNavigate();

  const capture = useCallback(() => {
    setImgSrc(webcamRef.current.getScreenshot());
  }, [webcamRef]);

  const retake = () => {
    if (imgSrc) {
      setImgSrc(null);
    } else {
      navigate("/");
    }
  };

  return (
    <GameBoy button1Controller={capture} button2Controller={retake}>
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
