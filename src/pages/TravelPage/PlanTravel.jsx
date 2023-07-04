import { useState, useContext, useEffect } from "react";
import CloseIcon from "../../components/CloseIcon";
import DeleteIcon from "../../components/DeleteIcon";
import TopMenu from "../../components/TopMenu/TopMenu";
import { AuthContext } from "../../context/AuthContext";
import MapContent from "../../components/Map/MapContent";
import "../HomePage/HomePage.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "./TravelsPage.css";

export default function PlanTravel() {
  const { user } = useContext(AuthContext);

  const [userCoords, setUserCoords] = useState({});
  const [viewState, setViewState] = useState({
    longitude: 13.540060456464587,
    latitude: 52.45685631705479,
    zoom: 15,
  });

  useEffect(() => {
    console.log(user);
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
    <>
      {/* <TopMenu /> */}
      <div className="plan_travel_header">
        <h1>Travel plan name</h1>
        <div className="plan_travel_close_btn">
          <CloseIcon />
        </div>
      </div>
      <div className="plan_travel">
        <MapContent
          viewState={viewState}
          setViewState={setViewState}
          userCoords={userCoords}
          parent={"CreateTravelPlan"}
        />
        <input type="text" placeholder="search places" />
        <div className="plan_travel_pois">
          <div className="plan_travel_poi">
            <span>poi name 01</span>
            <button>
              <DeleteIcon />
            </button>
          </div>
          <div className="plan_travel_poi">
            <span>poi name 02</span>
            <button>
              <DeleteIcon />
            </button>
          </div>
          <div className="plan_travel_poi">
            <span>poi name 03</span>
            <button>
              <DeleteIcon />
            </button>
          </div>
          <div className="plan_travel_poi">
            <span>poi name 04</span>
            <button>
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
