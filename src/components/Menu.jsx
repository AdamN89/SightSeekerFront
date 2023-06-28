import TravelsPage from "../pages/TravelPage/TravelsPage";
import FavoritesPage from "../pages/FavoritePage/FavoritesPage";
import Chat from "../components/Chat/Chat";
import TravelPlanIcon from "./NavigationIcons/TravelPlanIcon";
import FavouritesIcon from "./NavigationIcons/FavouritesIcon";
import FriendsIcon from "./NavigationIcons/FriendsIcon";
import SettingsIcon from "./NavigationIcons/SettingsIcon";
import SearchIcon from "./NavigationIcons/SearchIcon";
import SearchBar from "./SearchBar";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import FriendsPage from "../pages/FriendsPage/FriendsPage";
import ChatIcon from "./NavigationIcons/ChatIcon";

export default function Menu({ getUUID, viewState, userCoords }) {
  const { user } = useContext(AuthContext);
  const [showSearchbar, setShowSearchbar] = useState(false);

  const navigate = useNavigate();
  const { openMenu, openTopMenu, closeTopMenu } = useContext(DataContext);
  const { renderTravelPage, trevelRef } = TravelsPage();
  const { renderFavoritesPage, favoritesRef } = FavoritesPage();
  const { renderFriendsPage, friendsRef } = FriendsPage();
  const { renderChatsPage, chatsRef } = Chat();
  const [tablet, setTablet] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) =>
        e.matches ? setTablet(true) : setTablet(false)
      );
  }, []);

  return (
    <>
      <nav className="main_menu">
        <div className="main_menu_left">
          <button className="main_menu_btn" onClick={() => openMenu(trevelRef)}>
            <TravelPlanIcon />
          </button>
          <button
            className="main_menu_btn"
            onClick={() => openMenu(favoritesRef)}
          >
            <FavouritesIcon />
          </button>
        </div>
        {tablet ? (
          <button
            className="main_menu_btn"
            onClick={() => openMenu(friendsRef)}
          >
            <FriendsIcon />
          </button>
        ) : null}
        <button className="main_menu_avatar">
          {user ? (
            <img src={user.avatar} alt={user.name} />
          ) : (
            <img src="../assets/defaultavatar/01.jpg" alt="avatar" />
          )}
        </button>
        <div className="main_menu_right">
          <button className="main_menu_btn" onClick={() => openMenu(chatsRef)}>
            <ChatIcon />
          </button>
          {tablet ? (
            <button
              className="main_menu_btn"
              onClick={() => navigate("/settings")}
            >
              <SettingsIcon />
            </button>
          ) : null}
          <button
            className="main_menu_btn"
            onClick={() => setShowSearchbar((prev) => !prev)}
          >
            <SearchIcon />
          </button>
        </div>
        {showSearchbar && (
          <div className="main_menu_searchbar-wrapper">
            <SearchBar
              getUUID={getUUID}
              viewState={viewState}
              userCoords={userCoords}
            />
          </div>
        )}
      </nav>
      {renderTravelPage}
      {renderFavoritesPage}
      {renderFriendsPage}
      {renderChatsPage}
      <div className="main_menu_bg"></div>
    </>
  );
}
