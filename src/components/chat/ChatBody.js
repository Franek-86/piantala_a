import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useState } from "react";

function ChatBody({ messages, typingStatus, lastMessageRef }) {
  const { loggedUserInfo } = useContext(AuthContext);
  // console.log("messages", messages);
  const navigate = useNavigate();
  const handleLeaveChat = () => {
    navigate("/");
    window.location.reload();
  };
  return (
    <>
      <header className='chat__mainHeader'>
        <p>Ti Pianto Per Amore</p>
        <button className='leaveChat__btn' onClick={handleLeaveChat}>
          ESCI
        </button>
      </header>

      {/*This shows messages sent from you*/}
      <div className='message__container'>
        <>
          {messages.map((message) => {
            return message.name === loggedUserInfo.userName ? (
              <div className='message__chats'>
                <p className='sender__name'>You</p>
                <div className='message__sender'>
                  <p>{message.text}</p>
                </div>
              </div>
            ) : (
              <div className='message__chats'>
                <p>{message.name}</p>
                <div className='message__recipient'>
                  <p>{message.text}</p>
                </div>
              </div>
            );
          })}
          <div ref={lastMessageRef} />
        </>
        <div className='message__status'>
          <p>{typingStatus}</p>
        </div>
      </div>
    </>
  );
}

export default ChatBody;
