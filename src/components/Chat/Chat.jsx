import { useState, useContext, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Chat.css";
import CloseIcon from "../TopMenu/Icons/CloseIcon";
import SearchBar from "../SearchBar";
import Button from "../Button";
import ChatImage from "./ChatImage";
import ChatIcon from "../NavigationIcons/ChatIcon";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext"
import Conversation from "../../pages/Chat/Conversation"
import { io } from "socket.io-client"

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate()
  // ----------------------------------------------------------------------------------------------------//
  const { user, setUser, token } = useContext(AuthContext);
  const { currentChat, setCurrentChat, sendMessage, setSendMessage, receiveMessage, setReceiveMessage } = useContext(DataContext)

  const [ chats, setChats ] = useState([])
  // const [ currentChat, setCurrentChat ] = useState(null)
  const [ onlineUsers, setOnlineUsers ] = useState([])
  // const [ sendMessage, setSendMessage ] = useState(null)
  // const [ receiveMessage, setReceiveMessage ] = useState(null)
  const socket = useRef()

  //initialize socket server
  useEffect(() => {
    socket.current = io("http://localhost:8081")
    socket.current.emit("new-user-add", user._id)
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users)
    })
  },[user])
  
  // send message to socket server
  useEffect(() => {
    if(sendMessage !== null) {
      socket.current.emit("send-message", sendMessage)
    }
  },[sendMessage])

  // receive message from socket server
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceiveMessage(data)
    })
  },[])

  useEffect(() => {
    const getChats = async() => {
      try {
        const response = await fetch(`http://localhost:8080/chat/${user._id}`)
        const data = await response.json()
        setChats(data)
        console.log("this is chat",data)
      } catch (error) {
        console.log(error)
      }
    }
    getChats()
  },[user])

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id)
    const online = onlineUsers.find((user) => user.userId === chatMember)
    return online ? true : false
  }

  // ------------------------------------------------------------------------------------//
  const openMenu = () => {
    if (isOpen === false) menuRef.current.classList.add("chatopening");
    setIsOpen(!isOpen);
    setTimeout(() => {
      menuRef.current.classList.remove("chatopening");
    }, 500);
    console.log("click is working");
  };
  // -------------------------------------------------------------------------//
  const closeMenu = () => {
    menuRef.current.classList.add("chatclosing");
    setTimeout(() => {
      setIsOpen(!isOpen);
      menuRef.current.classList.remove("chatclosing");
    }, 700);
  };

  return (
    <>
      <button className="main_menu_btn" onClick={openMenu}>
        <ChatIcon />
      </button>
      <div
        className="chat__wrapper"
        style={{
          transform: isOpen ? `translateY(${0}px)` : `translateY(${-1000}px)`,
        }}
      >
        <div
          className="chat__body-wrapper"
          ref={menuRef}
          style={{ opacity: isOpen ? 2 : 0 }}
        >
          <div className="chat__body_header">
            <h1 className="title">Chats</h1>
            <button onClick={closeMenu}>
              <CloseIcon />
            </button>
          </div>
          <SearchBar />
          <div className="chat__body_body">
            <Link to="/chat2"><Button txt={"CREATE GROUP CHAT"} /></Link>
                  {chats.map((chat) => (
                    <div onClick={() =>  {setCurrentChat(chat); navigate("/chat")}}>
                      <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)}
                      /* chat={currentChat} setSendMessage={setSendMessage} receiveMessage={receiveMessage} */
                      />
                    </div>
                  ))}
          </div>
        </div>
      </div>
      </>
  )
}
