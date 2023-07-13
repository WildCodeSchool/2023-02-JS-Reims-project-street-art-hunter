import { useState } from "react";
import FriendsList from "./FriendsList";
import { Resu, Attente } from "./RequestsPendingFriends";

export default function friends() {
  const [select, setSelect] = useState("Friends");
  return (
    <div className="container-list">
      <div className="buttonlist">
        <button type="button" onClick={() => setSelect("Friends")}>
          ami
        </button>
        <button type="button" onClick={() => setSelect("Resu")}>
          Demande
        </button>
        <button type="button" onClick={() => setSelect("Attente")}>
          En attente
        </button>
      </div>
      {select === "Friends" && <FriendsList />}
      {select === "Resu" && <Resu />}
      {select === "Attente" && <Attente />}
    </div>
  );
}
