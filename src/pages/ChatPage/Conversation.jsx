import { useState, useEffect } from "react"
import ChatImage from "../../components/Chat/ChatImage"

export default function Conversation({ data, currentUserId, online, chat, setSendMessage, receiveMessage, onlineUsers }) {

    const [ userData, setUserData ] = useState([]) // This is who we send the messages to
    const [ multipleUsers, setMultipleUsers ] = useState([])
 
    const displayOnline = multipleUsers.length > 1 ? (
      multipleUsers.map((user) => (
        <div className="multiple-users" key={user._id}>
          {user.name}
          <span>{onlineUsers.find((onlineUser) => onlineUser.userId === user._id)?.online ? " - Online" : " - Offline"}</span>
        </div>
      ))
    ) : (
      <div className="single-user">
        {userData[0]?.name}
        <span>{onlineUsers.find((onlineUser) => onlineUser.userId === userData[0]?._id)?.online ? " - Online" : " - Offline"}</span>
      </div>
    )

  useEffect(() => {
    const filteredMembers = data.members[1]
    console.log("this is chat as data", data)
    console.log("this is chat members", data.members[1])

    const getUserData = async() => {
      try {
        const response = await fetch(`http://localhost:8080/user/chatmembers`,{
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({members : filteredMembers}),
          method: "POST"
          })
          const data = await response.json()
          // setUserData(data.data)
          console.log("incoming data", data.data)
          if (data.data.length > 2) {
            setMultipleUsers(data.data)
          } else {
            setUserData(data.data)
          }
      } 
      catch (error) {
        console.log(error)
      }
    }
    getUserData()
    // if (Array.isArray(filteredMembers[0])? filteredMembers[0][0] : filteredMembers[0]){
    //   }
  },[data])
    
  return (
    <>
      <div className="groupchat">
        <div className="groupchat-content">
          <div className="groupchat-name">My group chat</div>
          <div className="groupchat-members">
              {/* {multipleUsers.length > 1 ? (multipleUsers.map((user) => (
                <div>{user._id}<span>{user._id === online?.userId ?  " - Online" : " - Offline"}</span></div>
              ))) : (<div>{userData[0]?._id}<span>{online?.online ? " - Online" : " - Offline"}</span></div>)} */}
              {displayOnline}
          </div>
        </div>
        <div className="groupchat-graphic">
          <ChatImage />
        </div>
      </div>

      {/* <div className="follower conversation">
      <div>
          {online && <div className="online-dot"></div>}
              <img src={userData?.avatar} alt="recipients avatar" style={{ width: "50px", height:"50px"}} />
              <div className="name" style={{fontSize: "0.8rem"}}>
                  <span>{userData?.name}</span>
                  <span>{online? "Online" : "Offline"}</span>
              </div>
      </div>
      <hr style={{width: "85%", border: "0.1px solid #ececec"}} />
      </div> */}
    </>
  )
};

