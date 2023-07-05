import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FriendsList() {
  const [friendsList, setFriendsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"}/friends`
    )
      .then((response) => response.json())
      .then((data) => {
        setFriendsList(data);
      });
  }, []);

  const pendingRequests = friendsList.filter(
    (friend) => friend.status === "pending"
  );

  const receivedRequests = friendsList.filter(
    (friend) => friend.status === "received"
  );

  const acceptedFriends = friendsList.filter(
    (friend) => friend.status === "accepted"
  );

  return (
    <div className="friendslist">
      <div className="friends">
        <h1 className="list"> Liste d'amis </h1>
        <h2 className="title-friends"> Demandes en attente</h2>
        {pendingRequests.length > 0 ? (
          pendingRequests.map((friend) => (
            <figure key={friend.id}>
              <figcaption>
                <p>{friend.name}</p>
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/users/:id/friends_request${friend.id}`)
                  }
                >
                  Voir profil
                </button>
              </figcaption>
            </figure>
          ))
        ) : (
          <p className="no-add"> Aucune demande en attente </p>
        )}
      </div>

      <div className="friends">
        <h2 className="title-friends"> Demandes reçues </h2>
        {receivedRequests.length > 0 ? (
          receivedRequests.map((friend) => (
            <figure key={friend.id}>
              <figcaption>
                <p>{friend.name}</p>
                <button
                  type="button"
                  onClick={() => navigate(`/friends/${friend.id}`)}
                >
                  Voir profil
                </button>
              </figcaption>
            </figure>
          ))
        ) : (
          <p className="no-add"> Aucune demande reçue</p>
        )}
      </div>

      <div className="friends">
        <h2 className="title-friends">Amis acceptés</h2>
        {acceptedFriends.length > 0 ? (
          acceptedFriends.map((friend) => (
            <figure key={friend.id}>
              <figcaption>
                <p>{friend.name}</p>
                <button
                  type="button"
                  onClick={() => navigate(`/friends/${friend.id}`)}
                >
                  Voir profil
                </button>
              </figcaption>
            </figure>
          ))
        ) : (
          <p className="no-add"> Aucun ami accepté</p>
        )}
      </div>
    </div>
  );
}
