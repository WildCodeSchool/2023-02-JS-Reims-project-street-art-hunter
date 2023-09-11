import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Score() {
  const nav = useNavigate();
  const [scores, setScores] = useState([]);
  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL ?? `http://localhost:5000`
      }/users/scores`
    )
      .then((res) => res.json())
      .then((data) => {
        setScores(data);
      });
  }, []);
  return (
    <div className="score">
      <h1>Classement</h1>
      <table>
        <thead>
          <tr>
            <th>Rang</th>
            <th>Joueur</th>
            <th>Point</th>
          </tr>
        </thead>

        <tbody>
          {scores.map((score, index) => (
            <tr key={score.id_user}>
              <td>{index + 1}</td>
              <td>{score.username}</td>
              <td>{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" className="retoure" onClick={() => nav("/menu")}>
        retoure au menu
      </button>
    </div>
  );
}
