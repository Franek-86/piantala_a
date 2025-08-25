import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

import { useContext } from "react";

const ChatForm = () => {
  const { setMessage, message, sendMessage } = useContext(ChatContext);
  const { userId } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("tu", message);
    const data = {
      sender_id: userId,
      receiver_id: null,
      content: message,
    };
    sendMessage(data);
    setMessage("");
  };
  return (
    <InputGroup className='mb-3 position-absolute bottom-0'>
      <Form.Control
        placeholder='messaggio...'
        aria-label='message'
        aria-describedby='basic-addon2'
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <Button
        onClick={handleSubmit}
        variant='outline-secondary'
        id='button-addon2'
      >
        Invia
      </Button>
    </InputGroup>
  );
};

export default ChatForm;
