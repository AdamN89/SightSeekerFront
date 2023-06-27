import SearchIcon from "../../components/SearchIcon";

export default function TravelSearchBar() {
  return (
    <div className="search_wrapper">
      <input type="text" placeholder="search travel plans" />
      <button type="submit">
        <SearchIcon />
      </button>
    </div>
  );
}
