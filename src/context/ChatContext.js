import { createContext } from "react";
import { SocketContext } from "./SocketContext";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import AxiosInstance from "../services/axiosInstance";

export const ChatContext = createContext();
export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const { socket } = useContext(SocketContext);
  useEffect(() => {
    if (socket) {
      socket.on("message", (message) => {
        setMessages([...messages, message]);
      });
    }
  }, [messages, socket]);

  const sendMessage = async (data) => {
    const response = await AxiosInstance.post("api/chat/new-message", data);
    if ((response.status = 200)) {
      return response;
    }
  };

  const getMessages = async (data) => {
    const response = await AxiosInstance.get("api/chat/all-messages");
    if (response) {
      setMessages(response.data.messages);
      return;
    }
  };
  return (
    <ChatContext.Provider
      value={{ messages, setMessage, message, sendMessage, getMessages }}
    >
      {children}
    </ChatContext.Provider>
  );
};
