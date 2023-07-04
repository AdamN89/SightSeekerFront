import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "../../components/DeleteIcon";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";
import EditIcon from "../../components/EditIcon";

export default function Conversation({
  data,
  currentUserId,
  online,
  chat,
  setSendMessage,
  receiveMessage,
  onlineUsers,
}) {
  const navigate = useNavigate()
  const { backendURL } = useContext(AuthContext);
  const [ chatName, setChatName ] = useState(data.chatName)
  const [ newChatName, setNewChatName ] = useState()
  const [userData, setUserData] = useState([]); // This is who we send the messages to
  const [multipleUsers, setMultipleUsers] = useState([]);
  // const [ chatName, setChatName ] = useState("My Group Chat")
  const [ rename, setRename ] = useState(false)

  const displayOnline =
    multipleUsers.length > 1 ? (
      multipleUsers.map((user) => (
        <div className="multiple-users" key={user._id}>
          {user.name}
          <span>
            {onlineUsers.find((onlineUser) => onlineUser.userId === user._id)
              ?.online
              ? " - Online"
              : " - Offline"}
          </span>
        </div>
      ))
    ) : (
      <div className="single-user">
        {userData[0]?.name}
        <span>
          {onlineUsers.find(
            (onlineUser) => onlineUser.userId === userData[0]?._id
          )?.online
            ? " - Online"
            : " - Offline"}
        </span>
      </div>
    );

  useEffect(() => {
    // const filteredMembers = data.members[1]
    const filteredMembers = data.members.filter(
      (member) => member !== currentUserId
    );
    console.log("this is current chat passed down from chat component", data)
    // console.log("this is filtered members", filteredMembers)

    const getUserData = async () => {
      try {
        const response = await fetch(`${backendURL}/user/chatmembers`, {
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ members: filteredMembers }),
          method: "POST",
        });
        const data = await response.json();
        // console.log("incoming data", data.data)
        const chatMembers = data.data.filter(
          (user) => user._id !== currentUserId
        );
        // console.log("chatMembers", chatMembers)

        if (chatMembers.length > 1) {
          setMultipleUsers(chatMembers);
        } else {
          setUserData(chatMembers);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [data]);

  const deleteChat = async (e) => {
    try {
      const response = await fetch(`${backendURL}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: data._id
        }),
      });
      console.log("response", response)
      const deletedChat = await response.json();
      console.log("this is the chat being deleted",deletedChat)
      console.log("this is the chatId I'm sending back", data._id)
    } catch (error) {
      console.log(error);
    }
    navigate("/")
  };
  
  const renameChat = async (event) => {
    if (event.key === 'Enter') {
      try {
        const response = await fetch(`${backendURL}`,{
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            newChatName : newChatName,
            _id: data._id
          }),
        });
        console.log("update response", response)
        const renamedChat = await response.json()
        setChatName(renamedChat.chatName)
        console.log("this is response json renamedChat", renamedChat)
      } catch (error) {
        console.log(error)
      }
     setRename(!rename)
    }
  };

  const showInput = (e) => {
    e.stopPropagation();
    setRename(!rename)
  }

  const handleButtonClick = (event) => {
    event.stopPropagation();
  };

  const handleChange = (e) => {
    setNewChatName(e.target.value)
    console.log(e.target.value)
  };

  const classname = rename ? "active-field" : "rename-field"

  return (
    <>
      <div className="groupchat">
        <div className="groupchat-content">
          <div className="groupchat-name">{chatName}</div>
          <div className="groupchat-members">
            {/* {multipleUsers.length > 1 ? (multipleUsers.map((user) => (
                <div>{user._id}<span>{user._id === online?.userId ?  " - Online" : " - Offline"}</span></div>
              ))) : (<div>{userData[0]?._id}<span>{online?.online ? " - Online" : " - Offline"}</span></div>)} */}
            {displayOnline}
          </div>
        </div>
        <button className="groupchat-graphic" onClick={handleButtonClick}>
        <div onClick={showInput}>
          <EditIcon />
        </div>
        <div onClick={deleteChat}>
          <DeleteIcon />
        </div>
          <input 
            className={classname} 
            type="text" 
            value={newChatName}
            onKeyDown={renameChat}
            onChange={handleChange}
            onClick={(e) => e.stopPropagation()} />
        </button>
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
  );
}
