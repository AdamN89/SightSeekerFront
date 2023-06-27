import "./chat.css"
import { useState, useContext, useEffect, useRef } from "react"
import { AuthContext } from "../../context/AuthContext";
import Conversation from "./Conversation";
import ChatBox from "./ChatBox";
import { io } from "socket.io-client"

export default function Chat() {

  const { user, setUser, token } = useContext(AuthContext);
  const [ chats, setChats ] = useState([])
  const [ currentChat, setCurrentChat ] = useState(null)
  const [ onlineUsers, setOnlineUsers ] = useState([])
  const [ sendMessage, setSendMessage ] = useState(null)
  const [ receiveMessage, setReceiveMessage ] = useState(null)
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

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <div className="Chat-container">

        <h2>Chats</h2>
        <div className="Chat-list">
          {chats.map((chat) => (
            <div onClick={() =>  setCurrentChat(chat)}>
              <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} />
            </div>
          ))}
        </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="Right-side-chat">
        <div style={{width: "20rem", alignSelf: "flex-end"}}>
      
      {/* Chat Body */}
      <ChatBox chat={currentChat} currentUserId={user._id} setSendMessage={setSendMessage} receiveMessage={receiveMessage}/>

        </div>
      </div>
      
    </div>
  )
};

