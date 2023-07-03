import { useEffect, useState, useRef, useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { AuthContext } from "../../context/AuthContext";
import { format } from "timeago.js"
import InputEmoji from "react-input-emoji"
import "../ChatPage/ChatPage.css"
import { io } from "socket.io-client";


export default function ChatBox() {
  const { user, backendURL } = useContext(AuthContext);
  const currentUserId = user._id
  const { currentChat, setCurrentChat, sendMessage, setSendMessage, receiveMessage, setReceiveMessage, onlineUsers, setOnlineUsers } = useContext(DataContext)
  const [ userData, setUserData ] = useState(null)
  const [ multipleUsers, setMultipleUsers ] = useState()
  const [ messages, setMessages ] = useState([])
  const [ newMessage, setNewMessage ] = useState(" ")
  const scroll = useRef()
  const socket = useRef();


  //initialize socket server
  useEffect(() => {

    socket.current = io(backendURL, {
      transports: ["websocket"],
      extraHeaders: {
        "Access-Control-Allow-Private-Network": true,
      },
    });
    socket.current.emit("new-user-add", user?._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users)
    });
    return () => {
      socket.current.off("get-users", (users) => {
        setOnlineUsers(users);
      });
    };
  }, [user]);

  // send message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // receive message from socket server
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceiveMessage(data);
    });
    return () => {
      socket.current.off("receive-message", (data) => {
        setReceiveMessage(data);
      });
    };
  }, []);

  const filteredMembers = currentChat.members.flat().filter((member) => member !== currentUserId);

  // fetching chat members data for header
  useEffect(() => {
    const getUserData = async() => {
      try {
        const response = await fetch(`http://localhost:8080/user/chatmembers`, {
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({members : filteredMembers}),
          method: "POST"
          })
          const data = await response.json()
          console.log("incoming data", data.data)
          const chatMembers = data.data.filter((user) => user._id !== currentUserId  )
          console.log("chatMembers", chatMembers)

          if (chatMembers.length > 1) {
            setMultipleUsers(chatMembers)
            console.log("multiple members", chatMembers)
          } else {
            setUserData(chatMembers)
            console.log("single member USER DATA", chatMembers)
          }
      } 
      catch (error) {
        console.log(error)
      }
    };

    if (
      Array.isArray(filteredMembers[0])
        ? filteredMembers[0][0]
        : filteredMembers[0]
    ) {
      getUserData();
    }
    getUserData()
  },[currentChat])

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === currentChat?._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

  // fetching data for messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:8080/message/${currentChat._id}`)
        const data = await response.json()
        console.log("fetched messages", data)
        setMessages(data)
      } catch (error) {
        console.log(error);
      }
    };
    if (currentChat !== null) fetchMessages();
  }, [currentChat]);

  const handleChange = async (newMessage) => {
    await setNewMessage(newMessage);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      chatId: currentChat._id,
      senderId: currentUserId,
      text: newMessage,
    };

    // sending to DB
    try {
      const response = await fetch(`http://localhost:8080/message/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      console.log(response);
      const data = await response.json();
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }

    // send messages to socket server
    const receiverId = filteredMembers
    console.log("receiverId", receiverId);
    setSendMessage({ ...message, receiverId });
  }

  // always scroll to the last message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div className="second_element">
      <div className="ChatBox-container">
        {currentChat ? (
          <>
            <div className="chat-header">
              <div className="members">
                {multipleUsers ? (
                  multipleUsers.map((user) => (
                    <div className="name" style={{ fontSize: "0.8rem" }}>
                      <span>{user.name}</span>
                      <img
                        src={user.avatar}
                        alt="recipients avatar"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </div>
                  ))
                ) : (
                  <div className="name" style={{ fontSize: "0.8rem" }}>
                    <span>{userData?.name}</span>
                    <img
                      src={userData?.avatar}
                      alt="recipients avatar"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </div>
                )}
              </div>
              {/* <hr style={{width: "85%", border: "0.1px solid #ececec"}} /> */}
            </div>
            {/* Chat Box Messages */}
            <div className="chat_wall-container">
              {messages.map((message) => (
                <div
                  key={message.createdAt}
                  ref={scroll}
                  className={
                    message.senderId === currentUserId
                      ? "users_message"
                      : "senders_message"
                  }
                >
                  <div className="message-body">
                    <p className="message-text">{message.text}</p>
                  </div>
                  <p
                    className={
                      message.senderId === currentUserId
                        ? "users_message-time_stamp"
                        : "senders_message-time_stamp"
                    }
                  >
                    {format(message.createdAt)}
                  </p>
                </div>
              ))}
            </div>

            {/* Chat-sender */}
            <div className="chat-sender">
              <div>+</div> {/* To add images for example later on */}
              <InputEmoji
                borderRadius="20px 0px 0px 20px"
                value={newMessage}
                onChange={handleChange}
              />
              <div className="send-button button" onClick={handleSend}>
                Send
              </div>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a user to start chat!
          </span>
        )}
      </div>
    </div>
  );
}
