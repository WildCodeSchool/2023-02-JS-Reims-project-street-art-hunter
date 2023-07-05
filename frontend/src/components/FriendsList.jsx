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
      <div className="friends-pending">
        <h2>Demandes en attente</h2>
        {pendingRequests.length > 0 ? (
          pendingRequests.map((friend) => (
            <figure key={friend.id}>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${friend.image}`}
                alt="friendslist"
              />
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
          <p>Aucune demande en attente</p>
        )}
      </div>

      <div className="friends-received">
        <h2>Demandes reçues</h2>
        {receivedRequests.length > 0 ? (
          receivedRequests.map((friend) => (
            <figure key={friend.id}>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${friend.image}`}
                alt="friendslist"
              />
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
          <p>Aucune demande reçue</p>
        )}
      </div>

      <div className="friends-accepted">
        <h2>Amis acceptés</h2>
        {acceptedFriends.length > 0 ? (
          acceptedFriends.map((friend) => (
            <figure key={friend.id}>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${friend.image}`}
                alt="friendslist"
              />
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
          <p>Aucun ami accepté</p>
        )}
      </div>
    </div>
  );
}
