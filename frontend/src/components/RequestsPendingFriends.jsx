import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function Resu() {
  const { token, gameBoyColor } = useAuth();
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
      }/users/friends_request`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        setFriends(res);
      });
  }, []);

  return (
    <div>
      <h1
        className="title-list"
        style={
          Number.isNaN(gameBoyColor)
            ? { color: `hsl(93, 10%, 82%)` }
            : { color: `hsl(${gameBoyColor}, 50%, 50%)` }
        }
      >
        {" "}
        Demandes reçues{" "}
      </h1>
      <section
        className="friends"
        style={
          Number.isNaN(gameBoyColor)
            ? { backgroundColor: `hsl(93, 10%, 82%)` }
            : { backgroundColor: `hsl(${gameBoyColor}, 50%, 50%)` }
        }
      >
        {friends.length > 0 ? (
          friends.map((friend) => (
            <figure key={friend.id}>
              <figcaption>
                <p>{friend.username}</p>
              </figcaption>
            </figure>
          ))
        ) : (
          <p className="no-add"> Aucune demande reçue</p>
        )}
      </section>
    </div>
  );
}
function Attente() {
  const { token, gameBoyColor } = useAuth();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
      }/users/friends_pending`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        setFriends(res);
      });
  }, []);
  return (
    <div>
      <h1
        className="title-list"
        style={
          Number.isNaN(gameBoyColor)
            ? { color: `hsl(93, 10%, 82%)` }
            : { color: `hsl(${gameBoyColor}, 50%, 50%)` }
        }
      >
        {" "}
        Demandes en attente
      </h1>
      <section
        className="friends"
        style={
          Number.isNaN(gameBoyColor)
            ? { backgroundColor: `hsl(93, 10%, 82%)` }
            : { backgroundColor: `hsl(${gameBoyColor}, 50%, 50%)` }
        }
      >
        {friends.length > 0 ? (
          friends.map((friend) => (
            <figure key={friend.id}>
              <figcaption>
                <p>{friend.username}</p>
              </figcaption>
            </figure>
          ))
        ) : (
          <p className="no-add"> Aucune demande en attente</p>
        )}
      </section>
    </div>
  );
}

export { Resu, Attente };
