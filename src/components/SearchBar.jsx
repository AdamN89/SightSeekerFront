import { useEffect, useState, useRef, useContext } from "react";
// import SearchIcon from "./NavigationIcons/SearchIcon";
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

  const [mapBoxSuggestions, setMapboxSuggestions] = useState([]);

  useEffect(() => {
    searchInputRef.current.focus();
    setSessionUUID(getUUID && getUUID());
    setLng(viewState?.longitude !== undefined ? viewState.longitude : 0);
    setLat(viewState?.latitude !== undefined ? viewState.latitude : 0);
    setLngUser(userCoords?.longitude !== undefined ? userCoords.longitude : 0);
    setLatUser(userCoords?.latitude !== undefined ? userCoords.latitude : 0);
  }, []);

  useEffect(() => {
    const getSuggestions = async () => {
      try {
        const res = await fetch(
          `https://api.mapbox.com/search/searchbox/v1/suggest?q=${searchInput}&language=en&limit=10&proximity=${lng},${lat}&origin=${lngUser},${latUser}&radius=0.5&types=poi,address,city&session_token=${sessionUUID}&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
        );
        const data = await res.json();
        console.log(data);
        if (res.ok && data.suggestions.length > 0)
          setMapboxSuggestions(data.suggestions);
      } catch (error) {
        setError(error);
      }
    };
    if (searchInput.length) getSuggestions();
  }, [searchInput]);

  return (
    <>
      {mapBoxSuggestions.length > 0 ? (
        <div className="">hello from search</div>
      ) : null}
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="search"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        />
        {/* <button type="submit">
        <SearchIcon />
      </button> */}
      </form>
    </>
  );
}

// &navigation_profile=cycling
