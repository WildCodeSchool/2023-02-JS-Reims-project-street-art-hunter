import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GameBoy from "./GameBoy";

export default function GameBoyColor() {
  const navigate = useNavigate();
  const [color, setColor] = useState(localStorage.getItem("gameBoyColor"));
  return (
    <GameBoy
      button1Controller={() => localStorage.setItem("gameBoyColor", color)}
      buttonLabel1="Valide"
      ButtonColor1="green"
      button2Controller={() => navigate("/menu")}
      buttonLabel2="Exit"
      gameBoyColor={color}
    >
      <div className="gameBoyColor">
        <button type="button">R</button>
        <input
          type="color"
          name="couleur"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <button type="button">R</button>
      </div>
    </GameBoy>
  );
}
