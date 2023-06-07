import { useRef } from "react";

function Register() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const mailRef = useRef();

  return (
    <form
      className="form-register"
      onSubmit={(event) => {
        event.preventDefault();

        fetch(
          `${
            import.meta.env.VITE_BACKEND_URL ?? "http://localhost:6000"
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
        );
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
      <button type="submit" className="submit-register">
        Go
      </button>
    </form>
  );
}

export default Register;
