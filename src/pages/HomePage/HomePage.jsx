import Map, { Marker, Popup, NavigationControl } from "react-map-gl";
// import { SearchBoxCore, SearchSession } from "mapbox-gl";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "./HomePage.css";
import TopMenu from "../../components/TopMenu/TopMenu";
import Menu from "../../components/Menu";

const mapStyle = "mapbox://styles/stephanullmann/clj7lajvj005t01que278452b";
const TOKEN =
  "pk.eyJ1Ijoic3RlcGhhbnVsbG1hbm4iLCJhIjoiY2xqNWVyZjV4MDF2cTNkcG0weTE4cjB6ZSJ9.FeahDy79a69Y5JxlkBkfIA";

export default function HomePage() {
  const [userCoords, setUserCoords] = useState({});
  const [viewState, setViewState] = useState({
    longitude: 13.540028,
    latitude: 52.457056,
    zoom: 15,
  });
  const [showPopup, setShowPopup] = useState(true);
  const sessionUUID = useRef(null);
  // const mapboxSearchRef = useRef(null);
  // const mapboxSession = useRef(null);

  // useEffect(() => {
  //   mapboxSearchRef.current = new SearchBoxCore({ accessToken: TOKEN });
  // }, []);

  // const getSession = () => {
  //   if (!mapboxSession.current)
  //     mapboxSession.current = new SearchSession(mapboxSearchRef.current);
  //   return mapboxSession.current;
  // };

  const getUUID = () => {
    if (!sessionUUID.current) sessionUUID.current = uuidv4();
    return sessionUUID.current;
  };

  useEffect(() => {
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
  }, []);

  const handleMapMove = (e) => {
    setViewState(e.viewState);
  };

  const handleMapClick = async (e) => {
    console.log(e);
    const resGeocoding = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.lngLat.lng},${e.lngLat.lat}.json?limit=1&types=poi%2Caddress&access_token=${TOKEN}`
    );
    const dataGeocoding = await resGeocoding.json();
    // SearchBox
    const resSearchBox = await fetch(
      `https://api.mapbox.com/search/searchbox/v1/suggest?q=${
        dataGeocoding.features[0].id
      }&language=en&proximity=${e.lngLat.lng},${
        e.lngLat.lat
      }&navigation_profile=driving&origin=${userCoords.longitude},${
        userCoords.latitude
      }&session_token=${getUUID()}&access_token=${TOKEN}`
    );
    const dataSearchBox = await resSearchBox.json();
    console.log(dataGeocoding);
    console.log(dataSearchBox);
  };

  return (
    <div className="container map-container">
      <TopMenu />
      {userCoords.latitude && userCoords.longitude && (
        <Map
          {...viewState}
          mapboxAccessToken={TOKEN}
          mapStyle={mapStyle}
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            height: "100vh",
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
              // offsetTop={-30}
            >
              <h3>Current location</h3>
              <p>Lat: {userCoords.latitude}</p>
              <p>Lng: {userCoords.longitude}</p>
            </Popup>
          )}
          <Marker
            longitude={userCoords.longitude}
            latitude={userCoords.latitude}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setShowPopup(true);
            }}
          >
            <img src="./assets/marker.png" alt="marker" />
          </Marker>
        </Map>
      )}
      <Menu getUUID={getUUID} viewState={viewState} userCoords={userCoords} />
    </div>
  );
}
