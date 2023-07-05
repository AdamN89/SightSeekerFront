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

export default function PlanTravel() {
  const { user, backendURL, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userCoords, setUserCoords] = useState({});
  const [viewState, setViewState] = useState({
    longitude: 13.540060456464587,
    latitude: 52.45685631705479,
    zoom: 15,
  });
  const [currentPoints, setCurrentPoints] = useState(null);
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
  console.log(allSelectedPoints);

  return (
    <>
      {/* <TopMenu /> */}
      <div className="plan_travel_header">
        <h1>Travel plan name</h1>
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
        <SearchBar viewState={viewState} userCoords={userCoords} />
        {allSelectedPoints.length > 0 && (
          <div className="plan_travel_pois">
            {allSelectedPoints && allSelectedPoints?.length > 0
              ? allSelectedPoints.map((point, index, arr) => (
                  <div className="plan_travel_poi">
                    <span>{point.name ? point.name : point.address}</span>
                    <div className="plan_travel_poi_buttons">
                      {/* {index !== 0 && ( */}
                      <button onClick={() => moveUp(index)}>Up</button>
                      {/* )} */}
                      {/* {index !== arr.length - 1 && ( */}
                      <button onClick={() => moveDown(index)}>Down</button>
                      {/* )} */}
                      <button onClick={() => deletePoint(point)}>
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                ))
              : null}
          </div>
        )}
        {routeData ? (
          <div>
            <span>
              {routeData.duration / 60 > 60
                ? `~${(routeData.duration / 3600).toFixed(1)}hrs 🚗`
                : `~${(routeData.duration / 60).toFixed(1)}mins 🚗`}
            </span>
            <span>~{(routeData.distance / 1000).toFixed(2)}km</span>
          </div>
        ) : null}
      </div>
    </>
  );
}
