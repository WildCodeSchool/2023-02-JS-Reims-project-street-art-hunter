import { useState } from "react";
import GameBoy from "./GameBoy";

export default function GameBoyColor() {
  const [color, setColor] = useState(localStorage.getItem("gameBoyColor"));
  return (
    <GameBoy
      button1Controller={() => {
        if (color !== null) localStorage.setItem("gameBoyColor", color);
        else localStorage.removeItem("gameBoyColor");
      }}
      buttonLabel1="Valide"
      ButtonColor1="green"
      button2Controller={() => {
        document.location.href = "/menu";
      }}
      buttonLabel2="Exit"
      gameBoyColor={color}
    >
      <div className="gameBoyColor">
        <button type="button" onClick={() => setColor(null)}>
          Delet color
        </button>
        <input
          type="color"
          name="couleur"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setColor(localStorage.getItem("gameBoyColor"))}
        >
          Riset color
        </button>
      </div>
    </GameBoy>
  );
}
