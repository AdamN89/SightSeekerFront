import { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Chat.css";
import CloseIcon from "../TopMenu/Icons/CloseIcon";
import SearchBar from "../SearchBar";
import Button from "../Button";
import ChatImage from "./ChatImage";
import ChatIcon from "../NavigationIcons/ChatIcon";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";
import Conversation from "../../pages/ChatPage/Conversation";
import { io } from "socket.io-client";

export default function Chat() {
  const chatsRef = useRef(null);
  const friendsRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  // ----------------------------------------------------------------------------------------------------//
  const { user, setUser, token, backendURL } = useContext(AuthContext);
  const {
    currentChat,
    setCurrentChat,
    sendMessage,
    setSendMessage,
    receiveMessage,
    setReceiveMessage,
    closeMenu,
    closeTopMenu,
    chats,
    setChats,
    onlineUsers,
    setOnlineUsers,
  } = useContext(DataContext);
  // const [onlineUsers, setOnlineUsers] = useState([]);
  // const socket = useRef();

  //initialize socket server
  // useEffect(() => {

  //   socket.current = io(backendURL, {
  //     transports: ["websocket"],
  //     extraHeaders: {
  //       "Access-Control-Allow-Private-Network": true,
  //     },
  //   });
  //   socket.current.emit("new-user-add", user?._id);
  //   socket.current.on("get-users", (users) => {
  //     setOnlineUsers(users)
  //     console.log("this is going into online users", users)
  //   });
  //   return () => {
  //     socket.current.off("get-users", (users) => {
  //       setOnlineUsers(users);
  //     });
  //   };
  // }, [user]);

  // send message to socket server
  // useEffect(() => {
  //   if (sendMessage !== null) {
  //     socket.current.emit("send-message", sendMessage);
  //   }
  // }, [sendMessage]);

  // receive message from socket server
  // useEffect(() => {
  //   socket.current.on("receive-message", (data) => {
  //     setReceiveMessage(data);
  //   });
  //   return () => {
  //     socket.current.off("receive-message", (data) => {
  //       setReceiveMessage(data);
  //     });
  //   };
  // }, []);

  useEffect(() => {
    const getChats = async () => {
      try {
        const response = await fetch(`${backendURL}/chat/${user._id}`);
        const data = await response.json();
        setChats(data);
        console.log("this is available chats", data);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) getChats();
  }, [user]);
  // console.log("this is user", user)
  const checkOnlineStatus = (chat) => {
    // console.log("this is chat?", chat)
    // const chatMember = chat.members.length > 1 ? (console.log("lol")) : chat.members.find((member) => member !== user._id)
    const chatMember = chat.members.find((member) => member !== user._id);
    // const chatMember = chat.members.find((member) => console.log("this is chatMember", member))
    // console.log("this is chatmember", chatMember)
    // const online = chatMember.length > 1 ? (onlineUsers.map((users) => users.find((user) => user.userId === chatMember) : (onlineUsers.find((user) => user.userId === chatMember))
    const online = onlineUsers.find((user) => user.userId === chatMember);
    // console.log("this is online", online)
    return online;
  };

  return {
    chatsRef,
    renderChatsPage: (
      <>
        <div className="navigation_wrapper">
          <div
            ref={chatsRef}
            className="navigation_wrapper_body navigaton_page_not_visible"
          >
            <div className="navigation_wrapper_body_header">
              <h1 className="title">Chats</h1>
              <button
                className="navigation_close_btn"
                onClick={() => {
                  closeMenu(chatsRef);
                  closeTopMenu();
                }}
              >
                <CloseIcon />
              </button>
            </div>
            {/* <ChatsSearchBar /> */}
            {/* start of content of navigation page */}
            <div className="navigation_wrapper_body_content">
              <Button
                txt={"Create new chat"}
                func={() => closeMenu(chatsRef)}
                key="login"
              />
              {chats.map((chat) => (
                <div
                  onClick={() => {
                    setCurrentChat(chat);
                    navigate("/chat");
                  }}
                >
                  <Conversation
                    data={chat}
                    currentUserId={user._id}
                    online={checkOnlineStatus(chat)}
                    onlineUsers={onlineUsers}
                  />
                </div>
              ))}
              <div className="groupchat_icon">
                <ChatImage />
              </div>
            </div>
            {/* end of content of navigation page */}
          </div>
        </div>
      </>
    ),
  };
}
