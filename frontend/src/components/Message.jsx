import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { BiSend } from "react-icons/bi";
import { useAuth } from "../contexts/AuthContext";

export default function Massege() {
  const { token } = useAuth();
  const [messageList, setMessageList] = useState([]);
  const [newMessageText, setNewMessageText] = useState("");
  const [socket, setSocket] = useState(null);
  const id = 1;
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

  return (
    <div className="message">
      <h2>Messages</h2>
      {messageList.map((message) => {
        return (
          <div key={message.id}>
            {message.username} : {message.content}
          </div>
        );
      })}

      <form onSubmit={handleSubmit}>
        <h2>New Message</h2>
        <input
          type="text"
          name="messageContent"
          placeholder="message"
          value={newMessageText}
          required
          onChange={(e) => setNewMessageText(e.target.value)}
        />
        <botton type="submit">
          <BiSend size={25} />
        </botton>
      </form>
    </div>
  );
}
