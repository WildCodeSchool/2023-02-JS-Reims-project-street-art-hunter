import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BiChevronsDown,
  BiChevronsUp,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";
import {
  FcGallery,
  FcOldTimeCamera,
  FcSlrBackSide,
  FcContacts,
  FcLock,
} from "react-icons/fc";
import { GrScorecard } from "react-icons/gr";
import { IoColorFilterSharp } from "react-icons/io5";
import { FiLogOut, FiMap } from "react-icons/fi";
import GameBoy from "./GameBoy";
import { useAuth } from "../contexts/AuthContext";

export default function Menu() {
  const { setToken, role, setRole } = useAuth();
  const navigate = useNavigate();
  const [numberY, setNumberY] = useState(1);
  const [numberX, setNumberX] = useState(1);
  const { gameBoyColor } = useAuth();
  const sizeIconMenu = "60%";
  const sizeNavMenu = "2rem";
  const menu = [
    [
      {
        name: "Parametres",
      },
      {
        name: "Couleur",
        image: (
          <IoColorFilterSharp
            size={sizeIconMenu}
            style={
              Number.isNaN(gameBoyColor)
                ? { color: `black` }
                : { color: `hsl(${gameBoyColor}, 50%, 50%)` }
            }
          />
        ),
        path: "/gameboycolor",
      },
      {
        name: "Deconnexion",
        image: <FiLogOut size={sizeIconMenu} />,
        path: "/",
      },
    ],
    [
      {
        name: "Inventaire",
      },
      {
        name: "Photo",
        image: <FcOldTimeCamera size={sizeIconMenu} />,
        path: "/camera",
      },
      {
        name: "Ma Galerie",
        image: <FcSlrBackSide size={sizeIconMenu} />,
        path: "/gallery",
      },
      {
        name: "Ma carte",
        image: <FiMap size={sizeIconMenu} />,
        path: "/map-global",
      },
      {
        name: "Score",
        image: <GrScorecard size={sizeIconMenu} />,
        path: "/score",
      },
      {
        name: "Liste d'amis",
        image: <FcContacts size={sizeIconMenu} />,
        path: "/friends",
      },
    ],
  ];
  if (role === 1) {
    menu.push([
      {
        name: "Inventaire Admin",
        icon: <FcLock />,
      },
      {
        name: "Street Arts",
        image: <FcGallery size={sizeIconMenu} />,
        path: "/street-arts",
      },
      {
        name: "Validation",
        image: <FcGallery size={sizeIconMenu} />,
        path: "/street-arts-pending",
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
    if (menu[numberY][numberX].name === "Deconnexion") {
      setToken(null);
      setRole(null);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
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
      buttonLabel2="Sortir"
      ButtonColor1={numberY === 0 ? "blue" : "yellow"}
      ButtonColor2={numberY === 0 ? "blue" : "yellow"}
    >
      <div
        className={`menu ${numberY === 0 ? "menu-Setting" : "menu-inventory"}`}
      >
        {numberY > 0 && (
          <p className="upDirection">
            <BiChevronsUp size={sizeNavMenu} onClick={upController} />
          </p>
        )}
        <div className="cadre">
          <h2>
            {menu[numberY][0].name} {menu[numberY][0].icon}
          </h2>
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
            <BiChevronsLeft size={sizeNavMenu} onClick={leftController} />
          </p>
        )}
        {numberX < menu[numberY].length - 1 && (
          <p className="rightDirection">
            <BiChevronsRight size={sizeNavMenu} onClick={rightController} />
          </p>
        )}
        {numberY < menu.length - 1 && (
          <p className="downDirection">
            <BiChevronsDown size={sizeNavMenu} onClick={downController} />
          </p>
        )}
      </div>
    </GameBoy>
  );
}
