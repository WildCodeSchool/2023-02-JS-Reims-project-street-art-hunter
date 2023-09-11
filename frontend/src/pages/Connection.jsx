import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

import logo from "../assets/logo.png";
import { useAuth } from "../contexts/AuthContext";

function Connection() {
  const [isLogin, setIsLogin] = useState(true);
  const { gameBoyColor } = useAuth();

  return (
    <div className="connection">
      <img src={logo} alt="Logo" />
      <div
        className="form-connection"
        style={
          Number.isNaN(gameBoyColor)
            ? { backgroundColor: `hsl(93, 5%, 50%)` }
            : { backgroundColor: `hsl(${gameBoyColor}, 50%, 50%)` }
        }
      >
        <div className="change-menu">
          <button
            className={isLogin ? "selected-button" : "default-button"}
            type="button"
            onClick={() => setIsLogin(true)}
            style={
              Number.isNaN(gameBoyColor)
                ? { backgroundColor: `hsl(93, 5%, 70%)` }
                : { backgroundColor: `hsl(${gameBoyColor}, 20%, 50%)` }
            }
          >
            Connexion
          </button>
          <button
            className={!isLogin ? "selected-button" : "default-button"}
            type="button"
            onClick={() => setIsLogin(false)}
            style={
              Number.isNaN(gameBoyColor)
                ? { backgroundColor: `hsl(93, 5%, 70%)` }
                : { backgroundColor: `hsl(${gameBoyColor}, 20%, 50%)` }
            }
          >
            Enregistrement
          </button>
        </div>
        <div className="form-content">
          {isLogin ? <Login /> : <Register setIsLogin={setIsLogin} />}
        </div>
      </div>
    </div>
  );
}

export default Connection;
