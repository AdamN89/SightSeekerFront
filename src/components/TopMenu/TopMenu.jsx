import "./TopMenu.css";
import LogoHorizontal from "../LogoHorizontal";
import MenuIcon from "../MenuIcon";
import TravelPlan from "./Icons/TravelPlanIcon";
import FavouritesIcon from "./Icons/FavouritesIcon";
import FriendsIcon from "./Icons/FriendsIcon";
import ChatIcon from "./Icons/ChatIcon";
import SettingsIcon from "./Icons/SettingsIcon";
import AboutIcon from "./Icons/AboutIcon";
import CloseIcon from "./Icons/CloseIcon";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function TopMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const openMenu = () => {
    menuRef.current.classList.add("opening");
    setIsOpen(!isOpen);
    setTimeout(() => {
      menuRef.current.classList.remove("opening");
    }, 500);
    console.log("click is working");
  };

  const closeMenu = () => {
    menuRef.current.classList.add("closing");
    setTimeout(() => {
      setIsOpen(!isOpen);
      menuRef.current.classList.remove("closing");
    }, 700);
  };

  return (
    <div className="topmenu__wrapper">
      <div className="topmenu__topbar">
        <div id="logo">
          <LogoHorizontal />
        </div>
        <button onClick={openMenu} style={{ zIndex: isOpen ? 0 : 3 }}>
          <MenuIcon />
        </button>
      </div>
      <div
        className="topmenu__body-wrapper"
        ref={menuRef}
        style={{
          opacity: isOpen ? 2 : 0,
          transform: isOpen ? `translateY(${0}px)` : `translateY(${-1500}px)`,
        }}
      >
        <div className="topmenu__body_header">
          <div className="topmenu__body_header_user">
            <img src="../../assets/defaultavatar/09.jpg" alt="user-img" />
            <span>Name Lastname</span>
          </div>
          <button onClick={closeMenu}>
            <CloseIcon />
          </button>
        </div>
        <div className="topmenu__body_body">
          <Link to="/">
            <TravelPlan />
            <span>TravelPlan</span>
          </Link>
          <Link to="/">
            <FavouritesIcon />
            <span>Favourites</span>
          </Link>
          <Link to="/friends">
            <FriendsIcon />
            <span>Friends</span>
          </Link>
          <Link t0="/">
            <ChatIcon />
            <span>Chat</span>
          </Link>
          <Link to="/settings">
            <SettingsIcon />
            <span>Settings</span>
          </Link>
          <Link to="/about">
            <AboutIcon />
            <span>About</span>
          </Link>
        </div>
        <div className="topmenu__body_footer">
          <LogoHorizontal />
        </div>
      </div>
    </div>
  );
}
