import { useRef, useState } from "react";
import PropTypes from "prop-types";

function Register({ setIsLogin }) {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const mailRef = useRef();

  const [isError, setIsError] = useState(false);

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
        <label htmlFor="username">Username</label>
        <input ref={usernameRef} type="text" id="username" name="username" />
      </div>
      <div className="form-line">
        <label htmlFor="password">Password</label>
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
      <button type="submit" className="submit-register">
        S'enregistrer
      </button>
    </form>
  );
}

Register.propTypes = {
  setIsLogin: PropTypes.func.isRequired,
};

export default Register;
