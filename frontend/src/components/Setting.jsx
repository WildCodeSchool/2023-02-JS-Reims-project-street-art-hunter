import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Setting() {
  const nav = useNavigate();
  const { setToken, setRole } = useAuth();
  return (
    <div className="setting">
      <h1>Paramètres</h1>
      <button type="button" onClick={() => nav("/menu")}>
        retoure au menu
      </button>
      <button type="button" onClick={() => nav("/menu")}>
        retoure au menu
      </button>
      <button type="button" onClick={() => nav("/menu")}>
        retoure au menu
      </button>
      <button type="button" onClick={() => nav("/menu")}>
        retoure au menu
      </button>
      <button
        type="button"
        onClick={() => {
          sessionStorage.removeItem("token");
          setToken(null);
          sessionStorage.removeItem("role");
          setRole(null);
          nav("/");
        }}
      >
        Deconnexion
      </button>
      <button type="button" className="retoure" onClick={() => nav("/menu")}>
        retoure au menu
      </button>
    </div>
  );
}
