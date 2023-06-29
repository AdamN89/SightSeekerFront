import "./FavoritesPage.css";
import { useContext, useRef } from "react";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import CloseIcon from "../../components/CloseIcon";
import FavoritesSearchBar from "./FavoritesSearchBar";
import Button from "../../components/Button";
import DeleteIcon from "../../components/DeleteIcon";

export default function FavoritesPage() {
  const { closeMenu, isOpen, closeTopMenu } = useContext(DataContext);
  const favoritesRef = useRef(null);
  const navigate = useNavigate();

  return {
    favoritesRef,
    renderFavoritesPage: (
      <>
        <div
          className="navigation_wrapper"
          // style={{
          //   transform: isOpen ? `translateY(${0}px)` : `translateY(${-1000}px)`,
          // }}
        >
          <div
            className="navigation_wrapper_body navigaton_page_not_visible"
            ref={favoritesRef}
            // style={{ opacity: isOpen ? 2 : 0 }}
          >
            <div className="navigation_wrapper_body_header">
              <h1 className="title">Favorites</h1>
              <button
                className="navigation_close_btn"
                onClick={() => {
                  closeMenu(favoritesRef);
                  closeTopMenu();
                }}
              >
                <CloseIcon />
              </button>
            </div>
            <FavoritesSearchBar />
            {/* start of content of navigation page */}
            <div className="navigation_wrapper_body_content">
              <Button
                txt={"add favorite"}
                func={() => navigate("/addfavorite")}
                key="addfavorite"
              />
              <div className="favorites_page">
                <span>My favorite plase</span>
                <div className="favorites_page_icons">
                  <DeleteIcon />
                </div>
              </div>
              <div className="favorites_page">
                <span>My favorite plase</span>
                <div className="favorites_page_icons">
                  <DeleteIcon />
                </div>
              </div>
              <div className="favorites_page">
                <span>My favorite plase</span>
                <div className="favorites_page_icons">
                  <DeleteIcon />
                </div>
              </div>
            </div>
            {/* end of content of navigation page */}
          </div>
        </div>
      </>
    ),
  };
}
