import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestsPendingFriends from "./RequestsPendingFriends";

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

  const acceptedFriends = friendsList.filter(
    (friend) => friend.status === "accepted"
  );

  return (
    <div className="container-list">
      <RequestsPendingFriends />
      <h1 className="title-list"> Liste d'Amis</h1>

      <section className="friends">
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
      </section>
    </div>
  );
}
