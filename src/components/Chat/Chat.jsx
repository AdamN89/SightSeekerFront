import { useState, useRef } from "react"
import "./Chat.css"
import CloseIcon from "../TopMenu/Icons/CloseIcon"
import SearchBar from "../SearchBar"
import Button from "../Button"
import ChatImage from "./ChatImage"

export default function Chat() {

    const [isOpen, setIsOpen ] = useState(false)
    const menuRef = useRef(null)

    // Take this code and paste it to open the modal. Don't forget to import deps.
    const openMenu = () => {
      menuRef.current.classList.add("chatopening")
      setIsOpen(!isOpen)
      setTimeout(() => {
        menuRef.current.classList.remove("chatopening")
      }, 500)
      console.log("click is working")
    }
    // -------------------------------------------------------------------------//
    const closeMenu = () => {
      menuRef.current.classList.add("chatclosing")
      setTimeout(() => {
        setIsOpen(!isOpen)
        menuRef.current.classList.remove("chatclosing")
      }, 700)
    }

  return (
    <div className="chat__wrapper">
      {/* <button onClick={openMenu}>Open the modal</button> <button onClick={closeMenu}>Close Modal</button> */}
        <div className="chat__body-wrapper" ref={menuRef} style={{ opacity: isOpen ? 2 : 0 }}>
          <div className="chat__body_header">
            <h1>Chats</h1>
            <button onClick={closeMenu}><CloseIcon /></button>
        </div>
        <SearchBar />
        <div className="chat__body_body">
            <Button txt={"CREATE GROUP CHAT"} />
            <div className="groupchat">
                <div className="groupchat-content">
                    <div className="groupchat-name">My group chat</div>
                    <div className="groupchat-members">Stephan, Puri, Miro</div>
                </div>
                <div className="groupchat-graphic"><ChatImage/></div>
            </div>
            <div className="groupchat">
                <div className="groupchat-content">
                    <div className="groupchat-name">My group chat</div>
                    <div className="groupchat-members">Stephan, Puri, Miro</div>
                </div>
                <div className="groupchat-graphic"><ChatImage/></div>
            </div>
            <div className="groupchat">
                <div className="groupchat-content">
                    <div className="groupchat-name">My group chat</div>
                    <div className="groupchat-members">Stephan, Puri, Miro</div>
                </div>
                <div className="groupchat-graphic"><ChatImage/></div>
            </div>
            <div className="groupchat">
                <div className="groupchat-content">
                    <div className="groupchat-name">My group chat</div>
                    <div className="groupchat-members">Stephan, Puri, Miro</div>
                </div>
                <div className="groupchat-graphic"><ChatImage/></div>
            </div>
        </div>
        </div>
    </div>
  )
};

