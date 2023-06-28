import { useEffect, useState, useRef, useContext } from "react";
import SearchIcon from "./NavigationIcons/SearchIcon";
import { AuthContext } from "../context/AuthContext";

export default function SearchBar({ getUUID, viewState, userCoords }) {
  const { user } = useContext(AuthContext);
  const [sessionUUID, setSessionUUID] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [latUser, setLatUser] = useState(0);
  const [lngUser, setLngUser] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const searchInputRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    searchInputRef.current.focus();
    setSessionUUID(getUUID && getUUID());
    setLng(viewState?.longitude !== undefined ? viewState.longitude : 0);
    setLat(viewState?.latitude !== undefined ? viewState.latitude : 0);
    setLngUser(userCoords?.longitude !== undefined ? userCoords.longitude : 0);
    setLatUser(userCoords?.latitude !== undefined ? userCoords.latitude : 0);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://api.mapbox.com/search/searchbox/v1/suggest?q=${searchInput}&language=en&limit=7&proximity=${lng},${lat}&origin=${lngUser},${latUser}&session_token=${sessionUUID}&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        ref={searchInputRef}
        type="text"
        placeholder="search"
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button type="submit">
        <SearchIcon />
      </button>
    </form>
  );
}

// &navigation_profile=cycling
