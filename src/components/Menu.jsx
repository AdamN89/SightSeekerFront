import Chat from "../components/Chat/Chat";
// import Chat from "../pages/Chat/chat"
import TravelPlanIcon from "./NavigationIcons/TravelPlanIcon";
import FavouritesIcon from "./NavigationIcons/FavouritesIcon";
import FriendsIcon from "./NavigationIcons/FriendsIcon";
import SettingsIcon from "./NavigationIcons/SettingsIcon";
import SearchIcon from "./NavigationIcons/SearchIcon";

export default function Menu({ user }) {
  return (
    <>
      <nav className="main_menu_smartphone">
        <div className="main_menu_left">
          <button className="main_menu_btn">
            <TravelPlanIcon />
          </button>
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
          <button className="main_menu_btn">
            <SearchIcon />
          </button>
        </div>
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
          <button className="main_menu_btn">
            <SearchIcon />
          </button>
        </div>
      </nav>
      <div className="main_menu_bg"></div>
    </>
  );
}
