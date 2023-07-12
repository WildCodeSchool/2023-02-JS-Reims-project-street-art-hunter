import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RequestsPendingFriends() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"}/friends`
    )
      .then((response) => response.json())
      .then(() => {
        setFriends([
          {
            id: 1,
            name: "Fred",
            status: "pending",
          },
          { id: 2, name: "Bob", status: "received" },
          {
            id: 3,
            name: "Jean-Eude",
            status: "pending",
          },
          {
            id: 4,
            name: "Maurice",
            status: "pending",
          },
          {
            id: 5,
            name: "Gilbert",
            stauts: "received",
          },
        ]);
      });
  }, []);

  const pendingRequests = friends.filter(
    (friend) => friend.status === "pending"
  );
  const receivedRequests = friends.filter(
    (friend) => friend.status === "received"
  );

  return (
    <>
      <section className="container-request">
        <h2 className="title-pending"> Demandes en attente</h2>
        {pendingRequests.length > 0 ? (
          pendingRequests.map((friend) => (
            <figure key={friend.id}>
              <figcaption>
                <p>{friend.name}</p>
                <Link to={`/friends/${friend.id}`}>Voir profil</Link>
              </figcaption>
            </figure>
          ))
        ) : (
          <p className="no-add"> Aucune demande en attente</p>
        )}
      </section>

      <section className="friends">
        <h2 className="title-received"> Demandes reçues </h2>
        {receivedRequests.length > 0 ? (
          receivedRequests.map((friend) => (
            <figure key={friend.id}>
              <figcaption>
                <p>{friend.name}</p>
                <Link to={`/friends/${friend.id}`}>Voir profil</Link>
                Voir profil
              </figcaption>
            </figure>
          ))
        ) : (
          <p className="no-add"> Aucune demande reçue</p>
        )}
      </section>
    </>
  );
}
