import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <img src={logo} alt="logo" />
      <button type="button" onClick={() => navigate("/connection")}>
        Connection
      </button>
      <button type="button">Inscription</button>
    </div>
  );
}
