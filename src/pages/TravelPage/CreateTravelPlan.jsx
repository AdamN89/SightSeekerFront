import "./TravelsPage.css";
import { useNavigate } from "react-router";
import CloseIcon from "../../components/CloseIcon";
import Button from "../../components/Button";
import MapContent from "../../components/Map/MapContent";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function CreateTravelPlan() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userCoords, setUserCoords] = useState({});
  const [viewState, setViewState] = useState({
    longitude: 13.540060456464587,
    latitude: 52.45685631705479,
    zoom: 15,
  });

  useEffect(() => {
    if (!user) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setViewState({
          ...viewState,
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          zoom: 9,
        });
        setUserCoords({
          ...userCoords,
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          zoom: 9,
        });
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }, [user]);

  return (
    <div className="container create_travel_plan">
      <button
        className="create_travel_plan_close_btn"
        onClick={() => navigate("/home")}
      >
        <CloseIcon />
      </button>
      <h1 className="title">Create Plan</h1>
      <div className="first_element">
        <form className="create_travel_plan_form">
          <input type="text" placeholder="travel plan name" />
          <div className="create_travel_plan_time">
            <input type="date" placeholder="start date" />
            <input type="date" placeholder="end date" />
          </div>
          {/* <input type="text" placeholder="search places" /> */}
          <input type="text" placeholder="add members" />
          <input type="text" placeholder="select from your bookmarks" />
        </form>
      </div>
      <div className="second_element">
        <h4>Select from Map</h4>
        <div className="create_travel_plan_map">
          <MapContent
            viewState={viewState}
            setViewState={setViewState}
            userCoords={userCoords}
            parent={"CreateTravelPlan"}
          />
        </div>
        <Button txt={"Create travel plan"} func={""} key="createtravelplan" />
      </div>
    </div>
  );
}
