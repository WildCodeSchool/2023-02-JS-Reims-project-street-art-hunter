import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

import logo from "../assets/logo.png";

function Connection() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="connection">
      <img src={logo} alt="logo" />
      <div className="form-connection">
        <div className="change-menu">
          <button
            className={isLogin ? "selected-button" : "default-button"}
            type="button"
            onClick={() => setIsLogin(true)}
          >
            Connexion
          </button>
          <button
            className={!isLogin ? "selected-button" : "default-button"}
            type="button"
            onClick={() => setIsLogin(false)}
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
