import Webcam from "react-webcam";
import { useRef, useState, useCallback } from "react";

import GameBoy from "./GameBoy";

function Camera() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    setImgSrc(webcamRef.current.getScreenshot());
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  return (
    <GameBoy>
      <div className="container">
        {imgSrc ? (
          <>
            <div className="img-container">
              <img src={imgSrc} alt="webcam" />
            </div>
            <div className="btn-container">
              <button type="button" onClick={retake}>
                Reprendre la photo
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="video-container">
              <Webcam
                height={600}
                width={600}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
              />
            </div>
            <div className="btn-container">
              <button type="button" onClick={capture}>
                Capture photo
              </button>
            </div>
          </>
        )}
      </div>
    </GameBoy>
  );
}

export default Camera;
