import { useState, useRef } from "react"
import "./Chat.css"
import CloseIcon from "../TopMenu/Icons/CloseIcon"

export default function Chat() {

    const [isOpen, setIsOpen ] = useState(false)
    const menuRef = useRef(null)

    const openMenu = () => {
      menuRef.current.classList.add("opening")
      setIsOpen(!isOpen)
      setTimeout(() => {
        menuRef.current.classList.remove("opening")
      }, 500)
      console.log("click is working")
    }

    const closeMenu = () => {
      menuRef.current.classList.add("closing")
      setTimeout(() => {
        setIsOpen(!isOpen)
        menuRef.current.classList.remove("closing")
      }, 700)
    }

  return (
    <div>
      <button onClick={openMenu}>Open the modal</button> <button onClick={closeMenu}>Close Modal</button>
      <div className="lol">
          <div>
            This just some text
            This just some text
            This just some text
            This just some text
            This just some text
            This just some text
          </div>
          <div>
            This just some text
            This just some text
            This just some text
            This just some text
            This just some text
            This just some text
          </div>
          <div>
            This just some text
            This just some text
            This just some text
            This just some text
            This just some text
            This just some text
          </div>
      </div>

      <div className="topmenu__body-wrapper" ref={menuRef} style={{ opacity: isOpen ? 2 : 0 }}>
          <div className="topmenu__body_header">
            <img src="../../assets/defaultavatar/09.jpg" alt="user-img" />
            <button onClick={closeMenu}><CloseIcon /></button>
          </div>
          <div className="topmenu__body_body">
                <div>
                    This IS EVEN MORE TEXT ON THE MODAL
                    This IS EVEN MORE TEXT ON THE MODAL
                    This IS EVEN MORE TEXT ON THE MODAL
                    This IS EVEN MORE TEXT ON THE MODAL
                    This IS EVEN MORE TEXT ON THE MODAL
                    This IS EVEN MORE TEXT ON THE MODAL
                </div>
          </div>
            <div className="topmenu__body_footer">
          </div>
        </div>



    </div>
  )
};

