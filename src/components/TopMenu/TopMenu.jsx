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
import { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import TravelsPage from "../../pages/TravelPage/TravelsPage";
import { DataContext } from "../../context/DataContext";

export default function TopMenu() {
  const {
    openMenu,
    closeMenu,
    openTopMenu,
    closeTopMenu,
    isOpenTopMenu,
    topMenuRef,
  } = useContext(DataContext);
  const { renderTravelPage, menuRef } = TravelsPage();

  return (
    <div className="topmenu__wrapper">
      <div className="topmenu__topbar">
        <div id="logo">
          <LogoHorizontal />
        </div>
        <button
          onClick={() => {
            openTopMenu();
            closeMenu(menuRef);
          }}
          style={{ zIndex: isOpenTopMenu ? 0 : 3 }}
        >
          <MenuIcon />
        </button>
      </div>
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
              openMenu(menuRef);
              closeTopMenu();
            }}
          >
            <TravelPlan />
            <span>TravelPlan</span>
          </Link>
          {renderTravelPage}
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
