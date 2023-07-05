import { useState, useContext, useEffect } from "react";
import CloseIcon from "../../components/CloseIcon";
import DeleteIcon from "../../components/DeleteIcon";
import TopMenu from "../../components/TopMenu/TopMenu";
import { AuthContext } from "../../context/AuthContext";
import MapContent from "../../components/Map/MapContent";
import "../HomePage/HomePage.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "./TravelsPage.css";
import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import UpArrow from "../../components/UpArrow";
import DownArrow from "../../components/DownArrow";
import CalendarIcon from "../../components/CalendarIcon";
import RoadIcon from "../../components/RoadIcon";
import ClockIcon from "../../components/ClockIcon";
import Button from "../../components/Button";

export default function PlanTravel() {
  const { user, backendURL, token, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userCoords, setUserCoords] = useState({});
  const [viewState, setViewState] = useState({
    longitude: 13.540060456464587,
    latitude: 52.45685631705479,
    zoom: 15,
  });
  const [currentPoints, setCurrentPoints] = useState(null);
  const [travelName, setTravelName] = useState(null);
  const [currentPointObjs, setCurrentPointObjs] = useState(null);

  const [allSelectedPoints, setAllSelectedPoints] = useState([]);
  const [pointToDelete, setPointToDelete] = useState(null);
  const [routeData, setRouteData] = useState(null);

  const { id } = useParams();

  // console.log("current plan", currentPoints);
  useEffect(() => {
    console.log(user);
    if (!user) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setViewState({
          ...viewState,
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          zoom: 12,
        });
        setUserCoords({
          ...userCoords,
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          zoom: 12,
        });
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
    setCurrentPoints(
      user.travelPlans.find((plan) => plan._id === id).selectedPoints
    );
    setTravelName(user.travelPlans.find((plan) => plan._id === id).name);
  }, [user]);

  const getCurrentPointObjects = async () => {
    // console.log("getPoints fired");
    try {
      const res = await fetch(`${backendURL}/point/getMultiplePoints`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ids: currentPoints }),
      });
      const data = await res.json();
      // setAllSelectedPoints(data.data);
      setCurrentPointObjs(data.data);
      setViewState({
        ...viewState,
        longitude: data[0].coords[0],
        latitude: data[0].coords[1],
        zoom: 12,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentPoints?.length > 0) getCurrentPointObjects();
  }, [currentPoints]);
  // console.log("all selected points", allSelectedPoints);
  // console.log("current points", currentPointObjs);

  const deletePoint = (point) => {
    setPointToDelete(point);
  };

  const moveUp = (index) => {
    if (index !== 0)
      setAllSelectedPoints((prev) => [
        ...prev.slice(0, index - 1),
        prev[index],
        prev[index - 1],
        ...prev.slice(index + 1, prev.length),
      ]);
  };

  const moveDown = (index) => {
    if (index !== allSelectedPoints.length - 1)
      setAllSelectedPoints((prev) => [
        ...prev.slice(0, index),
        prev[index + 1],
        prev[index],
        ...prev.slice(index + 2, prev.length),
      ]);
  };
  // console.log(allSelectedPoints);

  const saveCurrentRoute = async () => {
    console.log(allSelectedPoints);

    const idsOnly = allSelectedPoints.map((point) => point._id);
    try {
      const res = await fetch(`${backendURL}/travelplan/savePoints/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ points: idsOnly }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.data);
        console.log(data.data);
        setAllSelectedPoints([]);
        setCurrentPointObjs(null);
        setCurrentPoints(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("all selected Points: ", allSelectedPoints);
  return (
    <>
      {/* <TopMenu /> */}
      <div className="plan_travel_header">
        <div className="plan_travel_header_data">
          <h1 className="title">{travelName}</h1>
          {routeData ? (
            <div>
              <span>
                <CalendarIcon /> 19.08.2023 - 01.09.2023
              </span>
              <span>
                <ClockIcon />
                {routeData.duration / 60 > 60
                  ? `${(routeData.duration / 3600).toFixed(1)}h`
                  : `${(routeData.duration / 60).toFixed(1)}mins`}
              </span>
              <span>
                <RoadIcon />
                {(routeData.distance / 1000).toFixed(2)}km
              </span>
            </div>
          ) : null}
        </div>
        <div className="plan_travel_close_btn" onClick={() => navigate("/")}>
          <CloseIcon />
        </div>
      </div>
      <div className="plan_travel">
        <MapContent
          viewState={viewState}
          setViewState={setViewState}
          userCoords={userCoords}
          parent={"PlanTravel"}
          customPointObjs={currentPointObjs}
          setParentPoints={setAllSelectedPoints}
          allSelectedPoints={allSelectedPoints}
          setPointToDelete={setPointToDelete}
          pointToDelete={pointToDelete}
          setRouteData={setRouteData}
        />
        {/* <input type="text" placeholder="search places" /> */}
        <div className="plan_travel_container">
          <SearchBar viewState={viewState} userCoords={userCoords} />
          {allSelectedPoints.length > 0 && (
            <div className="plan_travel_pois">
              {allSelectedPoints && allSelectedPoints?.length > 0
                ? allSelectedPoints.map((point, index, arr) => (
                    <div className="plan_travel_poi">
                      <span>{point.name ? point.name : point.address}</span>
                      <div className="plan_travel_poi_buttons">
                        {/* {index !== 0 && ( */}
                        <button
                          className="plan_travel_poi_arrow"
                          onClick={() => moveUp(index)}
                        >
                          <UpArrow />
                        </button>
                        {/* )} */}
                        {/* {index !== arr.length - 1 && ( */}
                        <button
                          className="plan_travel_poi_arrow"
                          onClick={() => moveDown(index)}
                        >
                          <DownArrow />
                        </button>
                        {/* )} */}
                        <button
                          className="plan_travel_poi_button"
                          onClick={() => deletePoint(point)}
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          )}
        </div>
        <div className="plan_travel_save_btn">
          <Button txt={"save"} func={saveCurrentRoute} key="savetravel plan" />
        </div>
      </div>
    </>
  );
}
