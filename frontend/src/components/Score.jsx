import { useEffect, useState } from "react";

export default function Score() {
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
    <>
      <h1>MEILLEURS SCORES</h1>
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
    </>
  );
}
