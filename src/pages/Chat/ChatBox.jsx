import { useEffect, useState, useRef } from "react"
import { format } from "timeago.js"
import InputEmoji from "react-input-emoji"

export default function ChatBox({ chat, currentUserId, setSendMessage, receiveMessage }) {

  const [ userData, setUserData ] = useState(null)
  const [ messages, setMessages ] = useState([])
  const [ newMessage, setNewMessage ] = useState(" ")
  const scroll = useRef()

  useEffect(() => {
    if(receiveMessage !== null && receiveMessage.chatId === chat?._id) {
      setMessages([...messages, receiveMessage])
    }
  },[receiveMessage])


  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUserId)
    // const userId = "649a962a8f1d741bbea44dd1"

    const getUserData = async() => {
      try {
          const response = await fetch(`http://localhost:8080/user/${userId}`)
          const data = await response.json()
          setUserData(data.data)
      } catch (error) {
          console.log(error)
      }
  }
    if (chat !== null) getUserData()
  },[chat, currentUserId])

  // fetching data for messages
  useEffect(() => {
    const fetchMessages = async() => {
      try {
        const response = await fetch(`http://localhost:8080/message/${chat._id}`)
        const data = await response.json()
        setMessages(data)
      } catch (error) {
        console.log(error)
      }
    }
    if (chat !== null) fetchMessages()
  },[chat])

  const handleChange = async (newMessage) => {
    await setNewMessage(newMessage)
  }

  const handleSend = async (e) => {
    e.preventDefault()
    const message = {
      chatId : chat._id,
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
    const receiverId =  chat.members.find((id) => id !== currentUserId)
    setSendMessage({...message, receiverId})
  }

  // always scroll to the last message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" })
  })

  return (
    <>
    <div className="ChatBox-container">
      {chat ? (
        <>
        <div className="chat-header">
          <div className="follower">
            <div>
                  <img src={userData?.avatar} alt="recipients avatar" style={{ width: "50px", height:"50px"}} />
                  <div className="name" style={{fontSize: "0.8rem"}}>
                      <span>{userData?.name}</span>
                  </div>
            </div>
          </div>
          <hr style={{width: "85%", border: "0.1px solid #ececec"}} />
        </div>
        {/* Chat Box Messages */}
        <div className="chat-body">
          {messages.map((message) => (
            <>
            <div ref={scroll} className= {message.senderId === currentUserId ? "message-own" : "message"}>
              <span>{message.text}</span>
              <span>{format(message.createdAt)}</span>
            </div>
            </>
          ))}
        </div>

        {/* Chat-sender */}
        <div className="chat-sender">
          <div>+</div> {/* To add images for example later on */}
          <InputEmoji 
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
    </>
  )
};

