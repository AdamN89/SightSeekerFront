import { useEffect, useState, useRef, useContext } from "react";
import SearchIcon from "./NavigationIcons/SearchIcon";
import { AuthContext } from "../context/AuthContext";

const TOKEN =
  "pk.eyJ1Ijoic3RlcGhhbnVsbG1hbm4iLCJhIjoiY2xqNWVyZjV4MDF2cTNkcG0weTE4cjB6ZSJ9.FeahDy79a69Y5JxlkBkfIA";

export default function SearchBar({ getUUID, viewState }) {
  const { user } = useContext(AuthContext);
  const [searchInput, setSearchInput] = useState("");
  const searchInputRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  const handleSearch = async () => {
    try {
      const res = await fetch(
        `https://api.mapbox.com/search/searchbox/v1/suggest?q=${searchInput}&language=en&limit=7&navigation_profile=${
          user.settings.navigation || "cycling"
        }&proximity=-73.990593,40.740121&origin=-73.98385214006427,40.756244714624046&session_token=${getUUID()}&access_token=${TOKEN}`
      );
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
