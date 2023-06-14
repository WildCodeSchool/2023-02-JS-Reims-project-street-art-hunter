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
        onClick={() => navigate("/connection")}
      >
        Start
      </button>
    </div>
  );
}
