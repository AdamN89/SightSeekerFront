import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Chat.css";
import CloseIcon from "../TopMenu/Icons/CloseIcon";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";
import Conversation from "../../pages/ChatPage/Conversation";

export default function Chat() {
  const chatsRef = useRef(null);
  const navigate = useNavigate();
  // ----------------------------------------------------------------------------------------------------//
  const { user, backendURL } = useContext(AuthContext);
  const {
    setCurrentChat,
    closeMenu,
    closeTopMenu,
    chats,
    setChats,
    onlineUsers,
    setOnlineUsers
  } = useContext(DataContext);

  useEffect(() => {
    const getChats = async () => {
      try {
        const response = await fetch(`${backendURL}/chat/${user._id}`);
        const data = await response.json();
        console.log("fetched chats", data)
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
            {/* start of content of navigation page */}
            <div className="navigation_wrapper_body_content">
            {chats.map((chat) => (
              <div
                onClick={(event) => {
                  if (event.target.tagName !== "BUTTON") {
                    setCurrentChat(chat);
                    navigate("/chat");
                  }
                }}
              >
                <Conversation
                  data={chat}
                  currentUserId={user._id}
                  online={checkOnlineStatus(chat)}
                  onlineUsers={onlineUsers}
                  onButtonClick={(event) => {
                    event.stopPropagation();
                    // This will prevent navigation when the button is clicked
                  }}
                />
              </div>
            ))}


              {/* {chats.map((chat) => (
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
              ))} */}
            </div>
            {/* end of content of navigation page */}
          </div>
        </div>
      </>
    ),
  };
}
