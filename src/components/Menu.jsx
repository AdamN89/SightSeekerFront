import TravelsPage from "../pages/TravelPage/TravelsPage";

import Chat from "../components/Chat/Chat";
import TravelPlanIcon from "./NavigationIcons/TravelPlanIcon";
import FavouritesIcon from "./NavigationIcons/FavouritesIcon";
import FriendsIcon from "./NavigationIcons/FriendsIcon";
import SettingsIcon from "./NavigationIcons/SettingsIcon";
import SearchIcon from "./NavigationIcons/SearchIcon";
import SearchBar from "./SearchBar";
import { AuthContext } from "../context/AuthContext";
import { useState, useContext } from "react";

export default function Menu({ getUUID, viewState }) {
  const { user } = useContext(AuthContext);
  const [showSearchbar, setShowSearchbar] = useState(false);
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

  const navigate = useNavigate();
  const { openMenu, openTopMenu, closeTopMenu } = useContext(DataContext);
  const { renderTravelPage, menuRef } = TravelsPage();

  return (
    <>
      <nav className="main_menu_smartphone">
        <div className="main_menu_left">
          <button className="main_menu_btn" onClick={() => openMenu(menuRef)}>
            <TravelPlanIcon />
          </button>
          {renderTravelPage}
          <button className="main_menu_btn">
            <FavouritesIcon />
          </button>
        </div>
        <button className="main_menu_avatar">
          {user ? (
            <img src={user.avatar} alt={user.name} />
          ) : (
            <img src="../assets/defaultavatar/01.jpg" alt="avatar" />
          )}
        </button>
        <div className="main_menu_right">
          <Chat />
          <button
            className="main_menu_btn"
            onClick={() => setShowSearchbar((prev) => !prev)}
          >
            <SearchIcon />
          </button>
        </div>
        {showSearchbar && (
          <div className="main_menu_searchbar-wrapper">
            <SearchBar />
          </div>
        )}
      </nav>
      {/* menu for tablet screen */}
      <nav className="main_menu_tablet">
        <div className="main_menu_left">
          <button className="main_menu_btn">
            <TravelPlanIcon />
          </button>
          <button className="main_menu_btn">
            <FavouritesIcon />
          </button>
          <button className="main_menu_btn">
            <FriendsIcon />
          </button>
        </div>
        <button className="main_menu_avatar">
          {user ? (
            <img src={user.avatar} alt={user.name} />
          ) : (
            <img src="../assets/defaultavatar/01.jpg" alt="avatar" />
          )}
        </button>
        <div className="main_menu_right">
          <Chat />
          <button className="main_menu_btn">
            <SettingsIcon />
          </button>
          <button
            className="main_menu_btn"
            onClick={() => setShowSearchbar((prev) => !prev)}
            // onClick={handleSearchButtonClick}
          >
            <SearchIcon />
          </button>
        </div>
        {showSearchbar && (
          <div className="main_menu_searchbar-wrapper">
            <SearchBar getUUID={getUUID} viewState={viewState} />
          </div>
        )}
      </nav>
      <div className="main_menu_bg"></div>
    </>
  );
}
