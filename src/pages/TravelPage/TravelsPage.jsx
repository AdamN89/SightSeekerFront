import "./TravelsPage.css";
import CloseIcon from "../../components/CloseIcon";
import { useContext, useRef } from "react";
import TravelSearchBar from "./TravelSearchBar";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import AuthorIcon from "../../components/AuthorIcon";

export default function TravelPage() {
  const { closeMenu, closeTopMenu } = useContext(DataContext);
  const trevelRef = useRef(null);
  const navigate = useNavigate();

  return {
    trevelRef,
    renderTravelPage: (
      <>
        <div className="navigation_wrapper">
          <div
            ref={trevelRef}
            className="navigation_wrapper_body navigaton_page_not_visible"
          >
            <div className="navigation_wrapper_body_header">
              <h1 className="title">Travel Plans</h1>
              <button
                className="navigation_close_btn"
                onClick={() => {
                  closeMenu(trevelRef);
                  closeTopMenu();
                }}
              >
                <CloseIcon />
              </button>
            </div>
            <TravelSearchBar />
            {/* start of content of navigation page */}
            <div className="navigation_wrapper_body_content">
              <Button
                txt={"Create new travel plan"}
                func={() => navigate("/createtravelplan")}
                key="createtravelplan"
              />
              <div className="travel_plans">
                <span>Travel plan name</span>
                <AuthorIcon />
              </div>
              <div className="travel_plans">
                <span>Travel plan name</span>
              </div>
              <div className="travel_plans">
                <span>Travel plan name</span>
              </div>
              <div className="travel_plans">
                <span>Travel plan name</span>
                <AuthorIcon />
              </div>
            </div>
            {/* end of content of navigation page */}
          </div>
        </div>
      </>
    ),
  };
}
