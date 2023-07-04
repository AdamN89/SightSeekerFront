import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "mapbox-gl/dist/mapbox-gl.css";
import "./HomePage.css";
import TopMenu from "../../components/TopMenu/TopMenu";
import Menu from "../../components/Menu";
import MapContent from "../../components/Map/MapContent";

// 52.45685631705479, 13.540060456464587
export default function HomePage() {
  const { user } = useContext(AuthContext);
  // const { markers, retrieveByCoord } = useContext(MapContext);
  const [userCoords, setUserCoords] = useState({});
  const [viewState, setViewState] = useState({
    longitude: 13.540060456464587,
    latitude: 52.45685631705479,
    zoom: 15,
  });
  // const [userPointObject, setUserPointObject] = useState(null);
  // const [showPopup, setShowPopup] = useState(true);
  // const sessionUUID = useRef(null);
  // const [popupInfo, setPopupInfo] = useState(null);
  // const [recommendations, setRecommendations] = useState([]);
  // const [recommendationPopup, setRecommendationPopup] = useState(null);
  // const [markerColorsState, setMarkerColorsState] = useState({});
  // const [clickedMapPoint, setClickedMapPoint] = useState(null);
  // const [directionsPoints, setDirectionsPoints] = useState([]);
  // const [directionsData, setDirectionsData] = useState(null);

  // const [error, setError] = useState(null);

  // const getUUID = () => {
  //   if (!sessionUUID.current) sessionUUID.current = uuidv4();
  //   return sessionUUID.current;
  // };

  useEffect(() => {
    // setDirectionsPoints([]);
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
    // const markerColorsObj = user.settings.poi.reduce((acc, val, ind) => {
    //   return (acc[val] = markerColors[ind]), acc;
    // }, {});
    // setMarkerColorsState(markerColorsObj);
  }, [user]);

  // const fetchRecommendations = async () => {
  //   const userPreferences = user.settings.poi;
  //   const fetchPromises = userPreferences.map(async (preference) => {
  //     try {
  //       const res = await fetch(
  //         `https://api.mapbox.com/geocoding/v5/mapbox.places/${preference}.json?type=poi&proximity=${userCoords.longitude},${userCoords.latitude}&limit=4&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
  //       );
  //       const data = await res.json();
  //       // console.log("recommendations: ", data);
  //       return data.features
  //         .filter((recommendation) => recommendation.place_type.includes("poi"))
  //         .map((recommendation) => ({
  //           name: recommendation.place_name.split(",")[0],
  //           address: recommendation.place_name
  //             .split(",")
  //             .slice(1)
  //             .join(",")
  //             .trim(),
  //           coords: recommendation.center,
  //           preference,
  //         }));
  //     } catch (error) {
  //       setError(error);
  //       return [];
  //     }
  //   });

  //   try {
  //     const allRecommendations = await Promise.allSettled(fetchPromises);
  //     const flattenedRecommendations = allRecommendations.flatMap((rec) => {
  //       if (rec.status === "fulfilled") return rec.value;
  //       else return [];
  //     });
  //     setRecommendations(flattenedRecommendations);
  //   } catch (error) {
  //     setError(error);
  //   }
  // };

  // const handleMapMove = (e) => {
  //   setViewState(e.viewState);
  // };

  // console.log(user);
  // &types=poi%2Caddress
  // const handleMapClick = async (e) => {
  //   // console.log(e.lngLat);
  //   if (popupInfo || recommendationPopup) return;
  //   const poiObj = await retrieveByCoords([e.lngLat.lng, e.lngLat.lat]);
  //   setRecommendationPopup(poiObj);
  //   setClickedMapPoint(poiObj);
  // };

  // const selectedMarkers = useMemo(
  //   () =>
  //     markers?.length
  //       ? markers.map((marker) =>
  //           marker.coords.length === 2 ? (
  //             <>
  //               <Marker
  //                 key={marker.address + "-selected"}
  //                 longitude={marker.coords[0]}
  //                 latitude={marker.coords[1]}
  //                 anchor="bottom"
  //                 onClick={(e) => {
  //                   e.originalEvent.stopPropagation();
  //                   setPopupInfo(marker);
  //                 }}
  //               >
  //                 <img
  //                   className="markers-colored"
  //                   src="./assets/marker.png"
  //                   alt="marker"
  //                 />
  //               </Marker>
  //             </>
  //           ) : null
  //         )
  //       : null,
  //   [markers]
  // );
  // const recommendationMarkers = useMemo(
  //   () =>
  //     recommendations?.length
  //       ? recommendations.map((marker) =>
  //           marker.coords.length === 2 ? (
  //             <Marker
  //               className="recommendation-marker"
  //               key={marker.address + "-recommendations"}
  //               longitude={marker.coords[0]}
  //               latitude={marker.coords[1]}
  //               anchor="bottom"
  //               // offset={[-5, -15]}
  //               onClick={(e) => {
  //                 e.originalEvent.stopPropagation();
  //                 setRecommendationPopup(marker);
  //               }}
  //             >
  //               <MapMarker fill={markerColorsState[marker.preference]} />
  //             </Marker>
  //           ) : null
  //         )
  //       : null,
  //   [recommendations]
  // );

  // const userFavoritesMarkers = useMemo(
  //   () =>
  //     user && user?.favorites?.length
  //       ? user?.favorites.map((marker) =>
  //           marker?.coords?.length === 2 ? (
  //             <Marker
  //               className="recommendation-marker"
  //               key={marker.address + "-favorites"}
  //               longitude={marker.coords[0]}
  //               latitude={marker.coords[1]}
  //               anchor="bottom"
  //               // offset={[-5, -15]}
  //               onClick={(e) => {
  //                 e.originalEvent.stopPropagation();
  //                 setRecommendationPopup({ ...marker, bookmark: true });
  //               }}
  //             >
  //               <MapMarker fill={"#13c397"} />
  //             </Marker>
  //           ) : null
  //         )
  //       : null,
  //   [user]
  // );
  // // console.log(recommendationPopup);
  // const directionsPointMarkers = useMemo(
  //   () =>
  //     directionsPoints.length > 1
  //       ? directionsPoints.map((marker) =>
  //           marker.coords.length === 2 ? (
  //             <Marker
  //               className="recommendation-marker"
  //               key={marker.address + "-directions"}
  //               longitude={marker.coords[0]}
  //               latitude={marker.coords[1]}
  //               anchor="bottom"
  //               // offset={[-5, -15]}
  //               onClick={(e) => {
  //                 e.originalEvent.stopPropagation();
  //                 setRecommendationPopup({ ...marker });
  //               }}
  //             >
  //               <MapMarker fill={"#33c397"} />
  //             </Marker>
  //           ) : null
  //         )
  //       : null,
  //   [directionsPoints]
  // );

  // const bookmarkPoint = async (pointObj) => {
  //   // console.log(pointObj);
  //   try {
  //     const res = await fetch(`${backendURL}/point`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(pointObj),
  //     });
  //     const data = await res.json();
  //     setUser(data.data);
  //   } catch (error) {
  //     setError(error);
  //   }
  // };

  // const addToRoute = (pointObj, isUserPoint = false) => {
  //   // console.log("adding to route", pointObj, isUserPoint);
  //   if (!pointObj) return;
  //   if (isUserPoint) setDirectionsPoints((prev) => [pointObj, ...prev]);
  //   else setDirectionsPoints((prev) => [...prev, pointObj]);
  // };

  // const removeFromRoute = (pointObj) => {
  //   setDirectionsPoints((prev) =>
  //     prev.filter((point) => point.address !== pointObj.address)
  //   );
  // };

  // const getUserPointObject = async () => {
  //   const coordString = [userCoords.longitude, userCoords.latitude].join(",");
  //   const pointObj = await retrieveByCoords(coordString);
  //   setUserPointObject(pointObj);
  //   addToRoute(pointObj, true);
  // };

  // useEffect(() => {
  //   if (userCoords && user) {
  //     fetchRecommendations();
  //     getUserPointObject();
  //   }
  // }, [userCoords]);

  // const bookmarkCurrentLocation = async () => {
  //   bookmarkPoint(userPointObject);
  // };

  // fetch navigation

  // const fetchDirections = async (directionsPoints) => {
  //   // console.log("directions fetch run: ");
  //   const coordsStr = directionsPoints
  //     .map((point) => point.coords.join(","))
  //     .join(";");
  //   // console.log(coordsStr);
  //   try {
  //     const res = await fetch(
  //       `https://api.mapbox.com/directions/v5/mapbox/${navigationPreference}/${coordsStr}?alternatives=${areAlternativeRoutes}&annotations=distance%2Cduration%2Cspeed&banner_instructions=true&geometries=geojson&language=en&overview=full&roundabout_exits=true&steps=true&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
  //     );
  //     const data = await res.json();
  //     setDirectionsData(data);
  //     // console.log(data);
  //   } catch (error) {
  //     setError(error);
  //   }
  // };

  // useEffect(() => {
  //   if (directionsPoints.length === 1) setDirectionsData(null);
  //   if (directionsPoints.length > 1 && directionsPoints.length < 26)
  //     fetchDirections(directionsPoints);
  // }, [directionsPoints]);

  // console.log("Markers: ", selectedMarkers);
  // console.log(recommendations);
  // console.log(userFavoritesMarkers);
  // console.log(userPointObject);
  // console.log(user);
  return (
    <div className="map-container">
      <TopMenu />
      <MapContent
        viewState={viewState}
        setViewState={setViewState}
        userCoords={userCoords}
      />
      <Menu viewState={viewState} userCoords={userCoords} />
    </div>
  );
}
