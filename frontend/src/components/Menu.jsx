import { useState } from "react";
import { Link } from "react-router-dom";

import { RiListSettingsLine } from "react-icons/ri";
import {
  FcGallery,
  FcOldTimeCamera,
  FcSlrBackSide,
  FcContacts,
  FcOk,
} from "react-icons/fc";
import { MdScoreboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FiMap } from "react-icons/fi";
import { GiCharacter } from "react-icons/gi";

import { useAuth } from "../contexts/AuthContext";

export default function Menu() {
  const [
    menuIndex,
    //  setMuneIndex
  ] = useState(0);
  const { role } = useAuth();
  const sizeIconMenu = "4rem";
  const menu = [
    {
      titre: "Menu",
      listMenu: [
        {
          name: "Photo",
          image: <FcOldTimeCamera size={sizeIconMenu} />,
          path: "/camera",
        },
        {
          name: "Galerie",
          image: <FcSlrBackSide size={sizeIconMenu} />,
          path: "/gallery",
        },
        {
          name: "Carte",
          image: <FiMap size={sizeIconMenu} />,
          path: "/map-global",
        },
        { name: "artistes", image: <GiCharacter size={sizeIconMenu} /> },
        {
          name: "Score",
          image: <MdScoreboard size={sizeIconMenu} />,
          path: "/score",
        },
        {
          name: "Liste d'amis",
          image: <FcContacts size={sizeIconMenu} />,
          path: "/friends",
        },
        { name: "Mon Profil", image: <CgProfile size={sizeIconMenu} /> },
        {
          name: "Paramètres",
          image: <RiListSettingsLine size={sizeIconMenu} />,
          path: "/setting",
        },
      ],
    },
  ];
  if (role === 1) {
    menu.push({
      titre: "Menu Admin",
      listMenu: [
        {
          name: "Street Arts",
          image: <FcGallery size={sizeIconMenu} />,
          path: "/street-arts",
        },
        {
          name: "Validation",
          image: <FcOk size={sizeIconMenu} />,
          path: "/street-arts-pending",
        },
      ],
    });
  }

  return (
    <div className="menu">
      <header>
        {menu.map(
          (
            list
            //  index
          ) => (
            <h1
              key={list.titre}
              // onClick={() => setMuneIndex(index)}
            >
              {list.titre}
            </h1>
          )
        )}
      </header>
      <section>
        {menu[menuIndex].listMenu.map((list) => (
          <Link to={list.path}>
            {list.image}
            <figcaption>{list.name}</figcaption>
          </Link>
        ))}
      </section>
      {/* <img src={logo} alt="logo" /> */}
    </div>
  );
}
