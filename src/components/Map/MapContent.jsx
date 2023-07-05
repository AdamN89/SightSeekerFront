import Map, {
  Marker,
  Popup,
  NavigationControl,
  Layer,
  Source,
} from "react-map-gl";

import { AuthContext } from "../../context/AuthContext";
import { MapContext } from "../../context/MapContext";
// import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState, useRef, useContext, useMemo } from "react";
import MapMarker from "../MapMarker";
import { ThemeContext } from "../../context/ThemeContext";

export default function MapContent({
  viewState,
  setViewState,
  userCoords,
  parent = "home",
  customPointObjs = null,
  setParentPoints = null,
  pointToDelete = null,
  setPointToDelete = null,
  allSelectedPoints = null,
  setRouteData = null,
}) {
  const { user, setUser, backendURL, token } = useContext(AuthContext);
  const { lightMode } = useContext(ThemeContext);
  const { markers, retrieveByCoords, bookmarkPoint } = useContext(MapContext);
  const [userPointObject, setUserPointObject] = useState(null);
  const mapStyle = lightMode
    ? "mapbox://styles/stephanullmann/clj7lajvj005t01que278452b"
    : "mapbox://styles/stephanullmann/cljnybgvq00ii01pqglfgat0a";
  const navigationPreference = "driving";
  const areAlternativeRoutes = "false";
  const markerColors = [
    "#895392",
    "#02b3b4",
    "#741cb5",
    "#0c3e5a",
    "#0b3e3a",
    "#00a299",
    "#0b4e4a",
    "#92278f",
    "#662d91",
    "#00b394",
    "#743478",
    "#841cb5",
  ];
  // const [userCoords, setUserCoords] = useState({});
  // const [viewState, setViewState] = useState({
  //   longitude: 13.540060456464587,
  //   latitude: 52.45685631705479,
  //   zoom: 15,
  // });
  const [showPopup, setShowPopup] = useState(true);
  const [popupInfo, setPopupInfo] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationPopup, setRecommendationPopup] = useState(null);
  const [markerColorsState, setMarkerColorsState] = useState({});
  const [clickedMapPoint, setClickedMapPoint] = useState(null);
  const [directionsPoints, setDirectionsPoints] = useState([]);
  const [directionsData, setDirectionsData] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    setDirectionsPoints([]);
    if (!user) return;
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     setViewState({
    //       ...viewState,
    //       longitude: position.coords.longitude,
    //       latitude: position.coords.latitude,
    //       zoom: 15,
    //     });
    //     setUserCoords({
    //       ...userCoords,
    //       longitude: position.coords.longitude,
    //       latitude: position.coords.latitude,
    //       zoom: 15,
    //     });
    //   },
    //   (error) => {
    //     console.log(error);
    //   },
    //   { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    // );
    const markerColorsObj = user.settings.poi.reduce((acc, val, ind) => {
      return (acc[val] = markerColors[ind]), acc;
    }, {});
    setMarkerColorsState(markerColorsObj);
  }, [user]);

  const handleMapMove = (e) => {
    setViewState(e.viewState);
  };

  const handleMapClick = async (e) => {
    // console.log(e.lngLat);
    if (popupInfo || recommendationPopup) return;
    const poiObj = await retrieveByCoords([e.lngLat.lng, e.lngLat.lat]);
    setRecommendationPopup(poiObj);
    setClickedMapPoint(poiObj);
  };

  const fetchRecommendations = async () => {
    const userPreferences = user.settings.poi;
    const fetchPromises = userPreferences.map(async (preference) => {
      try {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${preference}.json?type=poi&proximity=${userCoords.longitude},${userCoords.latitude}&limit=4&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
        );
        const data = await res.json();
        // console.log("recommendations: ", data);
        return data.features
          .filter((recommendation) => recommendation.place_type.includes("poi"))
          .map((recommendation) => ({
            name: recommendation.place_name.split(",")[0],
            address: recommendation.place_name
              .split(",")
              .slice(1)
              .join(",")
              .trim(),
            coords: recommendation.center,
            preference,
          }));
      } catch (error) {
        setError(error);
        return [];
      }
    });
    try {
      const allRecommendations = await Promise.allSettled(fetchPromises);
      const flattenedRecommendations = allRecommendations.flatMap((rec) => {
        if (rec.status === "fulfilled") return rec.value;
        else return [];
      });
      setRecommendations(flattenedRecommendations);
    } catch (error) {
      setError(error);
    }
  };

  const selectedMarkers = useMemo(
    () =>
      markers?.length
        ? markers.map((marker) =>
            marker.coords.length === 2 ? (
              <>
                <Marker
                  key={marker.address + "-selected"}
                  longitude={marker.coords[0]}
                  latitude={marker.coords[1]}
                  anchor="bottom"
                  onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    setPopupInfo(marker);
                  }}
                >
                  <MapMarker fill={"#13c397"} />
                </Marker>
              </>
            ) : null
          )
        : null,
    [markers]
  );
  const recommendationMarkers = useMemo(
    () =>
      recommendations?.length
        ? recommendations.map((marker) =>
            marker.coords.length === 2 ? (
              <Marker
                className="recommendation-marker"
                key={marker.address + "-recommendations"}
                longitude={marker.coords[0]}
                latitude={marker.coords[1]}
                anchor="bottom"
                // offset={[-5, -15]}
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  setRecommendationPopup(marker);
                }}
              >
                <MapMarker fill={markerColorsState[marker.preference]} />
              </Marker>
            ) : null
          )
        : null,
    [recommendations]
  );

  const userFavoritesMarkers = useMemo(
    () =>
      user && user?.favorites?.length
        ? user?.favorites.map((marker) =>
            marker?.coords?.length === 2 ? (
              <Marker
                className="recommendation-marker"
                key={marker.address + "-favorites"}
                longitude={marker.coords[0]}
                latitude={marker.coords[1]}
                anchor="bottom"
                // offset={[-5, -15]}
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  setRecommendationPopup({ ...marker, bookmark: true });
                }}
              >
                <MapMarker fill={"#13c397"} />
              </Marker>
            ) : null
          )
        : null,
    [user]
  );
  // console.log(recommendationPopup);
  const directionsPointMarkers = useMemo(
    () =>
      directionsPoints.length > 1
        ? directionsPoints.map((marker) =>
            marker.coords.length === 2 ? (
              <Marker
                className="recommendation-marker"
                key={marker.address + "-directions"}
                longitude={marker.coords[0]}
                latitude={marker.coords[1]}
                anchor="bottom"
                // offset={[-5, -15]}
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  setRecommendationPopup({ ...marker });
                }}
              >
                <MapMarker fill={"#33c397"} />
              </Marker>
            ) : null
          )
        : null,
    [directionsPoints]
  );

  const addToRoute = (pointObj, isUserPoint = false) => {
    console.log("adding to route", pointObj, isUserPoint);
    if (!pointObj) return;
    if (isUserPoint) setDirectionsPoints((prev) => [pointObj, ...prev]);
    else setDirectionsPoints((prev) => [...prev, pointObj]);
    if (setParentPoints) setParentPoints((prev) => [...prev, pointObj]);
  };

  const removeFromRoute = (pointObj) => {
    setDirectionsPoints((prev) =>
      prev.filter((point) => point.address !== pointObj.address)
    );
    if (setParentPoints)
      setParentPoints((prev) =>
        prev.filter((point) => point.address !== pointObj.address)
      );
  };

  useEffect(() => {
    if (pointToDelete) {
      removeFromRoute(pointToDelete);
      setPointToDelete(null);
    }
  }, [pointToDelete]);

  // console.log(directionsPoints);
  useEffect(() => {
    console.log("useEffect runs - customPointObjs: ", customPointObjs);
    if (customPointObjs)
      customPointObjs.forEach((pointObj) => {
        console.log("adding preset points: ");
        addToRoute(pointObj);
      });
  }, [customPointObjs]);

  const getUserPointObject = async () => {
    const coordString = [userCoords.longitude, userCoords.latitude].join(",");
    const pointObj = await retrieveByCoords(coordString);
    setUserPointObject(pointObj);
    if (parent === "home") addToRoute(pointObj, true);
  };

  useEffect(() => {
    if (userCoords && user) {
      fetchRecommendations();
      getUserPointObject();
    }
  }, [userCoords]);

  const bookmarkCurrentLocation = async () => {
    bookmarkPoint(userPointObject);
  };

  const fetchDirections = async (directionsPoints) => {
    // console.log("directions fetch run: ");
    const coordsStr = directionsPoints
      .map((point) => point.coords.join(","))
      .join(";");
    // console.log(coordsStr);
    try {
      const res = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/${navigationPreference}/${coordsStr}?alternatives=${areAlternativeRoutes}&annotations=distance%2Cduration%2Cspeed&banner_instructions=true&geometries=geojson&language=en&overview=full&roundabout_exits=true&steps=true&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
      );
      const data = await res.json();
      setDirectionsData(data);
      if (setRouteData) setRouteData(data.routes[0]);
      // console.log(data);
    } catch (error) {
      setError(error);
    }
  };

  const saveSingePoint = async (point) => {
    try {
      const res = await fetch(`${backendURL}/point/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(point),
      });
      const data = await res.json();
      setUser(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const savePoints = (unstoredPoints) => {
  //   // console.log("unstored points, though: ", unstoredPoints);
  //   unstoredPoints.forEach((point) => saveSingePoint(point));
  // };

  useEffect(() => {
    if (directionsPoints.length === 1) setDirectionsData(null);
    if (directionsPoints.length > 1 && directionsPoints.length < 26)
      fetchDirections(directionsPoints);
    // const unstoredPoints = directionsPoints.filter(
    //   (point) => !Object.hasOwn(point, "_id")
    // );
    // if (unstoredPoints.length > 0) savePoints(unstoredPoints);
  }, [directionsPoints]);

  useEffect(() => {
    if (allSelectedPoints) setDirectionsPoints(allSelectedPoints);
  }, [allSelectedPoints]);

  return (
    userCoords.latitude &&
    userCoords.longitude && (
      <Map
        {...viewState}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        mapStyle={mapStyle}
        style={{
          bottom: 0,
          left: 0,
          right: 0,
          height: "100%",
          overflow: "hidden",
        }}
        onMove={handleMapMove}
        reuseMaps={true}
        cursor="drag"
        onClick={handleMapClick}
      >
        {parent === "home" && <NavigationControl />}
        {showPopup && (
          <Popup
            latitude={userCoords.latitude}
            longitude={userCoords.longitude}
            onClose={() => setShowPopup(false)}
            // closeButton={true}
            closeOnClick={true}
            // offsetBottom={100}
            offset={20}
          >
            <div className="popup_inside">
              <h3>Current location</h3>
              {userPointObject ? <p>{userPointObject.name}</p> : null}
              {userPointObject ? <p>{userPointObject.address}</p> : null}
              <div className="button-wrapper">
                <button onClick={bookmarkCurrentLocation}>Bookmark</button>
              </div>
            </div>
          </Popup>
        )}
        <Marker
          longitude={userCoords.longitude}
          latitude={userCoords.latitude}
          anchor="bottom"
          // offset={[-12, -32]}
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setShowPopup((prev) => !prev);
          }}
        >
          {/* <img
            src="./assets/marker.png"
            alt="marker"
            className={lightMode ? null : "mapboxgl-ctrl-icon"}
          /> */}
          <MapMarker fill={"#8f278f"} />
        </Marker>
        {clickedMapPoint && (
          <Marker
            longitude={clickedMapPoint.coords[0]}
            latitude={clickedMapPoint.coords[1]}
            anchor="bottom"
            // offset={[-12, -32]}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setRecommendationPopup(clickedMapPoint);
            }}
          >
            <MapMarker fill={"#33c397"} />
          </Marker>
        )}

        {/* Markers and Popups for selections from searchbar and user favorites */}
        {parent !== "CreateTravelPlan" && selectedMarkers}
        {parent !== "CreateTravelPlan" &&
          parent !== "PlanTravel" &&
          userFavoritesMarkers}
        {parent !== "CreateTravelPlan" && popupInfo && (
          <Popup
            longitude={popupInfo.coords[0]}
            latitude={popupInfo.coords[1]}
            onClose={() => setPopupInfo(null)}
            closeButton={true}
            closeOnClick={true}
            offsetTop={20}
          >
            <div className="popup_inside">
              <h3>{popupInfo.name}</h3>
              <p>{popupInfo.address}</p>
              <div className="button-wrapper">
                <button onClick={() => bookmarkPoint(popupInfo)}>
                  Bookmark Point
                </button>
                {directionsPoints.findIndex(
                  (point) => point.address === popupInfo.address
                ) !== -1 ? (
                  <button onClick={() => removeFromRoute(popupInfo)}>
                    - route
                  </button>
                ) : (
                  <button onClick={() => addToRoute(popupInfo)}>+ route</button>
                )}
              </div>
            </div>
          </Popup>
        )}
        {/* Marker and Popup for recommended points  and map clicked points*/}
        {directionsPointMarkers}
        {parent !== "CreateTravelPlan" &&
          parent !== "PlanTravel" &&
          recommendationMarkers}
        {recommendationPopup && (
          <Popup
            longitude={recommendationPopup.coords[0]}
            latitude={recommendationPopup.coords[1]}
            onClose={() => setRecommendationPopup(null)}
            closeButton={true}
            closeOnClick={true}
            offsetTop={20}
          >
            <div className="popup_inside">
              <h3>{recommendationPopup.name}</h3>
              <p>{recommendationPopup.address}</p>
              <p>{recommendationPopup.preference}</p>
              <div className="button-wrapper">
                {!recommendationPopup.bookmark && (
                  <button onClick={() => bookmarkPoint(recommendationPopup)}>
                    Bookmark Point
                  </button>
                )}
                {directionsPoints.findIndex(
                  (point) => point.address === recommendationPopup.address
                ) !== -1 ? (
                  <button onClick={() => removeFromRoute(recommendationPopup)}>
                    -- route
                  </button>
                ) : (
                  <button onClick={() => addToRoute(recommendationPopup)}>
                    ++ route
                  </button>
                )}
              </div>
            </div>
          </Popup>
        )}
        {directionsData && (
          <>
            <Source
              id="route"
              type="geojson"
              data={{
                type: "Feature",
                geometry: directionsData.routes[0].geometry,
              }}
            />
            <Layer
              id="route"
              type="line"
              source="route"
              layout={{
                "line-join": "round",
                "line-cap": "round",
              }}
              paint={{
                "line-color": "#fff",
                "line-width": 5,
                "line-opacity": 0.75,
              }}
            />
          </>
        )}
      </Map>
    )
  );
}
