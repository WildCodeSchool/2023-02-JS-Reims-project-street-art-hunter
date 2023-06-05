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
        image: "src/assets/setting.png",
        path: "/",
      },
      {
        name: "Logout",
        image: "src/assets/logout.png",
        path: "/",
      },
    ],
    [
      {
        name: "Game",
        image: "src/assets/game.png",
        path: "/",
      },
      {
        name: "Photo",
        image: "src/assets/photo.png",
        path: "/camera",
      },
      {
        name: "Gallery",
        image: "src/assets/gallery.png",
        path: "/",
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
      buttonLabel1="Entrer"
    >
      <div className="menu">
        {numberY > 0 && <p className="upDirection">▲</p>}
        <div className="category">
          <h1>
            {menu[numberY][0].name}
            <img src={menu[numberY][0].image} alt={menu[numberY][0].name} />
          </h1>
        </div>
        <img
          src={menu[numberY][numberX].image}
          alt={menu[numberY][numberX].name}
        />
        <p>{menu[numberY][numberX].name}</p>
        {numberX > 1 && <p className="leftDirection">◀</p>}
        {numberX < menu[numberY].length - 1 && (
          <p className="rightDirection">▶</p>
        )}
        {numberY < menu.length - 1 && <p className="downDirection">▼</p>}
      </div>
    </GameBoy>
  );
}
