import React, { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");
  const { loggedUserInfo } = useContext(AuthContext);

  const handleTyping = () => {
    socket.emit("typing", `${loggedUserInfo.userName} sta scrivendo`);
  };
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("message", {
        text: message,
        name: loggedUserInfo.userName,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }

    setMessage("");
  };

  return (
    <div className='chat_footer'>
      <form className='form' onSubmit={handleSendMessage}>
        <input
          type='text'
          placeholder='Scrivi un messaggio'
          className='message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className='sendBtn'>Invia</button>
      </form>
    </div>
  );
};

export default ChatFooter;
