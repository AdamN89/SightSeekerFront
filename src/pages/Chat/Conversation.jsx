import { useState, useEffect } from "react"

export default function Conversation({ data, currentUserId }) {

    const [ userData, setUserData ] = useState(null) // This is who we send the messages to

    useEffect(() => {

        // const userId = data.members.find((id) => id !== currentUserId)
        const userId = "649a962a8f1d741bbea44dd1"
        console.log(userId)

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
        <div className="follower conversation">
        <div>
            <div className="online-dot">
                <img src={userData?.avatar} alt="recipients avatar" style={{ width: "50px", height:"50px"}} />
                <div className="name" style={{fontSize: "0.8rem"}}>
                    <span>{userData?.name}</span>
                    <span>Online</span>
                </div>
            </div>
        </div>
        <hr style={{width: "85%", border: "0.1px solid #ececec"}} />
        </div>
    </>
  )
};

