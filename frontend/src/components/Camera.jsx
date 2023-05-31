import { useGeolocated } from "react-geolocated";
import Webcam from "react-webcam";
import { useRef, useState, useCallback } from "react";

function Camera() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  const capture = useCallback(() => {
    setImgSrc(webcamRef.current.getScreenshot());
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  return (
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
      {isGeolocationAvailable && isGeolocationEnabled && coords && imgSrc && (
        <>
          <h1>Latitude : {coords.latitude}</h1>
          <h1>Longitude : {coords.longitude}</h1>
        </>
      )}
    </div>
  );
}

export default Camera;
