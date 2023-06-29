import { useState, useEffect } from "react"
import ChatImage from "../../components/Chat/ChatImage"

export default function Conversation({ data, currentUserId, online, chat, setSendMessage, receiveMessage }) {

    const [ userData, setUserData ] = useState([]) // This is who we send the messages to
    const [ multipleUsers, setMultipleUsers ] = useState([])

  useEffect(() => {
    // const userId = data.members.find((id) => id !== currentUserId)

    const filteredMembers = data.members.filter(member => member !== currentUserId)
    // console.log("filtered members", filteredMembers)

    
    const getUserData = async() => {
      // console.log("type check", Array.isArray(filteredMembers[0]))
      try {
        const response = await fetch(`http://localhost:8080/user/chatmembers`,{
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({members : Array.isArray(filteredMembers[0]) ? filteredMembers[0] : filteredMembers}),
          method: "POST"
          })
          const data = await response.json()
          setUserData(data.data)
          // console.log("user data", data)
          // console.log("user data length check", data.data.length > 1)
          // console.log("mapping over data.data", data.data.length > 1 ? (data.data.map(member => {return member})) : (data.data[0]))
          if (data.data.length > 1) {
            setMultipleUsers(data.data)
            console.log("this is going into multi users",data.data)
          }
      } 
      catch (error) {
        console.log(error)
      }
    }

    if (Array.isArray(filteredMembers[0])? filteredMembers[0][0] : filteredMembers[0]){
        getUserData()
      }

  },[])
    
  return (
    <>
            <div className="groupchat">
              <div className="groupchat-content">
                <div className="groupchat-name">My group chat</div>
                <div className="groupchat-members">
                    {multipleUsers.length > 1 ? (multipleUsers.map((user) => (
                      <div>{user.name}<span>{online? " - Online" : " - Offline"}</span></div>
                    ))) : (<div>{userData[0]?.name}<span>{online? " - Online" : " - Offline"}</span></div>)}
                    {/* <span>{online? " - Online" : " - Offline"}</span> */}
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

