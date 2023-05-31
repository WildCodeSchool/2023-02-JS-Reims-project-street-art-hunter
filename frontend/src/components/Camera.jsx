import Webcam from "react-webcam";
import { useRef, useState, useCallback } from "react";

function Camera() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [lat, setLat] = useState();
  const [long, setLong] = useState();

  navigator.geolocation.getCurrentPosition((position) => {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
  });

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  return (
    <div className="container">
      {imgSrc ? (
        <>
          <img src={imgSrc} alt="webcam" />
          <h1>Latitude is : {lat}</h1>
          <h1>Longitude is : {long}</h1>
          <div className="btn-container">
            <button type="button" onClick={retake}>
              Reprendre la photo
            </button>
          </div>
        </>
      ) : (
        <>
          <Webcam height={600} width={600} ref={webcamRef} />
          <div className="btn-container">
            <button type="button" onClick={capture}>
              Capture photo
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Camera;
