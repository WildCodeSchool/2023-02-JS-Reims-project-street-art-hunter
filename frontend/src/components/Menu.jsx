import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbMessages } from "react-icons/tb";

import {
  BiChevronsDown,
  BiChevronsUp,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";
import { FcGallery, FcOldTimeCamera, FcSlrBackSide } from "react-icons/fc";
import { GrScorecard } from "react-icons/gr";
import { IoColorFilterSharp } from "react-icons/io5";
import { FiLogOut, FiMap } from "react-icons/fi";
import GameBoy from "./GameBoy";
import { useAuth } from "../contexts/AuthContext";

export default function Menu() {
  const { setToken, role } = useAuth();
  const navigate = useNavigate();
  const [numberY, setNumberY] = useState(1);
  const [numberX, setNumberX] = useState(1);
  const { gameBoyColor } = useAuth();
  const menu = [
    [
      {
        name: "Setting",
      },
      {
        name: "Color",
        image: (
          <IoColorFilterSharp
            size="5rem"
            style={
              Number.isNaN(gameBoyColor)
                ? { color: `black` }
                : { color: `hsl(${gameBoyColor}, 100%, 50%)` }
            }
          />
        ),
        path: "/gameboycolor",
      },
      {
        name: "Logout",
        image: <FiLogOut size="5rem" />,
        path: "/",
      },
    ],
    [
      {
        name: "inventory",
      },
      {
        name: "Photo",
        image: <FcOldTimeCamera size="5rem" />,
        path: "/camera",
      },
      {
        name: "Gallery",
        image: <FcSlrBackSide size="5rem" />,
        path: "/gallery",
      },
      {
        name: "Ta carte",
        image: <FiMap size="5rem" />,
        path: "/map-global",
      },
      {
        name: "Score",
        image: <GrScorecard size="5rem" />,
        path: "/score",
      },
      {
        name: "Liste d'amis",
        path: "/friends",
      },
      {
        name: "message",
        image: <TbMessages size="5rem" />,
        path: "/message",
      },
    ],
  ];
  if (role) {
    menu.push([
      {
        name: "inventory admin",
      },
      {
        name: "Street Arts",
        image: <FcGallery size="5rem" />,
        path: "/street-arts",
      },
    ]);
  }
  const upController = () => {
    if (numberY > 0) {
      setNumberY(numberY - 1);
      setNumberX(1);
    }
  };
  const downController = () => {
    if (numberY < menu.length - 1) {
      setNumberY(numberY + 1);
      setNumberX(1);
    }
  };
  const leftController = () => {
    if (numberX > 1) setNumberX(numberX - 1);
  };
  const rightController = () => {
    if (numberX < menu[numberY].length - 1) setNumberX(numberX + 1);
  };
  const button1Controller = () => {
    if (menu[numberY][numberX].name === "Logout") {
      setToken(null);
      sessionStorage.removeItem("token");
    }
    navigate(menu[numberY][numberX].path);
  };
  return (
    <GameBoy
      upController={upController}
      downController={downController}
      leftController={leftController}
      rightController={rightController}
      button1Controller={button1Controller}
      button2Controller={() => {
        document.exitFullscreen();
        navigate("/");
      }}
      buttonLabel1="Entrer"
      buttonLabel2="Exit"
      ButtonColor1={numberY === 0 ? "blue" : "yellow"}
      ButtonColor2={numberY === 0 ? "blue" : "yellow"}
    >
      <div
        className={`menu ${numberY === 0 ? "menu-Setting" : "menu-inventory"}`}
      >
        {numberY > 0 && (
          <p className="upDirection">
            <BiChevronsUp onClick={upController} />
          </p>
        )}
        <div className="cadre">
          <h2>{menu[numberY][0].name}</h2>
          <figure>
            {typeof menu[numberY][numberX].image === "string" ? (
              <img
                src={menu[numberY][numberX].image}
                alt={menu[numberY][numberX].name}
                name="image"
              />
            ) : (
              menu[numberY][numberX].image
            )}
            <figcaption>
              <h1>{menu[numberY][numberX].name}</h1>
            </figcaption>
          </figure>
        </div>
        {numberX > 1 && (
          <p className="leftDirection">
            <BiChevronsLeft onClick={leftController} />
          </p>
        )}
        {numberX < menu[numberY].length - 1 && (
          <p className="rightDirection">
            <BiChevronsRight onClick={rightController} />
          </p>
        )}
        {numberY < menu.length - 1 && (
          <p className="downDirection">
            <BiChevronsDown onClick={downController} />
          </p>
        )}
      </div>
    </GameBoy>
  );
}
