import Webcam from "react-webcam";
import { useRef } from "react";

function Camera() {
  const webcamRef = useRef(null);
  return <Webcam height={600} width={600} ref={webcamRef} />;
}

export default Camera;
