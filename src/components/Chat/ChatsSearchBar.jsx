import SearchIcon from "../SearchIcon";

export default function ChatsSearchBar() {
  return (
    <div className="search_wrapper">
      <input type="text" placeholder="search chats" />
      <button type="submit">
        <SearchIcon />
      </button>
    </div>
  );
}
