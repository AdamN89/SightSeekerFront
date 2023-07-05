import "./chat.css";
import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";
import ChatBox from "./ChatBox";
import CloseIcon from "../../components/CloseIcon";

export default function ChatPage() {
  const { user, backendURL } = useContext(AuthContext);
  const { chatName, setChatName } = useContext(DataContext);
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const getChats = async () => {
      try {
        const response = await fetch(`${backendURL}/chat/${user._id}`);
        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) getChats();
  }, [user]);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className="container chat_page">
      <div className="first_element">
        <h1 className="title">{chatName}</h1>
        <button onClick={() => navigate("/")}>
          <CloseIcon />
        </button>
      </div>
      <ChatBox />
    </div>
  );
}
