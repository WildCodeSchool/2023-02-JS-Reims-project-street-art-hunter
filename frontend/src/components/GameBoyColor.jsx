import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import GameBoy from "./GameBoy";

export default function GameBoyColor() {
  const navigate = useNavigate();
  const { gameBoyColor, setGameBoyColor } = useAuth();
  const [color, setColor] = useState(gameBoyColor);
  return (
    <GameBoy
      button1Controller={() => {
        if (Number.isNaN(color)) {
          localStorage.removeItem("gameBoyColor");
          setGameBoyColor(color);
        } else {
          localStorage.setItem("gameBoyColor", color);
          setGameBoyColor(color);
        }
      }}
      buttonLabel1="Valide"
      ButtonColor1="green"
      button2Controller={() => {
        navigate("/menu");
      }}
      buttonLabel2="Exit"
      buttonLabelup="Delete color"
      upController={() => setColor(NaN)}
      buttonLabeldown="Reset sov color"
      downController={() =>
        setColor(parseInt(localStorage.getItem("gameBoyColor"), 10))
      }
      leftController={() => {
        if (Number.isNaN(color)) {
          setColor(0);
        } else {
          setColor(color - 10);
        }
      }}
      rightController={() => {
        if (Number.isNaN(color)) {
          setColor(0);
        } else {
          setColor(color + 10);
        }
      }}
    >
      <div
        className="gameBoyColor"
        style={
          Number.isNaN(color)
            ? { backgroundColor: `hsl(93, 10%, 82%)` }
            : { backgroundColor: `hsl(${color}, 50%, 50%)` }
        }
      />
    </GameBoy>
  );
}
