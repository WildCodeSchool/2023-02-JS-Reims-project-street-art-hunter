import { useState } from "react";

import GameBoy from "./GameBoy";

export default function Menu() {
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
        name: "Galery",
        image: "src/assets/galery.png",
        path: "/",
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
    document.location.href = menu[numberY][numberX].path;
  };
  return (
    <GameBoy
      upController={upController}
      downController={downController}
      leftController={leftController}
      rightController={rightController}
      button1Controller={button1Controller}
    >
      <div className="menu">
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
      </div>
    </GameBoy>
  );
}
