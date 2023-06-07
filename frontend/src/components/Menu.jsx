import { useState } from "react";
import { useNavigate } from "react-router-dom";

import GameBoy from "./GameBoy";

export default function Menu() {
  const navigate = useNavigate();
  const [numberY, setNumberY] = useState(1);
  const [numberX, setNumberX] = useState(1);
  const menu = [
    [
      {
        name: "Setting",
      },
      {
        name: "Game Boy Color",
        image: "src/assets/color.png",
        path: "/gameboycolor",
      },
      {
        name: "Logout",
        image: "src/assets/logout.png",
        path: "/",
      },
    ],
    [
      {
        name: "inventory",
      },
      {
        name: "Photo",
        image: "src/assets/photo.png",
        path: "/camera",
      },
      {
        name: "Gallery",
        image: "src/assets/gallery.png",
        path: "/gallery",
      },
      {
        name: "Score",
        image: "src/assets/score.png",
        path: "/score",
      },
    ],
  ];
  const upController = () => {
    if (numberY > 0) {
      setNumberY(numberY - 1);
      setNumberX(1);
    }
  };
  const downController = () => {
    if (numberY < menu.length - 1) setNumberY(numberY + 1);
  };
  const leftController = () => {
    if (numberX > 1) setNumberX(numberX - 1);
  };
  const rightController = () => {
    if (numberX < menu[numberY].length - 1) setNumberX(numberX + 1);
  };
  const button1Controller = () => {
    navigate(menu[numberY][numberX].path);
  };
  return (
    <GameBoy
      upController={upController}
      downController={downController}
      leftController={leftController}
      rightController={rightController}
      button1Controller={button1Controller}
      button2Controller={() => navigate("/")}
      buttonLabel1="Entrer"
      buttonLabel2="Exit"
      ButtonColor1={numberY === 1 ? "yellow" : "blue"}
      ButtonColor2={numberY === 1 ? "yellow" : "blue"}
    >
      <div
        className={`menu ${numberY === 1 ? "menu-inventory" : "menu-Setting"}`}
      >
        {numberY > 0 && <p className="upDirection">▲</p>}
        <h2>{menu[numberY][0].name}</h2>
        <figure>
          <img
            src={menu[numberY][numberX].image}
            alt={menu[numberY][numberX].name}
            name="image"
          />
          <figcaption>
            <h1>{menu[numberY][numberX].name}</h1>
          </figcaption>
        </figure>
        {numberX > 1 && <p className="leftDirection">◀</p>}
        {numberX < menu[numberY].length - 1 && (
          <p className="rightDirection">▶</p>
        )}
        {numberY < menu.length - 1 && <p className="downDirection">▼</p>}
      </div>
    </GameBoy>
  );
}
