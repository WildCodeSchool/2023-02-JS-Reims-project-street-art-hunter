import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="home">
      <img src={logo} alt="" />
      <button
        type="button"
        className="return"
        onClick={() => {
          document.documentElement.requestFullscreen();
          navigate("/menu");
        }}
      >
        Start
      </button>
    </div>
  );
}
