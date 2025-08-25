import React from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
const ChatBody = () => {
  const { messages } = useContext(ChatContext);
  const { userName, userId } = useContext(AuthContext);
  return (
    <div>
      {messages.map((message) => {
        return (
          <div
            className={
              userId === message.sender_id
                ? "message sender"
                : "message receive"
            }
          >
            <p>
              {message.content}
              {userName}
              {userId}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ChatBody;
