import { useState } from "react";
import { BiUserPlus, BiSend } from "react-icons/bi";
import FriendsList from "./FriendsList";
import { Resu, Attente } from "./RequestsPendingFriends";
import { useAuth } from "../contexts/AuthContext";

export default function friends() {
  const { token } = useAuth();
  const [select, setSelect] = useState("Friends");
  const [addFriends, setAddFriends] = useState(false);
  const [username, setUsername] = useState("");
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
          Amis
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
          style={
            Number.isNaN(gameBoyColor)
              ? { backgroundColor: `gray`, color: "#FFF" }
              : { backgroundColor: `hsl(${gameBoyColor}, 50%, 50%)` }
          }
          className="addFriends"
          onClick={() => setAddFriends(!addFriends)}
        />
        {addFriends && (
          <>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="nom de l'ami"
              style={
                Number.isNaN(gameBoyColor)
                  ? { borderColor: `gray` }
                  : {
                      borderColor: `hsl(${gameBoyColor}, 50%, 50%)`,
                    }
              }
            />
            <button
              type="submit"
              style={
                Number.isNaN(gameBoyColor)
                  ? { color: `gray` }
                  : {
                      color: `hsl(${gameBoyColor}, 50%, 50%)`,
                    }
              }
            >
              <BiSend size="3rem" />
            </button>
          </>
        )}
      </form>
    </div>
  );
}
