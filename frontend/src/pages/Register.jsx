import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../contexts/AuthContext";

function Register({ setIsLogin }) {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const mailRef = useRef();

  const [isError, setIsError] = useState(false);
  const { gameBoyColor } = useAuth();

  return (
    <form
      className="form-register"
      onSubmit={(event) => {
        event.preventDefault();

        fetch(
          `${
            import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
          }/users`,
          {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              username: usernameRef.current.value,
              password: passwordRef.current.value,
              mail: mailRef.current.value,
            }),
          }
        ).then((response) => {
          if (response.status === 201) {
            setIsLogin(true);
          } else {
            setIsError(true);
          }
        });
      }}
    >
      <div className="form-line">
        <label htmlFor="username">Nom d'utilisateur</label>
        <input ref={usernameRef} type="text" id="username" name="username" />
      </div>
      <div className="form-line">
        <label htmlFor="password">Mot de passe</label>
        <input
          ref={passwordRef}
          type="password"
          id="password"
          name="password"
        />
      </div>
      <div className="form-line">
        <label htmlFor="mail">E-mail</label>
        <input ref={mailRef} type="text" id="mail" name="mail" />
      </div>
      {isError && <p className="error-message">Erreur enregistrement</p>}
      <button
        type="submit"
        className="submit-register"
        style={
          Number.isNaN(gameBoyColor)
            ? { backgroundColor: `hsl(93, 5%, 70%)` }
            : { backgroundColor: `hsl(${gameBoyColor}, 20%, 50%)` }
        }
      >
        S'enregistrer
      </button>
    </form>
  );
}

Register.propTypes = {
  setIsLogin: PropTypes.func.isRequired,
};

export default Register;
