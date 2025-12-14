import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { UsersContext } from "../../context/UsersContext";

const ChatForm = () => {
  const { setMessage, message, sendMessage } = useContext(ChatContext);
  const { isAuthenticated, userId } = useContext(AuthContext);
  const { loggedUserInfo } = useContext(UsersContext);
  console.log("asdf", loggedUserInfo.pic);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("tu", message);
    const data = {
      sender_id: userId,
      sender_username: loggedUserInfo.userName,
      receiver_id: null,
      pic: loggedUserInfo.pic,
      content: message,
    };
    sendMessage(data);
    setMessage("");
  };
  return (
    <InputGroup className='pb-2 chat-footer'>
      <Form.Control
        placeholder={isAuthenticated ? "messaggio..." : "Login necessario"}
        aria-label='message'
        aria-describedby='basic-addon2'
        disabled={!isAuthenticated}
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <span class='input-group-btn'>
        <Button
          className='btn btn-warning btn-flat'
          onClick={handleSubmit}
          variant='outline-secondary'
          id='button-addon2'
          disabled={!isAuthenticated}
        >
          Invia
        </Button>
      </span>
    </InputGroup>
  );
};

export default ChatForm;
// <InputGroup className='mb-3 position-absolute bottom-0'>
//     <Form.Control
//       placeholder='messaggio...'
//       aria-label='message'
//       aria-describedby='basic-addon2'
//       value={message}
//       onChange={(e) => {
//         setMessage(e.target.value);
//       }}
//     />
//     <span class='input-group-btn'>
//       <Button
//         className='btn btn-warning btn-flat'
//         onClick={handleSubmit}
//         variant='outline-secondary'
//         id='button-addon2'
//       >
//         Invia
//       </Button>
//     </span>
//   </InputGroup>;
