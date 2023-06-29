import { useEffect, useState, useRef, useContext } from "react"
import { DataContext } from "../../context/DataContext"
import { AuthContext } from "../../context/AuthContext";
import { format } from "timeago.js"
import InputEmoji from "react-input-emoji"
import "../ChatPage/ChatPage.css"


export default function ChatBox() {
  const { user } = useContext(AuthContext);
  const currentUserId = user._id
  const { currentChat, setCurrentChat, sendMessage, setSendMessage, receiveMessage, setReceiveMessage } = useContext(DataContext)
  const [ userData, setUserData ] = useState(null)
  const [ messages, setMessages ] = useState([])
  const [ newMessage, setNewMessage ] = useState(" ")
  const scroll = useRef()

  useEffect(() => {
    if(receiveMessage !== null && receiveMessage.chatId === currentChat?._id) {
      setMessages([...messages, receiveMessage])
    }
  },[receiveMessage])


  // fetching data for header
  useEffect(() => {
    const userId = currentChat?.members?.find((id) => id !== currentUserId)

    const getUserData = async() => {
      try {
          const response = await fetch(`http://localhost:8080/user/${userId}`)
          const data = await response.json()
          setUserData(data.data)
      } catch (error) {
          console.log(error)
      }
  }
    if (currentChat !== null) getUserData()
  },[currentChat, currentUserId])

  // fetching data for messages
  useEffect(() => {
    const fetchMessages = async() => {
      try {
        const response = await fetch(`http://localhost:8080/message/${currentChat._id}`)
        const data = await response.json()
        setMessages(data)
      } catch (error) {
        console.log(error)
      }
    }
    if (currentChat !== null) fetchMessages()
  },[currentChat])

  const handleChange = async (newMessage) => {
    await setNewMessage(newMessage)
  }

  const handleSend = async (e) => {
    e.preventDefault()
    const message = {
      chatId : currentChat._id,
      senderId : currentUserId,
      text : newMessage,
    }
    
    // sending to DB
    try {
      const response = await fetch(`http://localhost:8080/message/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      })
console.log(response)
      const data = await response.json()
      setMessages([...messages, data])
      setNewMessage("")
    } catch (error) {
      console.log(error)
    }

    // send messages to socket server
    const receiverId =  currentChat.members.find((id) => id !== currentUserId)
    setSendMessage({...message, receiverId})
  }

  // always scroll to the last message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" })
  })

  return (
    <div className="second_element">
    <div className="ChatBox-container">
      {currentChat ? (
        <>
        <div className="chat-header">
          <div className="members">
            <img src={userData?.avatar} alt="recipients avatar" style={{ width: "50px", height:"50px"}} />
            <div className="name" style={{fontSize: "0.8rem"}}>
                <span>{userData?.name}</span>
            </div>

          </div>
          {/* <hr style={{width: "85%", border: "0.1px solid #ececec"}} /> */}
        </div>
        {/* Chat Box Messages */}
        <div className="chat_wall-container">
          {messages.map((message) => (
            <>
            <div ref={scroll} className= {message.senderId === currentUserId ? "users_message" : "senders_message"}>
              <div className="message-body">
                <p className="message-text">{message.text}</p>
              </div>
              <p className={message.senderId === currentUserId ? "users_message-time_stamp" : "senders_message-time_stamp"}>{format(message.createdAt)}</p>
            </div>
            
            </>
          ))}
        </div>

        {/* Chat-sender */}
        <div className="chat-sender">
          <div>+</div> {/* To add images for example later on */}
          <InputEmoji 
            borderRadius= "20px 0px 0px 20px"
            value={newMessage}
            onChange={handleChange}
          />
          <div className="send-button button" onClick={handleSend}>Send</div>
        </div>
      </>
      ) : (
        <span className="chatbox-empty-message">
          Tap on a user to start chat!
        </span>
      )}
      
    </div>
    </div>
  )
};