import "./ChatPage.css"
import CloseIcon from "../../components/CloseIcon"
import SendMessageIcon from "../../components/SendMessageIcon"

export default function ChatPage() {

    const user = <img src="../../assets/defaultavatar/09.jpg" alt="user-img" />

  return (
    <div className="container">
        <div className="first_element">
            <div className="title_container">
                <h1 className="title">My Group Chat</h1>
                <CloseIcon />
            </div>
            <p>Members</p>
            <div className="members">
            {user}{user}{user}{user}
            </div>
        </div>
        <div className="second_element">
            <div className="chat_wall">
                <div className="bla">
                    blabla
                    blabla
                    blabla
                    blabla
                    <div className="blbalba">
                        blabla
                        blabla
                        blabla
                        blabla
                    </div>
                    <div className="blbalba">
                        blabla
                        blabla
                        blabla
                        blabla
                    </div>
                </div>
                <input type="text" placeholder="Enter your message" />
            </div>
        </div>
    </div>
  )
};

