import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

import logo from "../assets/logo.png";

function Connection() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="connection">
      <img src={logo} alt="" />
      <div className="form-connection">
        <div className="change-menu">
          <button
            className={isLogin ? "selected-button" : "default-button"}
            type="button"
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? "selected-button" : "default-button"}
            type="button"
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>
        <div className="form-content">{isLogin ? <Login /> : <Register />}</div>
      </div>
    </div>
  );
}

export default Connection;
