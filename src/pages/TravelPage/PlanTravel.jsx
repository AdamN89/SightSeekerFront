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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
    console.log("getPoints fired");
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
  console.log("all selected points", allSelectedPoints);
  // console.log("current points", currentPointObjs);
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
          parent={"CreateTravelPlan"}
          customPointObjs={currentPointObjs}
          setParentPoints={setAllSelectedPoints}
        />
        <input type="text" placeholder="search places" />
        <div className="plan_travel_pois">
          {allSelectedPoints && allSelectedPoints?.length > 0
            ? allSelectedPoints.map((point) => (
                <div className="plan_travel_poi">
                  <span>{point.name ? point.name : point.address}</span>
                  <button>
                    <DeleteIcon />
                  </button>
                </div>
              ))
            : null}
          {/* <div className="plan_travel_poi">
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
          </div> */}
        </div>
      </div>
    </>
  );
}
