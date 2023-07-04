import { useEffect, useState, useRef, useContext } from "react";
// import SearchIcon from "./NavigationIcons/SearchIcon";
import { AuthContext } from "../context/AuthContext";
import { MapContext } from "../context/MapContext";

export default function SearchBar({ viewState, userCoords }) {
  const { user } = useContext(AuthContext);
  const { retrieveByAddress, getUUID } = useContext(MapContext);
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
    // console.log("Session: ", sessionUUID);
    const getSuggestions = async () => {
      try {
        const res = await fetch(
          `https://api.mapbox.com/search/searchbox/v1/suggest?q=${searchInput}&language=en&limit=10&origin=${lngUser},${latUser}&session_token=${sessionUUID}&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
        );
        const data = await res.json();
        // console.log(data);
        if (res.ok && data.suggestions.length > 0)
          setMapboxSuggestions(data.suggestions);
      } catch (error) {
        setError(error);
      }
    };
    if (searchInput.length) getSuggestions();
  }, [searchInput]);

  const retrievePointBySearchbox = async (id) => {
    try {
      const res = await fetch(
        `https://api.mapbox.com/search/searchbox/v1/retrieve/${id}?session_token=${sessionUUID}&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      setError(error);
    }
  };

  const handleMapboxRetrieve = (e) => {
    // console.log("clicked the list! ", e.target.id);
    // console.log("Session: ", sessionUUID);
    // console.log(e.target.dataset);

    if (e.target.id && !e.target.dataset.address)
      retrievePointBySearchbox(e.target.id);
    else if (e.target.dataset.address)
      retrieveByAddress(e.target.dataset.address, e.target.dataset.name);
  };

  return (
    <>
      {mapBoxSuggestions.length > 0 ? (
        <ul className="searchbar__suggestions">
          {mapBoxSuggestions
            .toSorted((a, b) => a.distance - b.distance)
            .map((suggestion) => (
              <li
                className="searchbar__suggestions--item"
                key={suggestion.mapbox_id}
                id={suggestion.mapbox_id}
                data-address={
                  suggestion?.full_address ? suggestion?.full_address : null
                }
                data-name={suggestion?.name}
                onClick={handleMapboxRetrieve}
              >
                <h4>{suggestion.name}</h4>
                <div className="searchbar__suggestions--details">
                  <p className="searchbar__suggestions--address">
                    {suggestion.full_address}
                  </p>
                  <p className="searchbar__suggestions--distance">
                    {suggestion.distance
                      ? suggestion.distance > 1000
                        ? `${
                            suggestion.distance % 10 === 0
                              ? suggestion.distance / 1000
                              : (suggestion.distance / 1000).toFixed(1)
                          }km`
                        : `${suggestion.distance}m`
                      : null}
                  </p>
                </div>
                {suggestion?.poi_category && suggestion?.poi_category.length > 0
                  ? suggestion.poi_category.map((category, index) => {
                      if (index < 2)
                        return (
                          <span
                            className="searchbar__suggestions--category"
                            key={suggestion.name + category + index}
                          >
                            {category}
                          </span>
                        );
                      else return null;
                    })
                  : null}
              </li>
            ))}
        </ul>
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

// &radius=0.5
// &proximity=${lng},${lat}
// &types=poi,address,city
