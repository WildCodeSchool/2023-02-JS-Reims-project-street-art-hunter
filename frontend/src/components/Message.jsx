import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { BiSend } from "react-icons/bi";

import { GiReturnArrow } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Massege() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [messageList, setMessageList] = useState([]);
  const [newMessageText, setNewMessageText] = useState("");
  const [socket, setSocket] = useState(null);
  const [myIdUser, setMyIdUser] = useState();
  const id = 1;
  const FriendshipName = "FriendshipName";
  useEffect(() => {
    const newSocket = socketIOClient(
      `${import.meta.env.VITE_BACKEND_URL ?? `http://localhost:5000`}`
    );

    setSocket(newSocket);

    newSocket.emit("token", {
      Authorization: `Bearer ${token}`,
      id_friendship: id,
    });

    newSocket.on("messages", (messages) => {
      setMessageList(messages);
    });

    newSocket.on("myUser", (UserId) => {
      setMyIdUser(UserId);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit("newMessage", {
      id_friendship: id,
      content: newMessageText,
    });
    setNewMessageText("");
  };

  const { gameBoyColor } = useAuth();
  return (
    <div
      className="message"
      style={
        Number.isNaN(gameBoyColor)
          ? { backgroundColor: `hsl(93, 10%, 82%)` }
          : { backgroundColor: `hsl(${gameBoyColor}, 100%, 50%)` }
      }
    >
      <h2>
        <GiReturnArrow
          className="return"
          onClick={() => {
            navigate("/menu");
          }}
        />
        {FriendshipName}
      </h2>
      <div
        className="messages"
        style={
          Number.isNaN(gameBoyColor)
            ? { backgroundColor: `hsl(93, 10%, 92%)` }
            : { backgroundColor: `hsl(${gameBoyColor}, 100%, 80%)` }
        }
      >
        {messageList.map((message) => {
          return (
            <div
              key={message.id}
              className={`allMessages ${
                message.user_id === myIdUser && "myMessages"
              }`}
            >
              <p
                className={`allMessage
              ${message.user_id === myIdUser ? "myMessage" : "yourMessage"}
              `}
              >
                {message.content}
              </p>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="messageContent"
          placeholder="message"
          value={newMessageText}
          required
          onFocus
          onChange={(e) => setNewMessageText(e.target.value)}
        />
        <BiSend size={30} onClick={handleSubmit} className="send" />
      </form>
    </div>
  );
}
