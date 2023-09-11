import { useState } from "react";
import { BiUserPlus, BiSend } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import FriendsList from "./FriendsList";
import { Resu, Attente } from "./RequestsPendingFriends";
import { useAuth } from "../contexts/AuthContext";

export default function friends() {
  const nav = useNavigate();
  const { token } = useAuth();
  const [select, setSelect] = useState("Friends");
  const [addFriends, setAddFriends] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <div className="container-list">
      <div className="buttonlist">
        <button type="button" onClick={() => setSelect("Friends")}>
          Amis
        </button>
        <button type="button" onClick={() => setSelect("Resu")}>
          Demande
        </button>
        <button type="button" onClick={() => setSelect("Attente")}>
          En attente
        </button>
      </div>
      <div className="alllist">
        {select === "Friends" && <FriendsList />}
        {select === "Resu" && <Resu />}
        {select === "Attente" && <Attente />}
      </div>
      <form
        className="divAddFriends"
        onSubmit={(event) => {
          event.preventDefault();
          fetch(
            `${
              import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
            }/friends`,
            {
              method: "post",
              headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "application/json",
              },
              body: JSON.stringify({
                username,
              }),
            }
          ).then((response) => {
            if (response.ok) {
              setAddFriends(false);
            }
          });
        }}
      >
        <BiUserPlus
          style={!addFriends && { gridColumnStart: -1 }}
          className="addFriends"
          onClick={() => setAddFriends(!addFriends)}
        />
        {addFriends ? (
          <>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="nom de l'ami"
            />
            <button type="submit">
              <BiSend size="2rem" />
            </button>
          </>
        ) : (
          <button
            type="button"
            className="retoure"
            onClick={() => nav("/menu")}
          >
            retoure au menu
          </button>
        )}
      </form>
    </div>
  );
}
