import React, { useEffect, useRef } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import moment from "moment";

import { formatDate } from "../../utils/utils";
import Avatar from "react-avatar";
const ChatBody = () => {
  const { messages } = useContext(ChatContext);
  const {
    userId,
    loggedUserInfo: { pic },
  } = useContext(AuthContext);

  const lastRef = useRef(null);
  useEffect(() => {
    if (lastRef.current) {
      lastRef.current.scrollTop = lastRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div className='box-body'>
      <div ref={lastRef} className='direct-chat-messages'>
        {messages.map((message) => {
          return (
            <div
              className={
                userId === message.sender_id
                  ? "direct-chat-msg"
                  : "direct-chat-msg right"
              }
            >
              <div className='direct-chat-info clearfix'>
                <span
                  className={
                    userId === message.sender_id
                      ? "direct-chat-name pull-right"
                      : "direct-chat-name pull-left"
                  }
                >
                  {message.sender_username}
                </span>
                <span
                  className={
                    userId === message.sender_id
                      ? "direct-chat-timestamp pull-left"
                      : "direct-chat-timestamp pull-right"
                  }
                >
                  {moment(message.createdAt).format("Do MMM h:mm a")}
                </span>
              </div>

              {/* <img
                className='direct-chat-img'
                src='https://img.icons8.com/color/36/000000/administrator-male.png'
                alt='message user image'
              /> */}

              <Avatar
                src={pic}
                maxInitials={2}
                label='U'
                className='direct-chat-img'
                name={message.sender_username}
              />

              <div className='direct-chat-text'>{message.content}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatBody;
