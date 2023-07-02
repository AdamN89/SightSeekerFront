import { createContext, useEffect, useState } from "react";

export const MapContext = createContext();

export default function MapContextProvider({ children }) {
  const [markers, setMarkers] = useState([]);
  const [error, setError] = useState(null);

  const addMarker = (name, address, coords) => {
    console.log({ name, coords });
    setMarkers((prev) => [
      ...prev,
      {
        name,
        address,
        coords,
      },
    ]);
  };

  const retrieveByAddress = async (address, name) => {
    // console.log("by address:");
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
      );
      const data = await res.json();
      console.log({
        name,
        address: data.features[0].place_name,
        coords: data.features[0].center,
      });
      addMarker(name, address, data.features[0].center);
    } catch (error) {
      setError(error);
    }
  };

  const retrieveByCoords = async (coords) => {
    console.log("by coords: ", coords);
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
      );
      const data = await res.json();

      if (data.features[0].place_type.includes("poi")) {
        const pointObj = {
          name: data.features[0].place_name.split(",")[0],
          address: data.features[0].place_name
            .split(",")
            .slice(1)
            .join(",")
            .trim(),
          coords: data.query,
          preference: data.type,
        };
        return pointObj;
      } else {
        return {
          name: "",
          address: data.features[0].place_name,
          coords: data.query,
          preference: "",
        };
      }
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    console.log("markers: ", markers);
  }, [markers]);

  return (
    <MapContext.Provider
      value={{
        markers,
        setMarkers,
        addMarker,
        retrieveByAddress,
        retrieveByCoords,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
