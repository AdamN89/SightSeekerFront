import "./TopMenu.css";
import LogoHorizontal from "../LogoHorizontal";
import MenuIcon from "../MenuIcon";
import TravelPlanIcon from "./Icons/TravelPlanIcon";
import FavouritesIcon from "./Icons/FavouritesIcon";
import FriendsIcon from "./Icons/FriendsIcon";
import ChatIcon from "./Icons/ChatIcon";
import SettingsIcon from "./Icons/SettingsIcon";
import AboutIcon from "./Icons/AboutIcon";
import CloseIcon from "./Icons/CloseIcon";
import { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import TravelsPage from "../../pages/TravelPage/TravelsPage";
import { DataContext } from "../../context/DataContext";
import Button from "../Button";
import LogoutIcon from "../LogoutIcon";
import { AuthContext } from "../../context/AuthContext";
import FavoritesPage from "../../pages/FavoritePage/FavoritesPage";
import FriendsPage from "../../pages/FriendsPage/FriendsPage";
import Chat from "../Chat/Chat";

export default function TopMenu() {
  const {
    openMenu,
    closeMenu,
    openTopMenu,
    closeTopMenu,
    isOpenTopMenu,
    topMenuRef,
  } = useContext(DataContext);
  const navigate = useNavigate();
  const { renderTravelPage, trevelRef } = TravelsPage();
  const { renderFavoritesPage, favoritesRef } = FavoritesPage();
  const { renderFriendsPage, friendsRef } = FriendsPage();
  const { renderChatsPage, chatsRef } = Chat();
  const { setToken, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    //navigate("/")
  };

  return (
    <>
      <div className="topmenu__wrapper">
        <div className="topmenu__topbar">
          <div id="logo">
            <LogoHorizontal />
          </div>
          <button
            onClick={() => {
              openTopMenu();
              console.log(1);
              closeMenu(trevelRef);
              console.log(2);
              closeMenu(favoritesRef);
              console.log(3);
            }}
            style={{ zIndex: isOpenTopMenu ? 0 : 3 }}
          >
            <MenuIcon />
          </button>
        </div>
        <button onClick={handleLogout} className="logout_btn">
          <LogoutIcon />
        </button>
        <div
          className="topmenu__body-wrapper"
          ref={topMenuRef}
          style={{
            opacity: isOpenTopMenu ? 2 : 0,
            transform: isOpenTopMenu
              ? `translateY(${0}px)`
              : `translateY(${-1500}px)`,
          }}
        >
          <div className="topmenu__body_header">
            <div className="topmenu__body_header_user">
              <img src="../../assets/defaultavatar/09.jpg" alt="user-img" />
              <span>Name Lastname</span>
            </div>
            <button onClick={closeTopMenu}>
              <CloseIcon />
            </button>
          </div>
          <div className="topmenu__body_body">
            <Link
              onClick={() => {
                openMenu(trevelRef);
                closeTopMenu();
              }}
            >
              <TravelPlanIcon />
              <span>TravelPlan</span>
            </Link>

            <Link
              onClick={() => {
                openMenu(favoritesRef);
                closeTopMenu();
              }}
            >
              <FavouritesIcon />
              <span>Favourites</span>
            </Link>
            <Link
              onClick={() => {
                openMenu(friendsRef);
                closeTopMenu();
              }}
            >
              <FriendsIcon />
              <span>Friends</span>
            </Link>
            <Link
              onClick={() => {
                openMenu(chatsRef);
                closeTopMenu();
              }}
            >
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
      {renderTravelPage}
      {renderFavoritesPage}
      {renderFriendsPage}
      {renderChatsPage}
    </>
  );
}
