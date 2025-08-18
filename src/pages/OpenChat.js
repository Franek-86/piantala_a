import React from "react";
import ChatBar from "../components/chat/ChatBar";
import ChatBody from "../components/chat/ChatBody";
import ChatFooter from "../components/chat/ChatFooter";
import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useRef } from "react";

const OpenChat = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const { loggedUserInfo } = useContext(AuthContext);
  const [typingStatus, setTypingStatus] = useState("");
  let userName = loggedUserInfo.userName;
  const lastMessageRef = useRef(null);
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);
  useEffect(() => {
    socket.emit("newUser", {
      socketID: socket.id,
      userName: userName,
    });

    // console.log("sta 12");
  }, [socket]);
  useEffect(() => {
    socket.on("typingResponse", (data) => {
      setTypingStatus(data);
    });
  });

  return (
    <div className='chat'>
      <ChatBar socket={socket} />
      <div className='chat__main'>
        <ChatBody
          messages={messages}
          typingStatus={typingStatus}
          lastMessageRef={lastMessageRef}
        />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default OpenChat;
