import Map, { Marker, Popup, NavigationControl } from "react-map-gl";
import { useEffect, useState } from "react";
import LogoHorizontal from "../../components/LogoHorizontal";
import MenuIcon from "../../components/MenuIcon";
import Menu from "../../components/Menu";
import "mapbox-gl/dist/mapbox-gl.css";
import "./HomePage.css";
import TopMenu from "../../components/TopMenu/TopMenu";
import Chat from "../../components/Chat/Chat";

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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log(position);
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
    // console.log("map moving: ", e);
    setViewState(e.viewState);
  };

  return (
    <div className="container map-container">
      <TopMenu />
      {/* <nav className="home__nav">
        <LogoHorizontal />
        <button>
        <MenuIcon />
        </button>
      </nav> */}
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
      <Menu />
    </div>
  );
}
