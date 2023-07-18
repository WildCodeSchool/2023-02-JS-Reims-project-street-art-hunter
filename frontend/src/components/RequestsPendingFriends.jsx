import { useEffect, useState } from "react";
import { FcOk, FcCancel } from "react-icons/fc";
import { useAuth } from "../contexts/AuthContext";

function Resu() {
  const { token, gameBoyColor } = useAuth();
  const [friends, setFriends] = useState([]);
  const check = () => {
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
  };
  const valide = (id) => {
    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
      }/users/friends_request`,
      {
        method: "put",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      }
    ).then((response) => response.ok && check());
  };
  const sup = (id) => {
    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
      }/users/friends_request`,
      {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      }
    ).then((response) => response.ok && check());
  };
  useEffect(() => {
    check();
  }, []);

  return (
    <div>
      <h1
        className="title-list"
        style={
          Number.isNaN(gameBoyColor)
            ? { color: `gray` }
            : { color: `hsl(${gameBoyColor}, 50%, 50%)` }
        }
      >
        Demandes reçues
      </h1>
      <section
        className="friends"
        style={
          Number.isNaN(gameBoyColor)
            ? { backgroundColor: `gray`, color: "#FFF" }
            : { backgroundColor: `hsl(${gameBoyColor}, 50%, 50%)` }
        }
      >
        {friends.length > 0 ? (
          friends.map((friend) => (
            <figure key={friend.id}>
              <figcaption>
                <p>{friend.username}</p>
                <button
                  type="button"
                  className="marge"
                  onClick={() => {
                    valide(friend.id);
                  }}
                >
                  <FcOk size="1rem" />
                </button>
                <button
                  type="button"
                  className="marge"
                  onClick={() => {
                    sup(friend.id);
                  }}
                >
                  <FcCancel size="1rem" />
                </button>
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

  const check = () => {
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
  };
  const sup = (id) => {
    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
      }/users/friends_request`,
      {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      }
    ).then((response) => response.ok && check());
  };
  useEffect(() => {
    check();
  }, []);
  return (
    <div>
      <h1
        className="title-list"
        style={
          Number.isNaN(gameBoyColor)
            ? { color: `gray` }
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
            ? { backgroundColor: `gray`, color: "#FFF" }
            : { backgroundColor: `hsl(${gameBoyColor}, 50%, 50%)` }
        }
      >
        {friends.length > 0 ? (
          friends.map((friend) => (
            <figure key={friend.id}>
              <figcaption>
                <p>{friend.username}</p>{" "}
                <button
                  type="button"
                  className="marge"
                  onClick={() => {
                    sup(friend.id);
                  }}
                >
                  <FcCancel size="1rem" />
                </button>
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
