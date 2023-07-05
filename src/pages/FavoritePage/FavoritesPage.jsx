import "./FavoritesPage.css";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import CloseIcon from "../../components/CloseIcon";
import FavoritesSearchBar from "./FavoritesSearchBar";
import Button from "../../components/Button";
import DeleteIcon from "../../components/DeleteIcon";
import { useState, useEffect } from "react";

export default function FavoritesPage() {
  const { closeMenu, isOpen, closeTopMenu } = useContext(DataContext);
  const { token, user, backendURL } = useContext(AuthContext);

  const favoritesRef = useRef(null);
  const navigate = useNavigate();

  console.log(user);

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
              <h1 className="title">Bookmarks</h1>
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
            {/* start of content of navigation page */}
            <div className="favorites_wrapper_body_content">
              <div className="favorites_wrapper_body_content_row">
                <h2 className="subtitle">Filter displayed points on map</h2>
                <Button
                  txt={"Add Filter"}
                  func={() => navigate("/addfavorite")}
                  key="addfavorite"
                />
              </div>
              <div className="favorites_wrapper_body_content_row">
                <h2 className="subtitle">My Bookmarks</h2>
                {user?.favorites?.length > 0 &&
                  user?.favorites?.map((bookmark, index) => (
                    <div className="favorites_page">
                      <span>{bookmark?.name}</span>
                      <div className="favorites_page_icons">
                        <DeleteIcon />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {/* end of content of navigation page */}
          </div>
        </div>
      </>
    ),
  };
}
