import { useNavigate } from "react-router";
import CloseIcon from "../../components/CloseIcon";
import Button from "../../components/Button";

export default function AddFavorite() {
  const navigate = useNavigate();
  return (
    <div className="container add_favorite">
      <button
        className="add_favorite_close_btn"
        onClick={() => navigate("/home")}
      >
        <CloseIcon />
      </button>
      <h1 className="title">Add favorite</h1>
      <div className="first_element">
        <div className="add_favorite_map"></div>
        <form className="add_favorite_form">
          <input type="text" placeholder="favorite name" />
        </form>
        <Button txt={"Create Favorite"} func={""} key="createfavorite" />
      </div>
    </div>
  );
}
