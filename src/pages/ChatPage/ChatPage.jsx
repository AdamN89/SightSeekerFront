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
            <div className="chat_wall-container">
                    <div className="chat_wall-date">
                        <p>Today</p>
                    </div>
                <div className="chat_wall">
                        <div className="senders_message">
                            <div className="senders_message-body">
                            <p>
                                Introducing our new travel planning tool!
                                Now you can easily plan your next adventure with just a few clicks.
                            </p>
                            </div>
                            <div className="senders_message-footer">
                                <p className="footer-p">Stephan</p>
                                <p className="footer-p">14:53</p>
                            </div>
                        </div>
                        <div className="users_message">
                            <div className="users_message-body">
                            <p>Introducing our new travel planning tool! </p>
                            </div>
                            <div className="users_message-footer">
                                <p className="footer-p">You</p>
                                <p className="footer-p">14:56</p>
                            </div>
                        </div>
                    <div className="chat_input">
                        <button onClick={() => console.log("this is working")}>
                            <SendMessageIcon />
                        </button>
                        <input type="text" placeholder="Enter your message" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
};

