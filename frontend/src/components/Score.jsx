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
    <table>
      <thead>
        <tr>
          <th colSpan="3">Scores</th>
        </tr>
        <tr>
          <th>Rang</th>
          <th>Player</th>
          <th>Point</th>
        </tr>
      </thead>
      <tbody>
        {scores.map((score, index) => (
          <tr key={score.id}>
            <td>{index + 1}</td>
            <td>{score.pseudo}</td>
            <td>{score.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
