import Map, {
  Marker,
  Popup,
  NavigationControl,
  Layer,
  Source,
} from "react-map-gl";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState, useRef, useContext, useMemo } from "react";
import { AuthContext } from "../../context/AuthContext";
import { MapContext } from "../../context/MapContext";
import "mapbox-gl/dist/mapbox-gl.css";
import "./HomePage.css";
import TopMenu from "../../components/TopMenu/TopMenu";
import Loader from "../../components/Loader/Loader";
import Menu from "../../components/Menu";
import AddFavoriteIcon from "../../components/AddFavoriteIcon";
import MapMarker from "../../components/MapMarker";

const mapStyle = "mapbox://styles/stephanullmann/clj7lajvj005t01que278452b";
const navigationPreference = "driving";
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
// 52.45685631705479, 13.540060456464587
export default function HomePage() {
  const { user, setUser, backendURL, token } = useContext(AuthContext);
  const { markers, retrieveByCoords } = useContext(MapContext);
  const [userCoords, setUserCoords] = useState({});
  const [userPointObject, setUserPointObject] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: 13.540060456464587,
    latitude: 52.45685631705479,
    zoom: 15,
  });
  const [showPopup, setShowPopup] = useState(true);
  const sessionUUID = useRef(null);
  const [popupInfo, setPopupInfo] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationPopup, setRecommendationPopup] = useState(null);
  const [markerColorsState, setMarkerColorsState] = useState({});
  const [clickedMapPoint, setClickedMapPoint] = useState(null);
  const [directionsPoints, setDirectionsPoints] = useState([]);
  const [directionsData, setDirectionsData] = useState(null);

  const [error, setError] = useState(null);

  const getUUID = () => {
    if (!sessionUUID.current) sessionUUID.current = uuidv4();
    return sessionUUID.current;
  };

  useEffect(() => {
    setDirectionsPoints([]);
    if (!user) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setViewState({
          ...viewState,
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          zoom: 15,
        });
        setUserCoords({
          ...userCoords,
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          zoom: 15,
        });
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
    const markerColorsObj = user.settings.poi.reduce((acc, val, ind) => {
      return (acc[val] = markerColors[ind]), acc;
    }, {});
    setMarkerColorsState(markerColorsObj);
    // const locatorInterval = setInterval(() => {
    //   // console.log("tick: ", userCoords);
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     if (
    //       position.coords.longitude !== userCoords.longitude ||
    //       position.coords.latitude !== userCoords.latitude
    //     )
    //       setUserCoords({
    //         ...userCoords,
    //         longitude: position.coords.longitude,
    //         latitude: position.coords.latitude,
    //       });
    //   });
    // }, 12500);
    // return () => clearInterval(locatorInterval);
  }, [user]);

  // const fetchRecommendations = async () => {
  //   const userPreferences = user.settings.poi;
  //   try {
  //     const res = await fetch(
  //       `https://api.mapbox.com/geocoding/v5/mapbox.places/${userPreferences[0]}.json?type=poi&proximity=${userCoords.longitude},${userCoords.latitude}&limit=4&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
  //     );
  //     const data = await res.json();
  //     console.log("recommendations: ", data);
  //     data.features.forEach((recommendation) => {
  //       if (recommendation.place_type.includes("poi"))
  //         setRecommendations((prev) => [
  //           ...prev,
  //           {
  //             name: recommendation.place_name.split(",")[0],
  //             address: recommendation.place_name.split(",")[1],
  //             coords: recommendation.center,
  //           },
  //         ]);
  //     });
  //   } catch (error) {
  //     setError(error);
  //   }
  // };

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

  const handleMapMove = (e) => {
    setViewState(e.viewState);
  };

  console.log(user)
  // &types=poi%2Caddress
  const handleMapClick = async (e) => {
    // console.log(e.lngLat);
    const poiObj = await retrieveByCoords([e.lngLat.lng, e.lngLat.lat]);
    setRecommendationPopup(poiObj);
    setClickedMapPoint(poiObj);
  };

  const selectedMarkers = useMemo(
    () =>
      markers?.length
        ? markers.map((marker) => (
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
                <img
                  className="markers-colored"
                  src="./assets/marker.png"
                  alt="marker"
                />
              </Marker>
            </>
          ))
        : null,
    [markers]
  );
  const recommendationMarkers = useMemo(
    () =>
      recommendations?.length
        ? recommendations.map((marker) => (
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
          ))
        : null,
    [recommendations]
  );

  // const userFavoritesMarkers = useMemo(
  //   () =>
  //     user?.favorites?.length
  //       ? user.favorites.map((marker) => (
  //           <Marker
  //             className="recommendation-marker"
  //             key={marker.address + "-favorites"}
  //             longitude={marker.coords[0]}
  //             latitude={marker.coords[1]}
  //             anchor="bottom"
  //             // offset={[-5, -15]}
  //             onClick={(e) => {
  //               e.originalEvent.stopPropagation();
  //               setRecommendationPopup({ ...marker, bookmark: true });
  //             }}
  //           >
  //             <MapMarker fill={"#13c397"} />
  //           </Marker>
  //         ))
  //       : null,
  //   [user]
  // );
  // console.log(recommendationPopup);
  const directionsPointMarkers = useMemo(
    () =>
      directionsPoints.length > 1
        ? directionsPoints.map((marker) => (
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
          ))
        : null,
    [directionsPoints]
  );

  const bookmarkPoint = async (pointObj) => {
    // console.log(pointObj);
    try {
      const res = await fetch(`${backendURL}/point`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ favorite: pointObj }),
      });
      const data = await res.json();
      setUser(data.data);
    } catch (error) {
      setError(error);
    }
  };

  const addToRoute = (pointObj, isUserPoint = false) => {
    console.log("adding to route", pointObj, isUserPoint);
    if (!pointObj) return;
    if (isUserPoint) setDirectionsPoints((prev) => [pointObj, ...prev]);
    else setDirectionsPoints((prev) => [...prev, pointObj]);
  };

  const removeFromRoute = (pointObj) => {
    setDirectionsPoints((prev) =>
      prev.filter((point) => point.address !== pointObj.address)
    );
  };

  const getUserPointObject = async () => {
    const coordString = [userCoords.longitude, userCoords.latitude].join(",");
    const pointObj = await retrieveByCoords(coordString);
    setUserPointObject(pointObj);
    addToRoute(pointObj, true);
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

  // fetch navigation

  const fetchDirections = async (directionsPoints) => {
    console.log("directions fetch run: ");
    const coordsStr = directionsPoints
      .map((point) => point.coords.join(","))
      .join(";");
    // console.log(coordsStr);
    try {
      const res = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/${navigationPreference}/${coordsStr}?alternatives=true&annotations=distance%2Cduration%2Cspeed&banner_instructions=true&geometries=geojson&language=en&overview=full&roundabout_exits=true&steps=true&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
      );
      const data = await res.json();
      setDirectionsData(data);
      console.log(data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (directionsPoints.length === 1) setDirectionsData(null);
    if (directionsPoints.length > 1 && directionsPoints.length < 26)
      fetchDirections(directionsPoints);
  }, [directionsPoints]);

  // console.log("Markers: ", selectedMarkers);
  // console.log(recommendations);
  // console.log(userFavoritesMarkers);
  // console.log(userPointObject);
  return (
    <div className="container map-container">
      <TopMenu />
      {userCoords.latitude && userCoords.longitude && (
        <Map
          {...viewState}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          mapStyle={mapStyle}
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            height: "100dvh",
            overflow: "hidden",
          }}
          onMove={handleMapMove}
          reuseMaps={true}
          cursor="drag"
          onClick={handleMapClick}
        >
          <NavigationControl />
          {showPopup && (
            <Popup
              latitude={userCoords.latitude}
              longitude={userCoords.longitude}
              onClose={() => setShowPopup(false)}
              // closeButton={true}
              closeOnClick={true}
              // offsetBottom={100}
              offset={35}
            >
              <div className="popup_inside">
                <h3>Current location</h3>
                {userPointObject ? <p>{userPointObject.name}</p> : null}
                {userPointObject ? <p>{userPointObject.address}</p> : null}
                <div className="button-wrapper">
                  <button onClick={bookmarkCurrentLocation}>
                    Add to Favorite
                  </button>
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
            <img src="./assets/marker.png" alt="marker" />
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
          {selectedMarkers}
          {/* {userFavoritesMarkers} */}
          {popupInfo && (
            <Popup
              longitude={popupInfo.coords[0]}
              latitude={popupInfo.coords[1]}
              onClose={() => setPopupInfo(null)}
              closeButton={true}
              closeOnClick={true}
              // offsetTop={-30}
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
                    <button onClick={() => addToRoute(popupInfo)}>
                      + route
                    </button>
                  )}
                </div>
              </div>
            </Popup>
          )}
          {/* Marker and Popup for recommended points  and map clicked points*/}
          {directionsPointMarkers}
          {recommendationMarkers}
          {recommendationPopup && (
            <Popup
              longitude={recommendationPopup.coords[0]}
              latitude={recommendationPopup.coords[1]}
              onClose={() => setRecommendationPopup(null)}
              closeButton={true}
              closeOnClick={true}
              // offsetTop={-30}
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
                    <button
                      onClick={() => removeFromRoute(recommendationPopup)}
                    >
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
      )}
      <Menu getUUID={getUUID} viewState={viewState} userCoords={userCoords} />
    </div>
  );
}
