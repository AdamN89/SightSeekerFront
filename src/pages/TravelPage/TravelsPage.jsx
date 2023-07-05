import "./TravelsPage.css";
import CloseIcon from "../../components/CloseIcon";
import { useContext, useRef } from "react";
import TravelSearchBar from "./TravelSearchBar";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import AuthorIcon from "../../components/AuthorIcon";
import { AuthContext } from "../../context/AuthContext";
import EditIcon from "../../components/EditIcon";

export default function TravelPage() {
  const { closeMenu, closeTopMenu } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const trevelRef = useRef(null);
  const navigate = useNavigate();
  // console.log(user);

  const openTravelplan = (plan) => {
    //navigate(`/travelplan/open/${plan._id}`)
    console.log("plan");
  };

  const handleEditTravelplan = (e, plan) => {
    navigate(`/travelplan/edit/${plan._id}`);
  };

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
            {/* <TravelSearchBar /> */}
            {/* start of content of navigation page */}
            <div className="navigation_wrapper_body_content">
              <Button
                txt={"Create new travel plan"}
                func={() => navigate("/createtravelplan")}
                key="createtravelplan"
              />
              {user?.travelPlans?.map((plan) => {
                return (
                  <div className="travel_plans">
                    <span
                      className="travel_plans_span"
                      onClick={() => navigate(`/plantravel/${plan._id}`)}
                    >
                      {plan.name}
                    </span>
                    <button onClick={(e) => handleEditTravelplan(e, plan)}>
                      <EditIcon />
                    </button>
                  </div>
                );
              })}
            </div>
            {/* end of content of navigation page */}
          </div>
        </div>
      </>
    ),
  };
}
