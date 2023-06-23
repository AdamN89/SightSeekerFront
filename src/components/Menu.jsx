import Chat from "../components/Chat/Chat"
import { useState, useRef } from "react"

export default function Menu({ user }) {

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
  return (
    <nav className="main-menu">
      <button className="main-menu__btn"></button>
      <button className="main-menu__btn"></button>
      <button className="main-menu__avatar">
        {user ? (
          <img src={user.avatar} alt={user.name} />
        ) : (
          <img src="../assets/defaultavatar/01.jpg" alt="avatar" />
        )}
      </button>
      <button className="main-menu__btn" onClick={openMenu}><Chat /></button>
      <button className="main-menu__btn"></button>
    </nav>
  );
}
