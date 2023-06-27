import "./TravelsPage.css";
import TravelPlanIcon from "../../components/NavigationIcons/TravelPlanIcon";
import CloseIcon from "../../components/CloseIcon";
import { useContext, useRef, useState } from "react";
import TravelSearchBar from "./TravelSearchBar";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";

export default function TravelPage() {
  const { openMenu, closeMenu, isOpen, openTopMenu, closeTopMenu } =
    useContext(DataContext);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  console.log(menuRef.current);

  // const openMenu = () => {
  //   if (isOpen === false)
  //     menuRef.current.classList.add("navigaton_page_opening");
  //   setIsOpen(!isOpen);
  //   setTimeout(() => {
  //     menuRef.current.classList.remove("navigaton_page_opening");
  //   }, 500);
  //   console.log("click is working");
  // };

  // const closeMenu = () => {
  //   menuRef.current.classList.add("navigaton_page_closing");
  //   setTimeout(() => {
  //     setIsOpen(!isOpen);
  //     menuRef.current.classList.remove("navigaton_page_closing");
  //   }, 700);
  // };

  return {
    menuRef,
    renderTravelPage: (
      <>
        <div
          className="navigation_wrapper"
          style={{
            transform: isOpen ? `translateY(${0}px)` : `translateY(${-1000}px)`,
          }}
        >
          <div
            className="navigation_wrapper_body"
            ref={menuRef}
            style={{ opacity: isOpen ? 2 : 0 }}
          >
            <div className="navigation_wrapper_body_header">
              <h1 className="title">Travel Plans</h1>
              <button
                className="navigation_close_btn"
                onClick={() => {
                  closeMenu(menuRef);
                  closeTopMenu();
                }}
              >
                <CloseIcon />
              </button>
            </div>
            <TravelSearchBar />
            {/* start of content of navigation page */}
            <Button
              txt={"Create new travel plan"}
              func={() => navigate("/login")}
              key="login"
            />
            <div className="travel_plan">
              <span></span>
              <div className="travel_plan_author"></div>
            </div>
            {/* end of content of navigation page */}
          </div>
        </div>
      </>
    ),
  };
}
