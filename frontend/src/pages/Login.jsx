import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  return (
    <form
      className="form-login"
      onSubmit={(event) => {
        event.preventDefault();
        fetch(
          `${
            import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
          }/login`,
          {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              username: usernameRef.current.value,
              password: passwordRef.current.value,
            }),
          }
        )
          .then((response) => {
            response.json();
          })
          .then(() => {
            navigate("/menu");
          });
      }}
    >
      {" "}
      <div className="form-line">
        {" "}
        <label htmlFor="username">Username</label>{" "}
        <input ref={usernameRef} type="text" id="username" name="username" />{" "}
      </div>{" "}
      <div className="form-line">
        {" "}
        <label htmlFor="password">Password</label>{" "}
        <input
          ref={passwordRef}
          type="password"
          id="password"
          name="password"
        />{" "}
      </div>{" "}
      <button type="submit" className="submit-login">
        Play
      </button>{" "}
    </form>
  );
}
export default Login;
