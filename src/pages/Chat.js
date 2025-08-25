import React, { useContext } from "react";
import ChatBody from "../components/chat/ChatBody";
import { ChatContext } from "../context/ChatContext";
import ChatForm from "../components/chat/ChatForm";
import { useEffect } from "react";

const Chat = () => {
  const { getMessages, messages, message } = useContext(ChatContext);
  useEffect(() => {
    getMessages();
  }, []);
  return (
    <div>
      <ChatBody />
      <ChatForm />
    </div>
  );
};

export default Chat;
