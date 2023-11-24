import React, { useEffect, useState } from "react";
import { TbMessages } from "react-icons/tb";
import { useAuth } from "../contexts/AuthContext";
import Message from "./Message";

export default function FriendsList() {
  const [friendsList, setFriendsList] = useState([]);
  const { token } = useAuth();
  const [message, setMessage] = useState("");
  const [friendshipName, setFriendshipName] = useState("");
  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
      }/users/friends`,
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setFriendsList(data);
      });
  }, []);

  return (
    <>
      <div>
        <h1 className="title-list">Liste d'Amis</h1>

        <table className="friends">
          <tr>
            <th>#</th>
            <th>username</th>
          </tr>
          {friendsList.length > 0 ? (
            friendsList.map((friend, index) => (
              <tr
                key={friend.id}
                onClick={() => {
                  setMessage(friend.id);
                  setFriendshipName(friend.username);
                }}
              >
                <td>{index + 1}</td>
                <td>{friend.username}</td>
                <td>
                  <TbMessages size="1rem" />
                </td>
              </tr>
            ))
          ) : (
            <p className="no-add"> Aucun ami accepté</p>
          )}
        </table>
      </div>
      {message && (
        <Message
          setMessage={setMessage}
          id={message}
          FriendshipName={friendshipName}
        />
      )}
    </>
  );
}
