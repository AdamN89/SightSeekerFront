import Map, { Marker, Popup, NavigationControl } from "react-map-gl";
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

  const [error, setError] = useState(null);

  const getUUID = () => {
    if (!sessionUUID.current) sessionUUID.current = uuidv4();
    return sessionUUID.current;
  };

  useEffect(() => {
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

  // &types=poi%2Caddress
  const handleMapClick = async (e) => {
    const poiObj = await retrieveByCoords([e.lngLat.lng, e.lngLat.lat]);
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
              // anchor="top"
              offset={[-5, -15]}
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

  const userFavoritesMarkers = useMemo(
    () =>
      user?.favorites?.length
        ? user.favorites.map((marker) => (
            <Marker
              className="recommendation-marker"
              key={marker.address + "-favorites"}
              longitude={marker.coords[0]}
              latitude={marker.coords[1]}
              // anchor="top"
              offset={[-5, -15]}
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setRecommendationPopup({ ...marker, bookmark: true });
              }}
            >
              <MapMarker fill={"#13c397"} />
            </Marker>
          ))
        : null,
    [user]
  );

  const bookmarkPoint = async (pointObj) => {
    // console.log(pointObj);
    try {
      const res = await fetch(`${backendURL}/user/add-favorite`, {
        method: "PUT",
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

  const getUserPointObject = async () => {
    const coordString = [userCoords.longitude, userCoords.latitude].join(",");
    const pointObj = await retrieveByCoords(coordString);
    setUserPointObject(pointObj);
    setDirectionsPoints([pointObj.coords]);
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
          <AddFavoriteIcon />
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
                <button onClick={bookmarkCurrentLocation}>
                  Add to Favorite
                </button>
              </div>
            </Popup>
          )}
          <Marker
            longitude={userCoords.longitude}
            latitude={userCoords.latitude}
            offset={[-12, -32]}
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
              offset={[-12, -32]}
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setRecommendationPopup(clickedMapPoint);
              }}
            >
              <img src="./assets/marker.png" alt="marker" />
            </Marker>
          )}
          {selectedMarkers}
          {userFavoritesMarkers}
          {popupInfo && (
            <Popup
              longitude={popupInfo.coords[0]}
              latitude={popupInfo.coords[1]}
              onClose={() => setPopupInfo(null)}
              closeButton={true}
              closeOnClick={true}
              // offsetTop={-30}
            >
              <h3>{popupInfo.name}</h3>
              <p>{popupInfo.address}</p>
              <button onClick={() => bookmarkPoint(popupInfo)}>
                Bookmark Point
              </button>
            </Popup>
          )}
          {recommendationMarkers}
          {/* {userFavoritesMarkers} */}
          {recommendationPopup && (
            <Popup
              longitude={recommendationPopup.coords[0]}
              latitude={recommendationPopup.coords[1]}
              onClose={() => setRecommendationPopup(null)}
              closeButton={true}
              closeOnClick={true}
              // offsetTop={-30}
            >
              <h3>{recommendationPopup.name}</h3>
              <p>{recommendationPopup.address}</p>
              <p>{recommendationPopup.preference}</p>
              {!recommendationPopup.bookmark && (
                <button onClick={() => bookmarkPoint(recommendationPopup)}>
                  Bookmark Point
                </button>
              )}
            </Popup>
          )}
        </Map>
      )}
      <Menu getUUID={getUUID} viewState={viewState} userCoords={userCoords} />
    </div>
  );
}
