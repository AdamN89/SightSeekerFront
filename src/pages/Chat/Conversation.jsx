import { useState, useEffect } from "react"
import ChatImage from "../../components/Chat/ChatImage"

export default function Conversation({ data, currentUserId, online, chat, setSendMessage, receiveMessage }) {

    const [ userData, setUserData ] = useState(null) // This is who we send the messages to

    useEffect(() => {
        const userId = data.members.find((id) => id !== currentUserId)
        const getUserData = async() => {
            try {
                const response = await fetch(`http://localhost:8080/user/${userId}`)
                const data = await response.json()
                setUserData(data.data)
            } catch (error) {
                console.log(error)
            }
        }
        getUserData()
    },[])

  return (
    <>

            <div className="groupchat">
              <div className="groupchat-content">
                <div className="groupchat-name">My group chat</div>
                <div className="groupchat-members">
                    <span>{userData?.name}</span>
                    <span>{online? "Online" : "Offline"}</span>
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

