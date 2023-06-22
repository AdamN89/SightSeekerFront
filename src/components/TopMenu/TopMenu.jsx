import "./TopMenu.css"
import LogoHorizontal from "../LogoHorizontal";
import MenuIcon from "../MenuIcon";
import TravelPlan from "./Icons/TravelPlanIcon";
import FavouritesIcon from "./Icons/FavouritesIcon"
import FriendsIcon from "./Icons/FriendsIcon"
import ChatIcon from "./Icons/ChatIcon"
import SettingsIcon from "./Icons/SettingsIcon"
import AboutIcon from "./Icons/AboutIcon"
import CloseIcon from "./Icons/CloseIcon";
import { useState } from "react";

export default function TopMenu() {
  const [isOpen, setIsOpen ] = useState(false)

    const openMenu = () => {
      setIsOpen(!isOpen)
      console.log("click is working")
    }

  return (
    <div className="topmenu__wrapper">
        <div className="topmenu__topbar">
            <LogoHorizontal />
            <button onClick={openMenu} style={{ zIndex: isOpen ? 1: 3 }}><MenuIcon /></button>
        </div>
        <div className="topmenu__body-wrapper" style={{ opacity: isOpen ? 2 : 0 }}>
          <div className="topmenu__body_header">
            <img src="../../assets/defaultavatar/09.jpg" alt="user-img" />
            <button onClick={openMenu}><CloseIcon /></button>
          </div>
          <div className="topmenu__body_body">
            <p><TravelPlan />TravelPlan</p>
            <p><FavouritesIcon />Favourites</p>
            <p><FriendsIcon />Friends</p>
            <p><ChatIcon />Chat</p>
            <p><SettingsIcon />Settings</p>
            <p><AboutIcon />About</p>
          </div>
            <div className="topmenu__body_footer">
            <LogoHorizontal />
          </div>
        </div>
    </div>
  )
};

