import { useState } from "react";
import FriendsList from "./FriendsList";
import { Resu, Attente } from "./RequestsPendingFriends";
import { useAuth } from "../contexts/AuthContext";

export default function friends() {
  const [select, setSelect] = useState("Friends");
  const { gameBoyColor } = useAuth();

  return (
    <div className="container-list">
      <div className="buttonlist">
        <button
          type="button"
          style={
            Number.isNaN(gameBoyColor)
              ? { backgroundColor: `gray`, color: "#FFF" }
              : { backgroundColor: `hsl(${gameBoyColor}, 50%, 50%)` }
          }
          onClick={() => setSelect("Friends")}
        >
          ami
        </button>
        <button
          type="button"
          style={
            Number.isNaN(gameBoyColor)
              ? { backgroundColor: `gray`, color: "#FFF" }
              : { backgroundColor: `hsl(${gameBoyColor}, 50%, 50%)` }
          }
          onClick={() => setSelect("Resu")}
        >
          Demande
        </button>
        <button
          type="button"
          style={
            Number.isNaN(gameBoyColor)
              ? { backgroundColor: `gray`, color: "#FFF" }
              : { backgroundColor: `hsl(${gameBoyColor}, 50%, 50%)` }
          }
          onClick={() => setSelect("Attente")}
        >
          En attente
        </button>
      </div>
      {select === "Friends" && <FriendsList />}
      {select === "Resu" && <Resu />}
      {select === "Attente" && <Attente />}
    </div>
  );
}
