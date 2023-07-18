import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import GameBoy from "./GameBoy";

import logo from "../assets/logo.png";

export default function Home() {
  const navigate = useNavigate();
  const { token } = useAuth();

  return (
    <GameBoy
      button1Controller={() => {
        if (token) {
          // document.documentElement.webkitRequestFullscreen();
          navigate("/menu");
        } else {
          // document.documentElement.webkitRequestFullscreen();
          navigate("/connection");
        }
      }}
      buttonLabel1="Entrer"
    >
      <div className="home">
        <img src={logo} alt="logo" />
      </div>
    </GameBoy>
  );
}
