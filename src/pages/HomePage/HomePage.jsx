import Map, { Marker } from "react-map-gl";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const TOKEN =
  "pk.eyJ1Ijoic3RlcGhhbnVsbG1hbm4iLCJhIjoiY2xqNWVyZjV4MDF2cTNkcG0weTE4cjB6ZSJ9.FeahDy79a69Y5JxlkBkfIA";

export default function HomePage() {
  const [userCoords, setUserCoords] = useState({});
  const [viewState, setViewState] = useState({
    longitude: 13.540028,
    latitude: 52.457056,
    zoom: 15,
  });

  const markerRef = useRef();

  const popup = useMemo(() => {
    return new mapboxgl.Popup().setText("Hello world!");
  }, []);

  const togglePopup = useCallback(() => {
    markerRef.current?.togglePopup();
  }, []);

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
      {userCoords.latitude && userCoords.longitude && (
        <Map
          {...viewState}
          mapboxAccessToken={TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          style={{ width: "100%", height: "100%", overflow: "hidden" }}
          onMove={handleMapMove}
          reuseMaps={true}
          cursor="drag"
        >
          <Marker
            longitude={userCoords.longitude}
            latitude={userCoords.latitude}
            popup={popup}
            ref={markerRef}
          />
        </Map>
      )}
    </div>
  );
}
