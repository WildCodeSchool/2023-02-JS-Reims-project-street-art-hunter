import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import logo from "../assets/logo.png";

export default function Home() {
  const navigate = useNavigate();
  const { token } = useAuth();
  return (
    <div className="home">
      <img src={logo} alt="" />
      <button
        type="button"
        className="return"
        onClick={() => {
          if (token) {
            navigate("/menu");
          } else {
            navigate("/connection");
          }
        }}
      >
        Start
      </button>
    </div>
  );
}
